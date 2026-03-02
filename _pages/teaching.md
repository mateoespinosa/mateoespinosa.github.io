---
layout: single
title: Teaching
comments: false
permalink: /teaching/
classes: wide
header:
  overlay_image: /assets/images/panoramas/banos_hero.jpg
  image_description: "Baños de Agua Santa, Tungurahua, Ecuador"
---

{% for section in site.data.teaching.sections %}
### {{ section.heading }}

<div class="teaching-section">
  <div class="teaching-grid">
    {% for item in section.items %}
    <article class="teaching-card">
      <h4>
        {% if item.url and item.url != '' %}
        <a href="{{ item.url }}">{{ item.title }}</a>
        {% else %}
        {{ item.title }}
        {% endif %}
      </h4>
      {% if item.institution and item.institution != '' %}
      <p class="teaching-meta"><strong>Institution:</strong> {{ item.institution }}</p>
      {% endif %}
      {% if item.venue and item.venue != '' %}
      <p class="teaching-meta"><strong>Venue:</strong> {{ item.venue }}</p>
      {% endif %}
      {% if item.role and item.role != '' %}
      <p class="teaching-meta"><strong>Role:</strong> {{ item.role }}</p>
      {% endif %}
      {% if item.years and item.years != '' %}
      <span class="teaching-years">{{ item.years }}</span>
      {% endif %}
    </article>
    {% endfor %}
  </div>
</div>
{% endfor %}

### {{ site.data.teaching.supervision_heading }}

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
