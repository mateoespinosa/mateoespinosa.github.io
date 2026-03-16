---
title: "Research"
permalink: /research/
layout: single
author_profile: true
classes: wide
comments: false
description: "Research publications on interpretable AI, concept-based models, representation learning, and human-in-the-loop systems."
excerpt: "Browse publications by venue, year, type, and topics."
image: /assets/images/panoramas/yellowstone_hero.jpg
header:
  overlay_image: /assets/images/panoramas/yellowstone_hero.jpg
  image_description: "Yellowstone National Park, USA"
---

<div id="research-top"></div>

My current research interests roughly lie on the intersection of **interpretable/explainable AI**,
**representation learning**, and **human-in-the-loop AI**. More specifically, I am interested in
(1) the design of powerful models that can construct explanations for their predictions in terms
of high-level *"concepts"* and (2) the broad applications that these architectures may have in
scenarios where experts can interact with the models at test time (e.g., model steering,
test-time feedback, concept interventions).

Below you can find a list of some of my publications, including their respective venues, papers,
code, and presentations (when applicable). For a possibly more up-to-date list, however, please
refer to my [Google Scholar profile](https://scholar.google.com/citations?user=4ikoEiMAAAAJ&hl=en).

<section class="research-filters" aria-labelledby="publication-browser-heading">
  <h2 id="publication-browser-heading" class="content-section-heading">Publication Browser</h2>
  <p class="research-filters__lead">
    Search and filter publications by title, author, year, venue, publication type, and tags.
  </p>
  <form id="publication-filter-form" class="research-filters__form" role="search">
    <div class="research-filter-field">
      <label for="publication-search">Search publications</label>
      <input id="publication-search" name="publication-search" type="search" placeholder="e.g., concept bottleneck, NeurIPS, bias mitigation">
    </div>
    <div class="research-filter-field">
      <label for="publication-year">Year</label>
      <select id="publication-year" name="publication-year">
        <option value="">All years</option>
      </select>
    </div>
    <div class="research-filter-field">
      <label for="publication-venue">Venue</label>
      <select id="publication-venue" name="publication-venue">
        <option value="">All venues</option>
      </select>
    </div>
    <div class="research-filter-field">
      <label for="publication-type">Type</label>
      <select id="publication-type" name="publication-type">
        <option value="">All types</option>
      </select>
    </div>
    <div class="research-filter-field">
      <label for="publication-tag">Tag</label>
      <select id="publication-tag" name="publication-tag">
        <option value="">All tags</option>
      </select>
    </div>
  </form>
  <div class="research-filters__actions">
    <p id="publication-filter-results" class="research-filters__results" aria-live="polite"></p>
    <button id="clear-publication-filters" class="research-filters__clear" type="button">Reset filters</button>
  </div>
</section>

<nav class="research-quick-nav" aria-label="Research publication navigation">
  <!-- <span class="research-quick-nav__label">Jump to</span> -->
  <a href="#conference-publications">Conference Papers</a>
  <a href="#journal-publications">Journal Papers</a>
  <a href="#workshop-publications">Workshop Papers</a>
  <a href="#preprint-publications">Preprints</a>
  <a class="research-quick-nav__top" href="#research-top">Go to top</a>
</nav>

<hr class="content-divider">

{% for section in site.data.research.sections %}
<section class="research-section" data-research-section="{{ section.id }}">
  <h2 class="content-section-heading" id="{{ section.id }}">{{ section.title }}</h2>

  {% for paper in section.papers %}
  {% include paper_card.html paper=paper section=section %}
  {% endfor %}
</section>

{% unless forloop.last %}
<hr class="content-divider research-section-divider" data-divider-for="{{ section.id }}">
{% endunless %}
{% endfor %}

<script src="{{ '/assets/js/research-filters.js' | relative_url }}" defer></script>
