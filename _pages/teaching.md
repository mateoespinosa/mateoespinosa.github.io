---
layout: single
title: Teaching
comments: false
permalink: /teaching/
classes: wide
description: "Teaching, tutorials, and supervision roles in interpretable AI, machine learning, and computer science."
excerpt:
image: /assets/images/panoramas/banos_hero.jpg
header:
  overlay_image: /assets/images/panoramas/banos_hero.jpg
  image_description: "Baños de Agua Santa, Tungurahua, Ecuador"
---

{% if site.data.teaching.conference_tutorials and site.data.teaching.conference_tutorials.size > 0 %}
<h2 class="content-section-heading">{{ site.data.teaching.conference_tutorials_heading | default: "Conference Tutorials" }}</h2>

<div class="teaching-section">
  <div class="teaching-grid">
    {% for item in site.data.teaching.conference_tutorials %}
    {% include teaching_card.html item=item %}
    {% endfor %}
  </div>
</div>

<hr class="content-divider">
{% endif %}

{% for section in site.data.teaching.sections %}
<h2 class="content-section-heading">{{ section.heading }}</h2>

<div class="teaching-section">
  <div class="teaching-grid">
    {% for item in section.items %}
    {% include teaching_card.html item=item %}
    {% endfor %}
  </div>
</div>

{% unless forloop.last %}
<hr class="content-divider">
{% endunless %}
{% endfor %}



<h2 class="content-section-heading">{{ site.data.teaching.supervision_heading }}</h2>

<div class="teaching-section">
  <ul class="supervision-list">
    {% for item in site.data.teaching.supervision %}
    <li class="supervision-item">
      <p class="supervision-name">
        {% if item.url and item.url != '' %}
        <a href="{{ item.url }}">{{ item.name }}</a>
        {% else %}
        {{ item.name }}
        {% endif %}
        <span class="supervision-year">{{ item.years }}</span>
      </p>
      <p class="supervision-meta">{{ item.details }}</p>
    </li>
    {% endfor %}
  </ul>
</div>
