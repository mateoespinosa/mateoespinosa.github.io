(function () {
  "use strict";

  function normalize(value) {
    return (value || "").toString().trim().toLowerCase();
  }

  function parseTags(raw) {
    if (!raw) return [];
    return raw
      .split("|")
      .map(function (tag) {
        return tag.trim();
      })
      .filter(function (tag) {
        return tag.length > 0;
      });
  }

  function uniqueSorted(values, sorter) {
    var seen = new Set();
    var unique = [];
    values.forEach(function (value) {
      if (!value) return;
      if (seen.has(value)) return;
      seen.add(value);
      unique.push(value);
    });

    unique.sort(sorter);
    return unique;
  }

  function populateSelect(select, values, defaultLabel) {
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

    if (values.indexOf(current) >= 0) {
      select.value = current;
    } else {
      select.value = "";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("publication-filter-form");
    if (!form) return;

    var cards = Array.prototype.slice.call(document.querySelectorAll("[data-paper-card]"));
    var sections = Array.prototype.slice.call(document.querySelectorAll("[data-research-section]"));
    var dividerNodes = Array.prototype.slice.call(document.querySelectorAll(".research-section-divider"));

    if (cards.length === 0) return;

    var controls = {
      search: document.getElementById("publication-search"),
      year: document.getElementById("publication-year"),
      venue: document.getElementById("publication-venue"),
      type: document.getElementById("publication-type"),
      tag: document.getElementById("publication-tag"),
      clear: document.getElementById("clear-publication-filters"),
      results: document.getElementById("publication-filter-results"),
    };

    var years = uniqueSorted(
      cards.map(function (card) {
        return card.dataset.year || "";
      }),
      function (a, b) {
        return Number(b) - Number(a);
      }
    );

    var venues = uniqueSorted(
      cards.map(function (card) {
        return card.dataset.venueShort || "";
      }),
      function (a, b) {
        return a.localeCompare(b);
      }
    );

    var types = uniqueSorted(
      cards.map(function (card) {
        var value = card.dataset.type || "";
        return value.charAt(0).toUpperCase() + value.slice(1);
      }),
      function (a, b) {
        return a.localeCompare(b);
      }
    );

    var tags = uniqueSorted(
      cards.reduce(function (acc, card) {
        return acc.concat(parseTags(card.dataset.tags || ""));
      }, []),
      function (a, b) {
        return a.localeCompare(b);
      }
    );

    populateSelect(controls.year, years, "All years");
    populateSelect(controls.venue, venues, "All venues");
    populateSelect(controls.type, types, "All types");
    populateSelect(controls.tag, tags, "All tags");

    function matchesFilters(card) {
      var searchValue = normalize(controls.search.value);
      var yearValue = controls.year.value;
      var venueValue = controls.venue.value;
      var typeValue = normalize(controls.type.value);
      var tagValue = controls.tag.value;

      var searchText = normalize(
        [
          card.dataset.title,
          card.dataset.venue,
          card.dataset.venueShort,
          card.dataset.mainTag,
          card.dataset.tags,
          card.dataset.authors,
        ].join(" ")
      );

      var matchesSearch = !searchValue || searchText.indexOf(searchValue) >= 0;
      var matchesYear = !yearValue || card.dataset.year === yearValue;
      var matchesVenue = !venueValue || (card.dataset.venueShort || "") === venueValue;
      var matchesType = !typeValue || normalize(card.dataset.type) === typeValue;
      var matchesTag = !tagValue || parseTags(card.dataset.tags || "").indexOf(tagValue) >= 0;

      return matchesSearch && matchesYear && matchesVenue && matchesType && matchesTag;
    }

    function updateResults(visibleCount) {
      if (!controls.results) return;

      if (visibleCount === 0) {
        controls.results.textContent = "No publications match the selected filters.";
        return;
      }

      var noun = visibleCount === 1 ? "publication" : "publications";
      controls.results.textContent = visibleCount + " " + noun + " shown.";
    }

    function updateAlternatingImagePositions() {
      var visibleCards = cards.filter(function (card) {
        return !card.hidden;
      });

      visibleCards.forEach(function (card, index) {
        card.dataset.imagePosition = index % 2 === 0 ? "right" : "left";
      });
    }

    function updateSectionVisibility() {
      var visibleBySection = {};
      var visibleCount = 0;

      cards.forEach(function (card) {
        var visible = matchesFilters(card);
        card.hidden = !visible;

        if (visible) {
          visibleCount += 1;
          var sectionId = card.dataset.sectionId;
          visibleBySection[sectionId] = (visibleBySection[sectionId] || 0) + 1;
        }
      });

      sections.forEach(function (section) {
        var sectionId = section.dataset.researchSection;
        section.hidden = !(visibleBySection[sectionId] > 0);
      });

      var visibleSectionIds = sections
        .filter(function (section) {
          return !section.hidden;
        })
        .map(function (section) {
          return section.dataset.researchSection;
        });

      dividerNodes.forEach(function (divider) {
        divider.hidden = true;
      });

      visibleSectionIds.forEach(function (sectionId, index) {
        if (index >= visibleSectionIds.length - 1) return;

        var divider = document.querySelector('.research-section-divider[data-divider-for=\"' + sectionId + '\"]');
        if (divider) divider.hidden = false;
      });

      updateAlternatingImagePositions();
      updateResults(visibleCount);
    }

    form.addEventListener("input", updateSectionVisibility);
    form.addEventListener("change", updateSectionVisibility);

    if (controls.clear) {
      controls.clear.addEventListener("click", function () {
        controls.search.value = "";
        controls.year.value = "";
        controls.venue.value = "";
        controls.type.value = "";
        controls.tag.value = "";
        updateSectionVisibility();
        controls.search.focus();
      });
    }

    updateSectionVisibility();
  });
})();
