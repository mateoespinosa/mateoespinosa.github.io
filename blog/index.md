---
layout: blog
title: Blog
---
{% for post in site.posts %}
<article class="preview" style="padding-top: 20px">
    <p class="tagline">
        {{ post.date | date: '%B %-d, %Y' }}
    </p>
    <h3>
        <a href="{{ site.base }}{{ post.url }}">{{ post.title }}</a>
    </h3>
    <div class="excerpt">
        {{ post.excerpt | replace: 'SITE_BASE', site.url | markdownify }}
    </div>
</article>
{% endfor %}