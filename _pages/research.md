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

<nav class="research-quick-nav" aria-label="Research publication navigation">
  <span class="research-quick-nav__label">Jump to</span>
  <a href="#conference-publications">Conference Papers</a>
  <a href="#journal-publications">Journal Papers</a>
  <a href="#workshop-publications">Workshop Papers</a>
</nav>

<hr class="content-divider">

{% for section in site.data.research.sections %}
<h3 class="content-section-heading" id="{{ section.id }}">{{ section.title }}</h3>

{% for paper in section.papers %}
{% include paper_card.html paper=paper %}
{% endfor %}

{% unless forloop.last %}
<hr class="content-divider">
{% endunless %}
{% endfor %}
