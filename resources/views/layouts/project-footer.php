<section class="section section-portfolio-items is-unpadded is-colored--dark">

        <div class="project-item-container double">
                <div class="project-item" data-slug="<%= model.get('prev').slug %>">
                        <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.get('prev').image.src %>');"></figure>
                        <h2 class="project-item-title"><i>previous</i></h2>
                </div>
                <div class="project-item" data-slug="<%= model.get('next').slug %>">
                        <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.get('next').image.src %>');"></figure>
                        <h2 class="project-item-title"><i>next</i></h2>
                </div>
        </div>
</section>

<section class="section is-unpadded footer-cases">
        <p class="footer-cases-text">MORE<i>CASES</i></p>
</section>
<?= view('layouts.footer');?>