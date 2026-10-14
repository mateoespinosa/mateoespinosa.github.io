/*
 * An interactive hairy ball (see _includes/hairy_ball.html).
 *
 * The hair follows the tangent field you get by pulling a constant field on
 * the plane back onto the sphere through stereographic projection from a
 * point N:
 *
 *     v(p) = (1 - p.N) u + (u.p) (N - p),      u a unit vector with u.N = 0
 *
 * It is tangent everywhere (p.v = 0), continuous, and vanishes only at p = N,
 * where it has index 2 - the single cowlick the theorem promises. Near N the
 * field is tiny, so hair there stands straight up instead of lying flat.
 * "Comb again" picks a new N and u and blends between the two combings.
 *
 * Drag (or use the arrow keys) to turn the ball.
 */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---- small vector kit ----------------------------------------------------
  function dot(a, b) { return a[0] * b[0] + a[1] * b[1] + a[2] * b[2]; }
  function add(a, b) { return [a[0] + b[0], a[1] + b[1], a[2] + b[2]]; }
  function sub(a, b) { return [a[0] - b[0], a[1] - b[1], a[2] - b[2]]; }
  function scale(a, s) { return [a[0] * s, a[1] * s, a[2] * s]; }
  function norm(a) {
    var l = Math.sqrt(dot(a, a)) || 1;
    return [a[0] / l, a[1] / l, a[2] / l];
  }
  function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  }
  function lerp(a, b, t) { return add(scale(a, 1 - t), scale(b, t)); }

  // Row-major 3x3 matrices.
  function matMul(A, B) {
    var C = [];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        C[i * 3 + j] = A[i * 3] * B[j] + A[i * 3 + 1] * B[3 + j] + A[i * 3 + 2] * B[6 + j];
      }
    }
    return C;
  }
  function apply(M, v) {
    return [
      M[0] * v[0] + M[1] * v[1] + M[2] * v[2],
      M[3] * v[0] + M[4] * v[1] + M[5] * v[2],
      M[6] * v[0] + M[7] * v[1] + M[8] * v[2]
    ];
  }
  function axisAngle(axis, angle) {
    var k = norm(axis), c = Math.cos(angle), s = Math.sin(angle), t = 1 - c;
    var x = k[0], y = k[1], z = k[2];
    return [
      t * x * x + c,     t * x * y - s * z, t * x * z + s * y,
      t * x * y + s * z, t * y * y + c,     t * y * z - s * x,
      t * x * z - s * y, t * y * z + s * x, t * z * z + c
    ];
  }
  var IDENTITY = [1, 0, 0, 0, 1, 0, 0, 0, 1];

  // Evenly spread points on the unit sphere.
  function fibonacciSphere(n) {
    var pts = [], golden = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < n; i++) {
      var y = 1 - (2 * i + 1) / n;
      var r = Math.sqrt(1 - y * y);
      var th = golden * i;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r]);
    }
    return pts;
  }

  function randomUnit() {
    var z = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = Math.sqrt(1 - z * z);
    return [r * Math.cos(th), r * Math.sin(th), z];
  }

  // Any unit vector perpendicular to n.
  function perpendicular(n, hint) {
    var h = hint || (Math.abs(n[0]) < 0.9 ? [1, 0, 0] : [0, 1, 0]);
    var p = sub(h, scale(n, dot(h, n)));
    if (dot(p, p) < 1e-6) return perpendicular(n);
    return norm(p);
  }

  function field(p, N, u) {
    return add(scale(u, 1 - dot(p, N)), scale(sub(N, p), dot(u, p)));
  }

  function token(name, fallback) {
    var v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    return v || fallback;
  }

  // ---- one ball -------------------------------------------------------------
  function HairyBall(root) {
    var canvas = root.querySelector("canvas");
    var ctx = canvas.getContext("2d");
    var mode = root.getAttribute("data-mode") || "spin";
    var points = fibonacciSphere(parseInt(root.getAttribute("data-hairs"), 10) || 1100);
    var phases = points.map(function () { return Math.random() * Math.PI * 2; });
    var hairLength = 0.13;

    // World-space combing; the view rotation is kept separately.
    var N, u;
    if (mode === "cowlick") {
      // Start with the cowlick facing the viewer, a little above centre.
      N = norm([0.18, 0.32, 0.93]);
    } else {
      N = norm([0.55, 0.62, -0.56]);
    }
    u = perpendicular(N, [0, -1, 0]);
    var from = null; // { N, u, t0 } while blending to a new combing

    var R = mode === "cowlick" ? IDENTITY : axisAngle([1, 0, 0], 0.35);
    var velocity = [0, 0];
    var dragging = false, last = null;
    var visible = true, raf = null, t0 = performance.now();
    var colors = {};
    var size = { w: 0, h: 0, dpr: 1 };

    function readColors() {
      colors.hair = token("--accent", "#2d5c8c");
      colors.ink = token("--ink", "#18222e");
      colors.wash = token("--accent-wash", "#eaf0f7");
      colors.ground = token("--surface-sunk", "#f4f6f9");
      colors.rule = token("--rule", "#d7dee7");
      colors.honor = token("--honor", "#8a4228");
      colors.muted = token("--muted", "#52637c");
    }

    function resize() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = { w: rect.width, h: rect.height, dpr: dpr };
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      draw(performance.now());
    }

    function currentCombing(now) {
      if (!from) return { N: N, u: u };
      var t = Math.min(1, (now - from.t0) / 1400);
      var e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      var n = norm(lerp(from.N, N, e));
      var blended = { N: n, u: perpendicular(n, lerp(from.u, u, e)) };
      if (t >= 1) from = null;
      return blended;
    }

    function recomb() {
      var now = performance.now();
      var c = currentCombing(now);
      var next;
      // Keep the new cowlick off the far side of the old one, where the blend
      // would have to pass through a degenerate midpoint.
      do { next = randomUnit(); } while (dot(next, c.N) < -0.6);
      // In 404 mode, keep it on the visible hemisphere so it is never lost.
      if (mode === "cowlick") {
        var view = apply(R, next);
        if (view[2] < 0.6) next = apply(transpose(R), norm([view[0] * 0.5, view[1] * 0.5, 0.85]));
      }
      from = { N: c.N, u: c.u, t0: reduceMotion ? now - 1400 : now };
      N = next;
      u = perpendicular(N, randomUnit());
      wake();
    }

    function transpose(M) {
      return [M[0], M[3], M[6], M[1], M[4], M[7], M[2], M[5], M[8]];
    }

    // ---- drawing ---------------------------------------------------------
    var BUCKETS = 10;
    var BALL = 0.4; // ball radius as a fraction of the canvas

    function draw(now) {
      var w = size.w, h = size.h, dpr = size.dpr;
      if (!w || !h) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      var rad = Math.min(w, h) * BALL;
      var cx = w / 2, cy = h / 2;
      var comb = currentCombing(now);
      var time = (now - t0) / 1000;
      var sway = reduceMotion ? 0 : 0.05;

      // Ball.
      var g = ctx.createRadialGradient(cx - rad * 0.35, cy - rad * 0.4, rad * 0.1, cx, cy, rad);
      g.addColorStop(0, colors.wash);
      g.addColorStop(1, colors.ground);
      ctx.beginPath();
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
      ctx.lineWidth = 1;
      ctx.strokeStyle = colors.rule;
      ctx.stroke();

      // Hairs, bucketed by depth so each bucket is a single stroke.
      var paths = [];
      for (var b = 0; b < BUCKETS; b++) paths.push([]);

      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        var v = field(p, comb.N, comb.u);
        var speed = Math.sqrt(dot(v, v));
        // Lie flat where the field is strong, stand up where it vanishes.
        var lie = Math.min(1, speed * 1.6);
        var dir = norm(add(scale(v, lie / (speed || 1)), scale(p, 0.28 + (1 - lie) * 0.9)));
        if (sway) {
          var side = norm(cross(p, dir));
          dir = norm(add(dir, scale(side, Math.sin(time * 1.3 + phases[i]) * sway)));
        }
        var tip = add(p, scale(dir, hairLength));
        var mid = add(p, scale(norm(add(scale(p, 0.9), dir)), hairLength * 0.55));

        var P = apply(R, p), T = apply(R, tip), M = apply(R, mid);
        // Back-facing hair only shows where it pokes out past the silhouette.
        if (P[2] < -0.02 && (T[0] * T[0] + T[1] * T[1]) < 1.0) continue;
        if (P[2] < -0.35) continue;

        var depth = Math.max(0, Math.min(BUCKETS - 1, Math.floor((P[2] + 0.35) / 1.35 * BUCKETS)));
        paths[depth].push(P, M, T);
      }

      ctx.lineCap = "round";
      ctx.strokeStyle = colors.hair;
      for (b = 0; b < BUCKETS; b++) {
        var list = paths[b];
        if (!list.length) continue;
        ctx.globalAlpha = 0.18 + 0.82 * (b / (BUCKETS - 1));
        ctx.lineWidth = 0.8 + 0.6 * (b / (BUCKETS - 1));
        ctx.beginPath();
        for (var k = 0; k < list.length; k += 3) {
          var a = list[k], m = list[k + 1], t = list[k + 2];
          ctx.moveTo(cx + a[0] * rad, cy - a[1] * rad);
          ctx.quadraticCurveTo(cx + m[0] * rad, cy - m[1] * rad, cx + t[0] * rad, cy - t[1] * rad);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;

      // The cowlick, when it is on the near side.
      var c = apply(R, comb.N);
      if (c[2] > 0.1) {
        var x = cx + c[0] * rad * (1 + hairLength), y = cy - c[1] * rad * (1 + hairLength);
        var fade = Math.min(1, (c[2] - 0.1) / 0.3);
        ctx.globalAlpha = fade;
        ctx.strokeStyle = colors.honor;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.stroke();

        // Label on the outer side, unless that would run off the canvas.
        ctx.font = "italic 13px Spectral, Georgia, serif";
        var labelW = ctx.measureText("v(p) = 0").width;
        var right = c[0] >= 0;
        if (right && x + 37 + labelW > w) right = false;
        else if (!right && x - 37 - labelW < 0) right = true;
        var sgn = right ? 1 : -1;
        var lx = x + sgn * 34, ly = y - 26;
        ctx.beginPath();
        ctx.moveTo(x + sgn * 7, y - 6);
        ctx.lineTo(lx, ly + 4);
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.textAlign = right ? "left" : "right";
        // A halo in the ball's colour keeps the label legible over the hair.
        ctx.lineJoin = "round";
        ctx.lineWidth = 4;
        ctx.strokeStyle = colors.wash;
        ctx.strokeText("v(p) = 0", lx + sgn * 3, ly);
        ctx.fillStyle = colors.honor;
        ctx.fillText("v(p) = 0", lx + sgn * 3, ly);
        ctx.globalAlpha = 1;
      }
    }

    // ---- motion ----------------------------------------------------------
    function step(now) {
      raf = null;
      if (!visible || document.hidden) return;

      var moving = false;
      if (!dragging && (Math.abs(velocity[0]) > 1e-4 || Math.abs(velocity[1]) > 1e-4)) {
        rotateBy(velocity[0], velocity[1]);
        velocity[0] *= 0.94;
        velocity[1] *= 0.94;
        moving = true;
      } else if (!dragging && !reduceMotion) {
        if (mode === "cowlick") {
          // A slow wobble that keeps the cowlick in view.
          var t = (now - t0) / 1000;
          R = matMul(axisAngle([0, 1, 0], Math.sin(t * 0.5) * 0.0025), R);
        } else {
          R = matMul(axisAngle([0.15, 1, 0], 0.0035), R);
        }
        moving = true;
      }

      draw(now);
      if (moving || dragging || from || !reduceMotion) raf = requestAnimationFrame(step);
    }

    function wake() {
      if (raf == null && visible && !document.hidden) raf = requestAnimationFrame(step);
    }

    function rotateBy(dx, dy) {
      var angle = Math.sqrt(dx * dx + dy * dy);
      if (!angle) return;
      // Screen y points down, the view's y up; drag right turns the near side right.
      R = matMul(axisAngle([dy, dx, 0], angle), R);
    }

    // ---- input -----------------------------------------------------------
    canvas.addEventListener("pointerdown", function (e) {
      dragging = true;
      last = [e.clientX, e.clientY];
      velocity = [0, 0];
      canvas.setPointerCapture(e.pointerId);
      root.classList.add("is-dragging");
      wake();
    });
    canvas.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var rad = Math.min(size.w, size.h) * BALL || 100;
      var dx = (e.clientX - last[0]) / rad, dy = (e.clientY - last[1]) / rad;
      last = [e.clientX, e.clientY];
      rotateBy(dx, dy);
      velocity = reduceMotion ? [0, 0] : [dx, dy];
      draw(performance.now());
    });
    function release() {
      dragging = false;
      root.classList.remove("is-dragging");
      wake();
    }
    canvas.addEventListener("pointerup", release);
    canvas.addEventListener("pointercancel", release);

    canvas.addEventListener("keydown", function (e) {
      var d = 0.12, moves = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, -d], ArrowDown: [0, d] };
      if (moves[e.key]) {
        e.preventDefault();
        rotateBy(moves[e.key][0], moves[e.key][1]);
        draw(performance.now());
      } else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        recomb();
      }
    });

    var button = root.querySelector("[data-recomb]");
    if (button) button.addEventListener("click", recomb);

    // ---- lifecycle -------------------------------------------------------
    readColors();
    if ("ResizeObserver" in window) new ResizeObserver(resize).observe(canvas);
    else window.addEventListener("resize", resize);
    resize();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        wake();
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", wake);

    // Follow the dark-theme toggle.
    new MutationObserver(function () {
      readColors();
      draw(performance.now());
    }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    wake();
  }

  document.addEventListener("DOMContentLoaded", function () {
    var roots = document.querySelectorAll(".hairy-ball");
    for (var i = 0; i < roots.length; i++) {
      if (roots[i].getAttribute("data-ready")) continue;
      roots[i].setAttribute("data-ready", "1");
      if (roots[i].querySelector("canvas").getContext) new HairyBall(roots[i]);
    }
  });
})();
