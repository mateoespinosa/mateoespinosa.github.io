/*
 * Concept bottleneck model of the sidebar portrait.
 *
 * Hovering (or keyboard-focusing) the portrait opens a small panel with the
 * concepts "predicted" from the photo and the label a linear head assigns from
 * them. Clicking a concept intervenes on it - sets it to 0 or 1 - and the
 * label is recomputed. Concepts and head live in _data/cbm_avatar.yml and are
 * inlined as JSON by _layouts/default.html.
 *
 * Only runs where the portrait is the large, stacked one (>=1024px) and the
 * pointer can hover; below that the theme shrinks it to a 36px thumbnail and
 * the panel would have nothing to sit beside.
 */
(function () {
  "use strict";

  var CLOSE_DELAY = 220;
  var ARROW_Y = 46;

  function readData() {
    var node = document.getElementById("cbm-avatar-data");
    if (!node) return null;
    try {
      return JSON.parse(node.textContent);
    } catch (e) {
      return null;
    }
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }

  function softmax(z) {
    var m = Math.max.apply(null, z);
    var e = z.map(function (v) { return Math.exp(v - m); });
    var s = e.reduce(function (a, b) { return a + b; }, 0);
    return e.map(function (v) { return v / s; });
  }

  function build(avatar, data) {
    var concepts = data.concepts;
    var labels = data.labels;
    // null = not intervened; 0 or 1 = the value the viewer forced.
    var forced = concepts.map(function () { return null; });

    function value(i) {
      return forced[i] === null ? concepts[i].p : forced[i];
    }

    function predict() {
      var z = labels.map(function (l) {
        return concepts.reduce(function (acc, c, i) {
          return acc + (l.weights[c.key] || 0) * value(i);
        }, l.bias);
      });
      var p = softmax(z);
      var top = p.indexOf(Math.max.apply(null, p));
      return { top: top, p: p };
    }

    // ---- markup -----------------------------------------------------------
    var panel = el("div", "cbm-avatar__panel");
    panel.id = "cbm-avatar-panel";
    panel.setAttribute("role", "group");
    panel.setAttribute("aria-label", "Concept bottleneck model of this photo");

    var head = el("div", "cbm-avatar__head");
    head.appendChild(el("span", null, "concept bottleneck"));
    head.appendChild(el("span", "cbm-avatar__arch", "x → c → y"));
    panel.appendChild(head);

    var list = el("ol", "cbm-avatar__concepts");
    var rows = concepts.map(function (c, i) {
      var li = el("li");
      var btn = el("button", "cbm-avatar__concept");
      btn.type = "button";
      btn.setAttribute("aria-pressed", "false");

      var name = el("span", "cbm-avatar__name", c.label);
      var bar = el("span", "cbm-avatar__bar");
      var fill = el("span", "cbm-avatar__fill");
      bar.appendChild(fill);
      var val = el("span", "cbm-avatar__val");

      btn.appendChild(name);
      btn.appendChild(bar);
      btn.appendChild(val);
      li.appendChild(btn);
      list.appendChild(li);

      btn.addEventListener("click", function (event) {
        event.preventDefault();
        // First click forces the opposite of what the model predicted, the
        // second hands the concept back to the model.
        if (forced[i] === null) forced[i] = c.p >= 0.5 ? 0 : 1;
        else forced[i] = null;
        render(true);
      });

      return { btn: btn, fill: fill, val: val };
    });
    panel.appendChild(list);

    var out = el("div", "cbm-avatar__out");
    out.setAttribute("aria-live", "polite");
    var yhat = el("span", "cbm-avatar__yhat", "ŷ");
    var label = el("strong", "cbm-avatar__label");
    var prob = el("span", "cbm-avatar__prob");
    var line = el("div", "cbm-avatar__line");
    line.appendChild(yhat);
    line.appendChild(label);
    line.appendChild(prob);
    out.appendChild(line);
    panel.appendChild(out);

    var foot = el("div", "cbm-avatar__foot");
    var hint = el("span", null, "click a concept to intervene");
    var reset = el("button", "cbm-avatar__reset", "reset");
    reset.type = "button";
    reset.hidden = true;
    reset.addEventListener("click", function (event) {
      event.preventDefault();
      forced = forced.map(function () { return null; });
      render(true);
    });
    foot.appendChild(hint);
    foot.appendChild(reset);
    panel.appendChild(foot);

    // ---- state -> DOM -----------------------------------------------------
    function render(changed) {
      concepts.forEach(function (c, i) {
        var v = value(i);
        var row = rows[i];
        var on = forced[i] !== null;
        row.fill.style.width = (v * 100).toFixed(0) + "%";
        row.val.textContent = v.toFixed(2);
        row.btn.classList.toggle("is-forced", on);
        row.btn.setAttribute("aria-pressed", on ? "true" : "false");
        row.btn.title = on
          ? "Intervened: set to " + v + ". Click to give it back to the model."
          : "Predicted " + c.p.toFixed(2) + ". Click to set it to " + (c.p >= 0.5 ? 0 : 1) + ".";
      });

      var y = predict();
      var text = labels[y.top].label;
      if (changed && label.textContent !== text) {
        out.classList.remove("is-flipped");
        void out.offsetWidth; // restart the flash animation
        out.classList.add("is-flipped");
      }
      label.textContent = text;
      prob.textContent = "p = " + y.p[y.top].toFixed(2);

      var any = forced.some(function (f) { return f !== null; });
      reset.hidden = !any;
      hint.textContent = any ? "concept intervention applied" : "click a concept to intervene";
    }

    // The sticky sidebar scrolls its own overflow, which would clip a panel
    // placed inside it, so the panel lives on <body> and is pinned beside the
    // portrait with fixed positioning.
    avatar.classList.add("cbm-avatar");
    document.body.appendChild(panel);
    render(false);

    // ---- open / close -----------------------------------------------------
    var img = avatar.querySelector("img");
    var link = avatar.querySelector("a");
    var timer = null;
    var refocusing = false;

    function inside(node) {
      return avatar.contains(node) || panel.contains(node);
    }

    function isOpen() {
      return panel.classList.contains("is-open");
    }

    function place() {
      var r = img.getBoundingClientRect();
      // ARROW_Y (in the stylesheet) is where the arrow sits down the panel;
      // line it up with the middle of the portrait, then keep the panel on
      // screen.
      var top = r.top + r.height / 2 - ARROW_Y;
      var maxTop = window.innerHeight - panel.offsetHeight - 8;
      top = Math.max(8, Math.min(top, maxTop));
      panel.style.top = top + "px";
      panel.style.left = (r.right + 14) + "px";
      panel.style.setProperty("--cbm-arrow-y", (r.top + r.height / 2 - top - 5) + "px");
    }

    function close() {
      panel.classList.remove("is-open");
      avatar.classList.remove("is-open");
    }

    function open() {
      clearTimeout(timer);
      if (isOpen()) return;
      // Bars grow in from zero each time, like a forward pass.
      rows.forEach(function (r) { r.fill.style.width = "0%"; });
      place();
      panel.classList.add("is-open");
      avatar.classList.add("is-open");
      requestAnimationFrame(function () {
        requestAnimationFrame(function () { render(false); });
      });
    }

    function closeSoon() {
      clearTimeout(timer);
      timer = setTimeout(function () {
        // Focus left behind by a mouse click should not hold the panel open;
        // focus that arrived by keyboard should.
        var f = document.activeElement;
        if (!inside(f) || !f.matches(":focus-visible")) close();
      }, CLOSE_DELAY);
    }

    window.addEventListener("scroll", function () { if (isOpen()) place(); }, { passive: true });
    window.addEventListener("resize", function () { if (isOpen()) place(); });
    avatar.closest(".sidebar").addEventListener("scroll", function () { if (isOpen()) place(); }, { passive: true });

    [img, panel].forEach(function (target) {
      if (!target) return;
      target.addEventListener("mouseenter", open);
      target.addEventListener("mouseleave", closeSoon);
    });

    if (link) link.setAttribute("aria-describedby", panel.id);
    // Keyboard: tabbing onto the portrait link opens the panel, and the next
    // Tab moves into it. The panel sits at the end of <body> in DOM order, so
    // focus is handed across by hand in both directions.
    avatar.addEventListener("focusin", function (event) {
      // A mouse click on the portrait link focuses it too; only keyboard focus
      // should open the panel from the link.
      if (refocusing) return;
      if (event.target === link && !link.matches(":focus-visible")) return;
      open();
    });
    var first = rows[0].btn;
    if (link) {
      link.addEventListener("keydown", function (event) {
        if (event.key === "Tab" && !event.shiftKey && isOpen()) {
          event.preventDefault();
          first.focus();
        }
      });
    }
    panel.addEventListener("keydown", function (event) {
      if (event.key === "Tab" && event.shiftKey && document.activeElement === first && link) {
        event.preventDefault();
        link.focus();
      } else if (event.key === "Tab" && !event.shiftKey && document.activeElement === lastFocusable()) {
        // Carry on from where the portrait sits in the page.
        event.preventDefault();
        close();
        focusAfter(avatar);
      }
    });
    function lastFocusable() {
      return reset.hidden ? rows[rows.length - 1].btn : reset;
    }
    function focusAfter(node) {
      var all = Array.prototype.slice.call(document.querySelectorAll(
        "a[href], button:not([hidden]), input, select, textarea, [tabindex]:not([tabindex='-1'])"
      )).filter(function (n) { return !panel.contains(n) && n.offsetParent !== null; });
      for (var i = 0; i < all.length; i++) {
        if (!node.contains(all[i]) && (node.compareDocumentPosition(all[i]) & Node.DOCUMENT_POSITION_FOLLOWING)) {
          all[i].focus();
          return;
        }
      }
    }
    [avatar, panel].forEach(function (target) {
      target.addEventListener("focusout", function () {
        setTimeout(function () {
          if (!inside(document.activeElement)) closeSoon();
        }, 0);
      });
      target.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && isOpen()) {
          close();
          if (link) {
            refocusing = true;
            link.focus();
            refocusing = false;
          }
        }
      });
    });

    return { close: close };
  }

  document.addEventListener("DOMContentLoaded", function () {
    var avatar = document.querySelector(".sidebar .author__avatar");
    var data = readData();
    if (!avatar || !data || !data.concepts || !data.labels) return;

    var mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    var built = null;

    function sync() {
      if (mq.matches && !built) built = build(avatar, data);
      if (!mq.matches && built) built.close();
      avatar.classList.toggle("cbm-avatar--off", !mq.matches);
    }

    sync();
    if (mq.addEventListener) mq.addEventListener("change", sync);
    else if (mq.addListener) mq.addListener(sync);
  });
})();
