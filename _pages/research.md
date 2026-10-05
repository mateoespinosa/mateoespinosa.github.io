---
title: "Research"
permalink: /research/
layout: single
author_profile: true
classes:
  - wide
  - research-page
comments: false
description: "Research publications on interpretable AI, concept-based models, representation learning, and human-in-the-loop systems."
excerpt: "Browse publications by venue, year, type, and topics."
image: /assets/images/panoramas/yellowstone_hero.jpg
header:
  overlay_image: /assets/images/panoramas/yellowstone_hero.jpg
  overlay_filter: 0.25
  image_description: "Yellowstone National Park, USA"
---

<div id="research-top"></div>

My current research interests roughly lie on the general field of AI Safety, with a particular focus the intersection of **interpretable/explainable AI**,
**representation learning**, and **human-in-the-loop AI**. More specifically, I am interested in
(1) the design of methods that can construct explanations for a model's predictions in terms
of high-level *"concepts"* and (2) the broad applications that these methods may have in
scenarios where experts can interact with the models at test time (e.g., model steering, monitoring,
test-time feedback, concept interventions).

Below you can find a list of some of my publications, including their respective venues, papers,
code, and presentations (when applicable). For a possibly more up-to-date list, however, please
refer to my [Google Scholar profile](https://scholar.google.com/citations?user=4ikoEiMAAAAJ&hl=en).


{% assign all_papers = "" | split: "" %}
{% for section in site.data.research.sections %}
  {% assign all_papers = all_papers | concat: section.papers %}
{% endfor %}
{% assign years = all_papers | map: "year" | uniq | sort | reverse %}

<section class="pub-browser" aria-labelledby="publication-browser-heading">
  <h2 id="publication-browser-heading" class="sr-only">Publication browser</h2>

  <div class="pub-toolbar">
    <div class="pub-toolbar__row">
      <div class="pub-search">
        <label class="sr-only" for="publication-search">Search publications</label>
        <input id="publication-search" name="publication-search" type="search"
               placeholder="Search title, author, venue, or topic…" autocomplete="off">
      </div>

      <ul class="pub-chips" id="publication-type-chips" role="group" aria-label="Filter by publication type">
        <li><button type="button" class="pub-chip" data-filter-type="" aria-pressed="true">All</button></li>
        <li><button type="button" class="pub-chip" data-filter-featured="true" aria-pressed="false">Selected</button></li>
        <li><button type="button" class="pub-chip" data-filter-type="conference" aria-pressed="false">Conference</button></li>
        <li><button type="button" class="pub-chip" data-filter-type="journal" aria-pressed="false">Journal</button></li>
        <li><button type="button" class="pub-chip" data-filter-type="workshop" aria-pressed="false">Workshop</button></li>
        <li><button type="button" class="pub-chip" data-filter-type="preprint" aria-pressed="false">Preprint</button></li>
        <li><button type="button" class="pub-chip" data-filter-type="thesis" aria-pressed="false">Thesis</button></li>
      </ul>
    </div>

    <details class="pub-filters-more">
      <summary>More filters</summary>
      <div class="pub-filters-more__grid">
        <div class="pub-field">
          <label for="publication-year">Year</label>
          <select id="publication-year"><option value="">All years</option></select>
        </div>
        <div class="pub-field">
          <label for="publication-venue">Venue</label>
          <select id="publication-venue"><option value="">All venues</option></select>
        </div>
        <div class="pub-field">
          <label for="publication-tag">Topic</label>
          <select id="publication-tag"><option value="">All topics</option></select>
        </div>
      </div>
    </details>
  </div>

  <div class="pub-status">
    <p id="publication-filter-results" class="pub-status__count" aria-live="polite" role="status"></p>
    <button id="clear-publication-filters" class="pub-reset" type="button" hidden>Reset filters</button>
  </div>

  {%- comment -%}
    Ordering: newest year first, then month descending, then the authored
    order within _data/research.yml. The list is walked explicitly rather than
    sorted because Liquid's `sort` is not stable here - it scrambled papers
    within a year when this page used it.

    `month` is optional and never rendered; it exists only to break ties
    inside a year. Papers without one keep their authored order at the end of
    their year. The second pass tests the range rather than just presence, so
    an out-of-range typo still renders somewhere instead of vanishing from the
    page (validate_data.rb rejects it too).
  {%- endcomment -%}
  {% assign month_order = "12,11,10,9,8,7,6,5,4,3,2,1" | split: "," %}
  <div class="pub-list" id="publication-list">
    {% for y in years %}
      {% for m in month_order %}
        {% assign month_number = m | plus: 0 %}
        {% for section in site.data.research.sections %}
          {% for paper in section.papers %}
            {% if paper.year == y and paper.month == month_number %}
              {% include paper_card.html paper=paper %}
            {% endif %}
          {% endfor %}
        {% endfor %}
      {% endfor %}

      {% for section in site.data.research.sections %}
        {% for paper in section.papers %}
          {% if paper.year == y %}
            {% assign dated = false %}
            {% if paper.month and paper.month >= 1 and paper.month <= 12 %}
              {% assign dated = true %}
            {% endif %}
            {% unless dated %}
              {% include paper_card.html paper=paper %}
            {% endunless %}
          {% endif %}
        {% endfor %}
      {% endfor %}
    {% endfor %}
  </div>

  <p class="pub-empty" id="publication-empty" hidden>
    No publications match those filters.
  </p>
</section>

<script src="{{ '/assets/js/research-filters.js' | relative_url }}" defer></script>
