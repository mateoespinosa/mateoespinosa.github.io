---
title: "Research"
permalink: /research/
layout: single
author_profile: true
classes: wide
comments: false
style: |
  .custom-button {
        margin-top: 15px;
        max-width: 90px;
        background-color: #eee;
        border-color: #888888;
        color: black;
        display: inline-block;
        vertical-align: middle;
        text-align: center;
        text-decoration: none;
        align-items: flex-start;
        cursor: default;
        -webkit-appearence: push-button;
        border-style:  solid;
        border-width: 1px;
        border-radius: 5px;
        font-size: 1em;
        font-family: inherit;
        border-color: #000;
        padding-left: 5px;
        padding-right: 5px;
        width: 100%;
        min-height: 30px;
        margin-left: 3%;
        margin-right: 3%;
        opacity: 0.85
    }

    .custom-button a {
        margin-top: 4px;
        display: inline-block;
        text-decoration: none;
        color: black;
    }

    .custom-button:hover {
        opacity: 1.0;
        text-decoration: none;
        cursor: pointer;
    }

    .custom-button:active {
        opacity: 1.0;
        text-decoration: none;
        text-weight: bolder;
    }

    .custom-button:hover a, .custom-button:active a {
        opacity: 1.0;
        text-decoration: none;
    }

    .button-paper {
        background-color: #fb5d5d;
    }

    .button-code {
        background-color: #ffa809;
    }


    .button-slides {
        background-color: #09bbff;
    }


    .button-video {
        background-color: #09ff82;
    }

    .button-poster {
        background-color: #EB7793;
    }

    .button-blog {
        background-color: #EF7793;
    }


    .image-col-left {
      float: left;
      width: 30%;
      text-align: center;
      margin-left: 5%;
      margin-right: 5%;
    }
    .authors-col-left {
      float: left;
      width: 70%;
    }
    .image-col-right {
      float: right;
      width: 30%;
      text-align: center;
      margin-left: 5%;
      margin-right: 5%;
    }
    .authors-col-right {
      float: right;
      width: 70%;
    }
    .paper-container {
        display: flex;
    }
    .paper-row {
        padding: 3%;
    }
    .paper-row:after {
      content: "";
      display: table;
      clear: both;
      position: relative;
    }
    .paper-thumbnail {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
    }
---

My current research interests roughly lie on the intersection of machine
learning, algorithmic design, and AI applications in healthcare. More
specifically, I am interested in (1) the design of learning algorithms that are
able to construct explanations for their predictions in terms of high-level
concepts and (2) the broad applications that said algorithms may have in
scenarios where transparency is not an option (such as in healthcare). For some
more details on the general direction of my research, please refer to my
[Gates Cambridge scholar profile](https://www.gatescambridge.org/biography/18457/).


Below you can find a list of some of my publications, including their respective
venues, papers, code, and presentations (when applicable). For a possibly more
up-to-date list, however, please take refer to my [Google Scholar profile](https://scholar.google.com/citations?user=4ikoEiMAAAAJ&hl=en).


-----


### Conference Publications (Refereed and Archived)

<div class="paper-row">
    <div class="paper-container">
        <div class="image-col-left">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/cem_thumbnail.png" alt="CEM Architecture">
        </div>
        <div class="authors-col-left">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2209.09056">
                Concept Embedding Models
                </a>
            </div>
            <div>
                <p><b>Conference on Neural Information Processing Systems (NeurIPS), 2022</b></p>
                <p><b>Mateo Espinosa Zarlenga</b><sup>*</sup>, Pietro Barbiero<sup>*</sup>, Gabriele Ciravegna, Giuseppe Marra,
                Francesco Giannini, Michelangelo Diligenti, Zohreh Shams, Frederic Precioso,
                Stefano Melacci, Adrian Weller, Pietro Lio, Mateja Jamnik.</p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2209.09056" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/cem" class="custom-button button-code">Code</a>
        <a style="text-decoration: none;" target="_blank" href="/assets/presentations/cem_neurips_2022_slides.pptx" class="custom-button button-slides">Slides</a>
        <a style="text-decoration: none;" target="_blank" href="https://towardsdatascience.com/concept-embedding-models-beyond-the-accuracy-explainability-trade-off-f7ba02f28fad" class="custom-button button-blog">Blog</a>
    </div>
</div>
<div class="paper-row">
    <div class="paper-container">
        <div class="authors-col-right">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://dl.acm.org/doi/10.1145/3297858.3304013">
                An Open-Source Benchmark Suite for Microservices and Their Hardware-Software Implications for Cloud & Edge Systems
                </a>
            </div>
            <div>
                <p><b>The 24th ACM International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS), 2019</b></p>
                <p>Yu Gan, Yanqi Zhang, Dailun Cheng, Ankitha Shetty, Priyal Rathi, Nayan Katarki, Ariana Bruno, Justin Hu, Brian Ritchken, Brendon Jackson, Kelvin Hu, Meghna Pancholi, Yuan He, Brett Clancy, Chris Colen, Fukang Wen, Catherine Leung, Siyuan Wang, Leon Zaruvinsky, <b>Mateo Espinosa Zarlenga</b>, Rick Lin, Zhongling Liu, Jake Padilla, Christina Delimitrou.</p>
            </div>
        </div>
        <div class="image-col-right">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/microservices.png" alt="Microservices">
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://dl.acm.org/doi/10.1145/3297858.3304013" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/delimitrou/DeathStarBench" class="custom-button button-code">Code</a>
    </div>
</div>

-----


### Workshop Publications (Refereed)

<div class="paper-row">
    <div class="paper-container">
        <div class="image-col-left">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/eclaire_thumbnail.png" alt="ECLAIRE">
        </div>
        <div class="authors-col-left">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2111.12628">
                    Efficient Decompositional Rule Extraction for Deep Neural Networks
                </a>
            </div>
            <div>
                <p><b>1st NeurIPS Workshop on eXplainable AI approaches for debugging and diagnosis (XAI4Debugging@NeurIPS), 2021</b></p>
                <p><b>Mateo Espinosa Zarlenga</b>, Zohreh Shams, Mateja Jamnik.</p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2111.12628" class="custom-button button-paper">Paper</a>
    <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/remix" class="custom-button button-code">Code</a>
    <a style="text-decoration: none;" target="_blank" href="/assets/presentations/eclaire_neurips_slides.pptx" class="custom-button button-slides">Slides</a>
    <a style="text-decoration: none;" target="_blank" href="https://recorder-v3.slideslive.com/?share=53024&s=54899581-1d7e-416e-b3df-8e7824fce7ba" class="custom-button button-video">Talk</a>
    <a style="text-decoration: none;" target="_blank" href="/assets/posters/eclaire_poster.png" class="custom-button button-poster">Poster</a>
    </div>
</div>

-----

### Journal Publications (Refereed and Archived)

<div class="paper-row">
    <div class="paper-container">
        <div class="image-col-left">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/microservices_struct_thumbnail.png" alt="Microservices">
        </div>
        <div class="authors-col-left">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://ieeexplore.ieee.org/document/9076308">
                    Unveiling the Hardware and Software Implications of Microservices in Cloud and Edge Systems
                </a>
            </div>
            <div>
                <p><b>IEEE Micro, 2020</b></p>
                <p>Yu Gan, Yanqi Zhang, Dailun Cheng, Ankitha Shetty, Priyal Rathi, Nayan Katarki, Ariana Bruno, Justin Hu, Brian Ritchken, Brendon Jackson, Kelvin Hu, Meghna Pancholi, Yuan He, Brett Clancy, Chris Colen, Fukang Wen, Catherine Leung, Siyuan Wang, Leon Zaruvinsky, <b>Mateo Espinosa Zarlenga</b>, Rick Lin, Zhongling Liu, Jake Padilla, Christina Delimitrou.</p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://ieeexplore.ieee.org/document/9076308" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/delimitrou/DeathStarBench" class="custom-button button-code">Code</a>
    </div>
</div>


-----
