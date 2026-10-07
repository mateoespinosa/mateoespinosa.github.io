/*
 * Copy-to-clipboard for the BibTeX blocks on the research page.
 *
 * Delegated from the document, so it costs one listener regardless of how many
 * publications are on the page, and it keeps working if entries are ever
 * rendered dynamically.
 */
(function () {
  "use strict";

  var RESET_MS = 1800;

  function entryFor(button) {
    var box = button.closest(".pub__cite-box");
    var code = box && box.querySelector("pre code");
    return code ? code.textContent : null;
  }

  function flash(button, message, ok) {
    if (button._resetTimer) clearTimeout(button._resetTimer);

    var original = button._original || button.textContent;
    button._original = original;

    button.textContent = message;
    button.classList.toggle("is-copied", ok);
    button.classList.toggle("is-failed", !ok);

    button._resetTimer = setTimeout(function () {
      button.textContent = original;
      button.classList.remove("is-copied", "is-failed");
    }, RESET_MS);
  }

  // navigator.clipboard needs a secure context; fall back for plain http.
  function legacyCopy(text) {
    var area = document.createElement("textarea");
    area.value = text;
    area.setAttribute("readonly", "");
    area.style.position = "fixed";
    area.style.top = "-1000px";
    area.style.opacity = "0";
    document.body.appendChild(area);

    var selection = document.getSelection();
    var previous = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

    area.select();
    var ok = false;
    try {
      ok = document.execCommand("copy");
    } catch (e) {
      ok = false;
    }

    document.body.removeChild(area);
    if (previous) {
      selection.removeAllRanges();
      selection.addRange(previous);
    }
    return ok;
  }

  document.addEventListener("click", function (event) {
    var button = event.target.closest("[data-copy-bibtex]");
    if (!button) return;

    var text = entryFor(button);
    if (!text) {
      flash(button, "Failed", false);
      return;
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(
        function () { flash(button, "Copied", true); },
        function () {
          var ok = legacyCopy(text);
          flash(button, ok ? "Copied" : "Press \u2318C", ok);
        }
      );
    } else {
      var ok = legacyCopy(text);
      flash(button, ok ? "Copied" : "Press \u2318C", ok);
    }
  });
})();
