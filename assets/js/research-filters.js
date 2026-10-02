(function () {
  "use strict";

  function normalize(value) {
    return (value || "").toString().trim().toLowerCase();
  }

  function parseTags(raw) {
    if (!raw) return [];
    return raw
      .split("|")
      .map(function (tag) { return tag.trim(); })
      .filter(function (tag) { return tag.length > 0; });
  }

  function uniqueSorted(values, sorter) {
    var seen = Object.create(null);
    var unique = [];
    values.forEach(function (value) {
      if (!value || seen[value]) return;
      seen[value] = true;
      unique.push(value);
    });
    unique.sort(sorter);
    return unique;
  }

  function populateSelect(select, values, defaultLabel) {
    if (!select) return;
    var current = select.value;
    select.innerHTML = "";

    var defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = defaultLabel;
    select.appendChild(defaultOption);

    values.forEach(function (value) {
      var option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.appendChild(option);
    });

    select.value = values.indexOf(current) >= 0 ? current : "";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var list = document.getElementById("publication-list");
    if (!list) return;

    var cards = Array.prototype.slice.call(list.querySelectorAll("[data-paper-card]"));
    if (cards.length === 0) return;

    var controls = {
      search: document.getElementById("publication-search"),
      year: document.getElementById("publication-year"),
      venue: document.getElementById("publication-venue"),
      tag: document.getElementById("publication-tag"),
      reset: document.getElementById("clear-publication-filters"),
      results: document.getElementById("publication-filter-results"),
      empty: document.getElementById("publication-empty"),
      chips: Array.prototype.slice.call(document.querySelectorAll(".pub-chip")),
    };

    // Chips are mutually exclusive: either a publication type, or "Selected", or All.
    var active = { type: "", featured: false };

    populateSelect(
      controls.year,
      uniqueSorted(cards.map(function (c) { return c.dataset.year || ""; }),
        function (a, b) { return Number(b) - Number(a); }),
      "All years"
    );

    populateSelect(
      controls.venue,
      uniqueSorted(cards.map(function (c) { return c.dataset.venueShort || ""; }),
        function (a, b) { return a.localeCompare(b); }),
      "All venues"
    );

    populateSelect(
      controls.tag,
      uniqueSorted(
        cards.reduce(function (acc, c) { return acc.concat(parseTags(c.dataset.tags || "")); }, []),
        function (a, b) { return a.localeCompare(b); }
      ),
      "All topics"
    );

    function searchTextFor(card) {
      if (!card._searchText) {
        card._searchText = normalize([
          card.dataset.title,
          card.dataset.venue,
          card.dataset.venueShort,
          card.dataset.mainTag,
          card.dataset.tags,
          card.dataset.authors,
          card.dataset.tldr,
        ].join(" "));
      }
      return card._searchText;
    }

    function matches(card) {
      var q = normalize(controls.search ? controls.search.value : "");
      if (q && searchTextFor(card).indexOf(q) < 0) return false;

      if (active.type && normalize(card.dataset.type) !== active.type) return false;
      if (active.featured && card.dataset.featured !== "true") return false;

      if (controls.year && controls.year.value && card.dataset.year !== controls.year.value) return false;
      if (controls.venue && controls.venue.value && (card.dataset.venueShort || "") !== controls.venue.value) return false;
      if (controls.tag && controls.tag.value &&
          parseTags(card.dataset.tags || "").indexOf(controls.tag.value) < 0) return false;

      return true;
    }

    function anyFilterActive() {
      return Boolean(
        (controls.search && controls.search.value) ||
        active.type || active.featured ||
        (controls.year && controls.year.value) ||
        (controls.venue && controls.venue.value) ||
        (controls.tag && controls.tag.value)
      );
    }

    function apply() {
      var visible = [];

      cards.forEach(function (card) {
        var show = matches(card);
        card.hidden = !show;
        if (show) visible.push(card);
      });

      // The year rail announces each year once per run of visible cards.
      var lastYear = null;
      visible.forEach(function (card) {
        var year = card.dataset.year || "";
        card.classList.toggle("pub--year-repeat", year === lastYear);
        lastYear = year;
      });

      if (controls.results) {
        controls.results.textContent = visible.length === 0
          ? "No publications shown."
          : visible.length + (visible.length === 1 ? " publication" : " publications") +
            (anyFilterActive() ? " of " + cards.length : "") + " shown.";
      }

      if (controls.empty) controls.empty.hidden = visible.length > 0;
      if (controls.reset) controls.reset.hidden = !anyFilterActive();
    }

    controls.chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        if ("filterFeatured" in chip.dataset) {
          active = { type: "", featured: true };
        } else {
          active = { type: normalize(chip.dataset.filterType), featured: false };
        }

        controls.chips.forEach(function (other) {
          other.setAttribute("aria-pressed", other === chip ? "true" : "false");
        });

        apply();
      });
    });

    [controls.search, controls.year, controls.venue, controls.tag].forEach(function (el) {
      if (!el) return;
      el.addEventListener("input", apply);
      el.addEventListener("change", apply);
    });

    if (controls.reset) {
      controls.reset.addEventListener("click", function () {
        if (controls.search) controls.search.value = "";
        if (controls.year) controls.year.value = "";
        if (controls.venue) controls.venue.value = "";
        if (controls.tag) controls.tag.value = "";
        active = { type: "", featured: false };

        controls.chips.forEach(function (chip, index) {
          chip.setAttribute("aria-pressed", index === 0 ? "true" : "false");
        });

        apply();
        if (controls.search) controls.search.focus();
      });
    }

    apply();
  });
})();
