---
title: "Research"
permalink: /research/
layout: single
author_profile: true
classes: wide
comments: false
header:
  overlay_image: /assets/images/panoramas/yellowstone_hero.jpg
  image_description: "Yellowstone National Park, USA"
---

My current research interests roughly lie on the intersection of **interpretable/explainable AI**,
**representation learning**, and **human-in-the-loop AI**. More specifically, I am interested in
(1) the design of powerful models that can construct explanations for their predictions in terms
of high-level *"concepts"* and (2) the broad applications that these architectures may have in
scenarios where experts can interact with the models at test time (e.g., model steering,
test-time feedback, concept interventions).

Below you can find a list of some of my publications, including their respective venues, papers,
code, and presentations (when applicable). For a possibly more up-to-date list, however, please
refer to my [Google Scholar profile](https://scholar.google.com/citations?user=4ikoEiMAAAAJ&hl=en).

<div class="research-quick-nav">
  <a href="#conference-publications">Conference Papers</a>
  <a href="#journal-publications">Journal Papers</a>
  <a href="#workshop-publications">Workshop Papers</a>
</div>

-----

{% for section in site.data.research.sections %}
### <span id="{{ section.id }}">{{ section.title }}</span>

{% for paper in section.papers %}
<div class="paper-row">
  <div class="paper-container">
    {% if paper.image_side == 'left' %}
    <div class="image-col-left">
      <img loading="lazy" decoding="async" class="paper-thumbnail" src="{{ paper.image }}" alt="{{ paper.image_alt }}">
    </div>
    {% endif %}

    {% if paper.image_side == 'left' %}
    <div class="authors-col-left">
    {% else %}
    <div class="authors-col-right">
    {% endif %}
      <div>
        <a class="paper-title-link" target="_blank" rel="noopener noreferrer" href="{{ paper.url }}">{{ paper.title }}</a>
      </div>
      <div>
        <p class="paper-venue"><b>{{ paper.venue }}</b></p>
        <p class="paper-authors">{{ paper.authors_html }}</p>
      </div>
    </div>

    {% if paper.image_side != 'left' %}
    <div class="image-col-right">
      <img loading="lazy" decoding="async" class="paper-thumbnail" src="{{ paper.image }}" alt="{{ paper.image_alt }}">
    </div>
    {% endif %}
  </div>

  <div class="paper-links">
    {% for link in paper.links %}
    <a target="_blank" rel="noopener noreferrer" href="{{ link.url }}" class="custom-button button-{{ link.kind }}">{{ link.label }}</a>
    {% endfor %}
  </div>
</div>
{% endfor %}

{% unless forloop.last %}
-----
{% endunless %}
{% endfor %}
