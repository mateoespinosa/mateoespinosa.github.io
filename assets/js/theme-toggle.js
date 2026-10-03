/*
 * Optional dark theme.
 *
 * Off by default: the stylesheet carries no prefers-color-scheme rule, so the
 * site is light unless the viewer has explicitly asked for dark here. The
 * choice is remembered per browser in localStorage; the early-paint half of
 * this lives inline in _includes/head/custom.html so there is no flash.
 */
(function () {
  "use strict";

  var KEY = "hbt-theme";
  var root = document.documentElement;

  function stored() {
    try {
      return localStorage.getItem(KEY);
    } catch (e) {
      return null;
    }
  }

  function remember(value) {
    try {
      if (value) localStorage.setItem(KEY, value);
      else localStorage.removeItem(KEY);
    } catch (e) {
      /* private mode, blocked storage: the choice just won't persist */
    }
  }

  function isDark() {
    return root.getAttribute("data-theme") === "dark";
  }

  function paint(button) {
    var dark = isDark();
    var label = dark ? "Switch to light theme" : "Switch to dark theme";

    button.setAttribute("aria-pressed", dark ? "true" : "false");
    button.setAttribute("title", label);

    var sr = button.querySelector(".visually-hidden");
    if (sr) sr.textContent = label;

    var icon = button.querySelector("i");
    if (icon) {
      icon.classList.toggle("fa-moon", !dark);
      icon.classList.toggle("fa-sun", dark);
    }
  }

  function apply(theme) {
    if (theme === "dark") root.setAttribute("data-theme", "dark");
    else root.setAttribute("data-theme", "light");
  }

  document.addEventListener("DOMContentLoaded", function () {
    var button = document.querySelector(".theme__toggle");
    if (!button) return;

    // The inline head script only stamps an attribute when a choice exists;
    // normalise to an explicit value now so the toggle has something to flip.
    if (root.getAttribute("data-theme") !== "dark") apply("light");
    paint(button);

    button.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark";
      apply(next);
      remember(next);
      paint(button);
    });

    // Keep multiple tabs in the same browser in step.
    window.addEventListener("storage", function (event) {
      if (event.key !== KEY) return;
      apply(stored() === "dark" ? "dark" : "light");
      paint(button);
    });
  });
})();
