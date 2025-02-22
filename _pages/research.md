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
        background-color: #FFF480;
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

My current research interests roughly lie on the intersection of **explainable AI**,
**representation learning**, and **human-in-the-loop AI**. More
specifically, I am interested in (1) the design of powerful models that can
construct explanations for their predictions in terms of high-level
*"concepts"* and (2) the broad applications that these architectures may have in
scenarios where experts can interact with the models at
test time. For some more details on the general direction of my research, please
refer to my [Gates Cambridge scholar profile](https://www.gatescambridge.org/biography/18457/).


Below you can find a list of some of my publications, including their respective
venues, papers, code, and presentations (when applicable). For a possibly more
up-to-date list, however, please take refer to my [Google Scholar profile](https://scholar.google.com/citations?user=4ikoEiMAAAAJ&hl=en).


-----


### Conference Publications (Refereed and Archived)

<div class="paper-row">
    <div class="paper-container">
        <div class="authors-col-right">
            <div>
                <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2409.17691">
                Efficient Bias Mitigation Without Privileged Information
                </a>
                </div>
                <p><b>Oral and Best Paper Candidate (within top 15 papers out of 8,500+ submissions) at the 18th European Conference on Computer Vision (ECCV), 2024</b></p>
                <p>
                    <b>Mateo Espinosa Zarlenga</b>,
                    <a href="https://swamiviv.github.io/">Swami Sankaranarayanan</a>,
                    <a href="https://ai.sony/people/Jerone-Andrews/">Jerone T. A. Andrews</a>,
                    <a href="https://zohrehshams.com">Zohreh Shams</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>,
                    <a href="https://ai.sony/people/Alice-Xiang/">Alice Xiang</a>
                </p>
            </div>
        </div>
        <div class="image-col-right">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/tab_thumbnail.png" alt="TAB architecture">
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2409.17691" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/SonyResearch/tab_bias_mitigation" class="custom-button button-code">Code</a>
        <a style="text-decoration: none;" target="_blank" href="https://eccv.ecva.net/media/eccv-2024/Slides/491.pdf" class="custom-button button-slides">Slides</a>
        <a style="text-decoration: none;" target="_blank" href="https://eccv.ecva.net/media/PosterPDFs/ECCV%202024/491.png?t=1728382129.9790785" class="custom-button button-poster">Poster</a>
    </div>
</div>
<div class="paper-row">
    <div class="paper-container">
        <div class="image-col-left">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/inter_concept_thumbnail.png" alt="Inter-Concept Relationships visual abstract">
        </div>
        <div class="authors-col-left">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2405.18217">
                Understanding Inter-Concept Relationships in Concept-Based Models
                </a>
            </div>
            <div>
                <p><b>International Conference On Machine Learning (ICML), 2024.</b></p>
                <p>
                    <a href="https://naveenraman.com/">Naveen Raman</a>,
                    <b>Mateo Espinosa Zarlenga</b>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>
                </p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2405.18217" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/naveenr414/Concept-Learning" class="custom-button button-code">Code</a>
        <a style="text-decoration: none;" target="_blank" href="https://www.youtube.com/watch?v=qj_G4UQtyLY" class="custom-button button-video">Video</a>
    </div>
</div>
<div class="paper-row">
    <div class="paper-container">
        <div class="authors-col-right">
            <div>
                <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2309.16928">
                Learning to Receive Help: Intervention-Aware Concept Embedding Models
                </a>
                </div>
                <p><b>Spotlight paper at the conference on Neural Information Processing Systems (NeurIPS), 2023</b></p>
                <p>
                    <b>Mateo Espinosa Zarlenga</b>,
                    <a href="https://collinskatie.github.io/">Katherine M. Collins</a>,
                    <a href="https://dj-research.netlify.app/">Krishnamurthy (DJ) Dvijotham</a>,
                    <a href="http://mlg.eng.cam.ac.uk/adrian">Adrian Weller</a>,
                    <a href="https://zohrehshams.com">Zohreh Shams</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>
                </p>
            </div>
        </div>
        <div class="image-col-right">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/intcem_thumbnail.png" alt="IntCEM architecture">
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2309.16928" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/cem" class="custom-button button-code">Code</a>
    </div>
</div>
<div class="paper-row">
    <div class="paper-container">
        <div class="image-col-left">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/dcr_thumbnail.png" alt="DCR visual abstract">
        </div>
        <div class="authors-col-left">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2304.14068">
                Interpretable Neural-Symbolic Concept Reasoning
                </a>
            </div>
            <div>
                <p><b>International Conference On Machine Learning (ICML), 2023. Also appeared at ICML's Differentiable Almost Everything Workshop, 2023.</b></p>
                <p>
                    <a href="https://www.pietrobarbiero.eu">Pietro Barbiero</a>,
                    <a href="https://sailab.diism.unisi.it/people/gabriele-ciravegna/">Gabriele Ciravegna</a>,
                    <a href="https://scholar.google.com/citations?user=KT3SRqgAAAAJ&hl=en">Francesco Giannini</a>,
                    <b>Mateo Espinosa Zarlenga</b>,
                    <a href="https://caraml-group.github.io/author/lucie-charlotte-magister/">Lucie Charlotte Magister</a>,
                    <a href="https://scholar.google.it/citations?user=M1t5hwYAAAAJ&hl=en">Alberto Tonda</a>,
                    <a href="https://www.cl.cam.ac.uk/~pl219/">Pietro Lio</a>,
                    <a href="https://www.i3s.unice.fr/~precioso/">Frederic Precioso</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>,
                    <a href="https://www.giuseppemarra.com/">Giuseppe Marra</a>
                </p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2304.14068" class="custom-button button-paper">Paper</a>
    </div>
</div>
<div class="paper-row">
    <div class="paper-container">
        <div class="authors-col-right">
            <div>
                <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2303.12872">
                Human Uncertainty in Concept-Based AI Systems
                </a>
            </div>
                <p><b>AAAI/ACM Conference on AI, Ethics, and Society (AIES), 2023</b></p>
                <p>
                    <a href="https://collinskatie.github.io/">Katherine M. Collins</a>,
                    <a href="https://matthewbarker.me/">Matthew Barker</a><sup>*</sup>,
                    <b>Mateo Espinosa Zarlenga</b><sup>*</sup>,
                    <a href="https://naveenraman.com/">Naveen Raman</a><sup>*</sup>,
                    <a href="https://umangsbhatt.github.io">Umang Bhatt</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>,
                    <a href="https://ilia10000.github.io/">Ilia Sucholutsky</a>,
                    <a href="http://mlg.eng.cam.ac.uk/adrian">Adrian Weller</a>,
                    <a href="https://dj-research.netlify.app/">Krishnamurthy (DJ) Dvijotham</a>
                </p>
            </div>
        </div>
        <div class="image-col-right">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/concept_uncertainty_thumbnail.png" alt="Concept uncertainty visual abstract">
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2303.12872" class="custom-button button-paper">Paper</a>
    </div>
</div>
<div class="paper-row">
    <div class="paper-container">
        <div class="image-col-left">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/quality_thumbnail.png" alt="Metrics visual abstract">
        </div>
        <div class="authors-col-left">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2301.10367">
                Towards Robust Metrics For Concept Representation Evaluation
                </a>
            </div>
            <div>
                <p><b>Association for the Advancement of Artificial Intelligence Conference on Artificial Intelligence (AAAI) as an oral presentation, 2023</b></p>
                <p>
                    <b>Mateo Espinosa Zarlenga</b><sup>*</sup>,
                    <a href="https://www.pietrobarbiero.eu">Pietro Barbiero</a><sup>*</sup>,
                    <a href="https://zohrehshams.com">Zohreh Shams</a><sup>*</sup>,
                    <a href="https://scholar.google.com/citations?user=MSFAgbkAAAAJ&hl=en">Dmitry Kazhdan</a>,
                    <a href="https://umangsbhatt.github.io">Umang Bhatt</a>,
                    <a href="http://mlg.eng.cam.ac.uk/adrian">Adrian Weller</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>
                </p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2301.10367" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/concept-quality" class="custom-button button-code">Code</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/concept-quality/blob/main/media/slides.pptx" class="custom-button button-slides">Slides</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/concept-quality/blob/main/media/poster.pdf" class="custom-button button-poster">Poster</a>
    </div>
</div>

<div class="paper-row">
    <div class="paper-container">
        <div class="authors-col-right">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/abs/2209.09056">
                Concept Embedding Models: Beyond the Accuracy-Explainability Trade-Off
                </a>
            </div>
            <div>
                <p><b>Conference on Neural Information Processing Systems (NeurIPS), 2022</b></p>
                <p>
                    <b>Mateo Espinosa Zarlenga</b><sup>*</sup>,
                    <a href="https://www.pietrobarbiero.eu">Pietro Barbiero</a><sup>*</sup>,
                    <a href="https://sailab.diism.unisi.it/people/gabriele-ciravegna/">Gabriele Ciravegna</a>,
                    <a href="https://www.giuseppemarra.com/">Giuseppe Marra</a>,
                    <a href="https://scholar.google.com/citations?user=KT3SRqgAAAAJ&hl=en">Francesco Giannini</a>,
                    <a href="https://scholar.google.com/citations?user=qI-LOjIAAAAJ&hl=en">Michelangelo Diligenti</a>,
                    <a href="https://zohrehshams.com">Zohreh Shams</a>,
                    <a href="https://www.i3s.unice.fr/~precioso/">Frederic Precioso</a>,
                    <a href="https://scholar.google.com/citations?user=_HHu1MQAAAAJ&hl=en">Stefano Melacci</a>,
                    <a href="http://mlg.eng.cam.ac.uk/adrian">Adrian Weller</a>,
                    <a href="https://www.cl.cam.ac.uk/~pl219/">Pietro Lio</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>.
            </p>
            </div>
        </div>
        <div class="image-col-right">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/cem_thumbnail.png" alt="CEM Main Results">
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2209.09056" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/cem" class="custom-button button-code">Code</a>
        <a style="text-decoration: none;" target="_blank" href="/assets/presentations/cem_neurips_2022_slides.pptx" class="custom-button button-slides">Slides</a>
        <a style="text-decoration: none;" target="_blank" href="/assets/posters/eclaire_poster.png" class="custom-button button-poster">Poster</a>
        <a style="text-decoration: none;" target="_blank" href="https://towardsdatascience.com/concept-embedding-models-beyond-the-accuracy-explainability-trade-off-f7ba02f28fad" class="custom-button button-blog">Blog</a>
    </div>
</div>
<div class="paper-row">
    <div class="paper-container">
        <div class="image-col-left">
            <img class="paper-thumbnail" src="/assets/images/thumbnails/microservices.png" alt="Microservices">
        </div>
        <div class="authors-col-left">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://dl.acm.org/doi/10.1145/3297858.3304013">
                An Open-Source Benchmark Suite for Microservices and Their Hardware-Software Implications for Cloud & Edge Systems
                </a>
            </div>
            <div>
                <p><b>The 24th ACM International Conference on Architectural Support for Programming Languages and Operating Systems (ASPLOS), 2019</b></p>
                <p>
                    Yu Gan,
                    Yanqi Zhang,
                    Dailun Cheng,
                    Ankitha Shetty,
                    Priyal Rathi,
                    Nayan Katarki,
                    Ariana Bruno,
                    Justin Hu,
                    Brian Ritchken,
                    Brendon Jackson,
                    Kelvin Hu,
                    Meghna Pancholi,
                    Yuan He,
                    Brett Clancy,
                    Chris Colen,
                    Fukang Wen,
                    Catherine Leung,
                    Siyuan Wang,
                    Leon Zaruvinsky,
                    <b>Mateo Espinosa Zarlenga</b>,
                    Rick Lin,
                    Zhongling Liu,
                    Jake Padilla,
                    Christina Delimitrou.
                </p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://dl.acm.org/doi/10.1145/3297858.3304013" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/delimitrou/DeathStarBench" class="custom-button button-code">Code</a>
    </div>
</div>

-----

### Journal Publications (Refereed and Archived)

<div class="paper-row">
    <div class="paper-container">
        <div class="authors-col-right">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://openreview.net/pdf?id=TIsrnWpjQ0">
                TabCBM: Concept-based Interpretable Neural Networks for Tabular Data
                </a>
            </div>
            <div>
                <p><b>Transactions of Machine Learning Research (TMLR), 2023. Also appeared at ICML's Workshop on Interpretable Machine Learning in Healthcare, 2023.</b></p>
                <p>
                    <b>Mateo Espinosa Zarlenga</b>,
                    <a href="https://zohrehshams.com">Zohreh Shams</a>,
                    <a href="https://www.physbiol.cam.ac.uk/staff/michael-nelson">Michael Edward Nelson</a>,
                    <a href="https://beenkim.github.io/">Been Kim</a><sup>*</sup>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a><sup>*</sup>
                </p>
            </div>
        </div>
        <div class="image-col-right">
            <img class="paper-thumbnail" style="max-width: 120%;" src="/assets/images/thumbnails/tabcbm_thumbnail.png" alt="TabCBM visual abstract">
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://openreview.net/forum?id=TIsrnWpjQ0" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/tabcbm" class="custom-button button-code">Code</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/tabcbm/blob/main/media/poster.pdf" class="custom-button button-poster">Poster</a>
    </div>
</div>
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
                <p>
                    Yu Gan,
                    Yanqi Zhang,
                    Dailun Cheng,
                    Ankitha Shetty,
                    Priyal Rathi,
                    Nayan Katarki,
                    Ariana Bruno,
                    Justin Hu,
                    Brian Ritchken,
                    Brendon Jackson,
                    Kelvin Hu,
                    Meghna Pancholi,
                    Yuan He,
                    Brett Clancy,
                    Chris Colen,
                    Fukang Wen,
                    Catherine Leung,
                    Siyuan Wang,
                    Leon Zaruvinsky,
                    <b>Mateo Espinosa Zarlenga</b>,
                    Rick Lin,
                    Zhongling Liu,
                    Jake Padilla,
                    Christina Delimitrou.
                </p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://ieeexplore.ieee.org/document/9076308" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/delimitrou/DeathStarBench" class="custom-button button-code">Code</a>
    </div>
</div>


-----


### Workshop Publications (Refereed)
<div class="paper-row">
    <div class="paper-container">
        <div class="authors-col-right">
            <div>
                <a style="color:navy; font-weight: bold;" target="_blank" href="https://arxiv.org/pdf/2401.01259.pdf">
                Do Concept Bottleneck Models Obey Locality?
                </a>
            </div>
            <div>
                <p><b>"<a href="https://xai-in-action.github.io/">XAI in Action: Past, Present, and Future Applications</a>" Workshop @ NeurIPS 2023</b></p>
                <p>
                    <a href="https://naveenraman.com/">Naveen Raman</a>,
                    <b>Mateo Espinosa Zarlenga</b>,
                    <a href="https://sites.google.com/view/juyeonheo/%ED%99%88">Juyeon Heo</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>
                </p>
            </div>
        </div>
        <div class="image-col-right">
            <img class="paper-thumbnail" style="max-width: 120%;" src="/assets/images/thumbnails/cbm_locality_thumbnail.png" alt="CBM locality visual abstract">
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/pdf/2401.01259.pdf" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/naveenr414/Spurious-Concepts" class="custom-button button-code">Code</a>
    </div>
</div>
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
                <p><b>1st NeurIPS Workshop on eXplainable AI approaches for debugging and diagnosis (XAI4Debugging@NeurIPS) as a spotlight presentation, 2021</b></p>
                <p>
                    <b>Mateo Espinosa Zarlenga</b>,
                    <a href="https://zohrehshams.com">Zohreh Shams</a>,
                    <a href="https://www.cl.cam.ac.uk/~mj201">Mateja Jamnik</a>.
                </p>
            </div>
        </div>
    </div>
    <div style="text-align: center;">
        <a style="text-decoration: none;" target="_blank" href="https://arxiv.org/abs/2111.12628" class="custom-button button-paper">Paper</a>
        <a style="text-decoration: none;" target="_blank" href="https://github.com/mateoespinosa/remix" class="custom-button button-code">Code</a>
        <a style="text-decoration: none;" target="_blank" href="/assets/presentations/eclaire_neurips_slides.pptx" class="custom-button button-slides">Slides</a>
        <a style="text-decoration: none;" target="_blank" href="/assets/posters/eclaire_poster.png" class="custom-button button-poster">Poster</a>
    </div>
</div>

-----
