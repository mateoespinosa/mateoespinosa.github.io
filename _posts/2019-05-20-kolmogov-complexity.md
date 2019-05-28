---
layout: single
title: "Compressing Prime Numbers: Kolmogorov Complexity 101"
excerpt: "A tiny bit of light on Kolmogorov Complexity and the incompressibility method"
date: 2019-05-20 13:00:00 -0600
categories:
  - mathematics
  - computer-science
tags:
  - mathematics
  - computer-science
  - information-theory
comments: true
classes: wide
style: |
  #page-title {
    font-family: 'Share Tech Mono', monospace;
  }
---

[Andrey Kolmogorov](https://en.wikipedia.org/wiki/Andrey_Kolmogorov) is far from being an unknown name in most fields of intellectual inquiry. Mostly known for establishing the foundations of probability theory (the unforgettable [Kolmogorov Axioms](https://en.wikipedia.org/wiki/Probability_axioms)), the list of things named after him is quite astonishing: [Kolmogorov space](https://en.wikipedia.org/wiki/Kolmogorov_space), [Kolmogorov equations](https://en.wikipedia.org/wiki/Kolmogorov_equations), [Kolmogorov Integral](https://en.wikipedia.org/wiki/Kolmogorov_integral), [Kolmogorov-Smirnov test](https://en.wikipedia.org/wiki/Kolmogorov%E2%80%93Smirnov_test), and so many more. This stands in a blunt contrast with the little we tend to hear about Kolmogorov and his life compared to other mathematicians/scientists of this same "caliber" (just look at how relatively short his Wikipedia biography is). Because of this, I wanted to spend some time discussing a topic which unfortunately usually escapes most undergraduate mathematics/Computer Science curricula: Kolmogorv Complexity.

Kolmogorv Complexity is a fascinating branch of algorithmic information theory which started with a 1963 paper properly titled [On tables of random numbers](https://core.ac.uk/download/pdf/81156038.pdf). The title is not too catchy for sure, but  the result is quite interesting: Kolmogorov discusses the possibility of formally describing the complexity of a "selection/sampling algorithm" for generating subsets of large populations. The goal of such a characterization for an algorithm is to understand when could one expect a probabilistic property to hold both in a large group and also in a subgroup selected with an algorithm. With this description of the complexity of a selection algorithm, Kolmogorov argues that one would expect a probabilistic property found in a "sufficiently large" group to hold in a subset of this same group as long as the way we select this subgroup is "simple enough" using his new metric. (TODO: REWRITE THESE LAST TO SENTENCES... TO HARD TO UNDERSTAND)