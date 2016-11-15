<section class="section section-portfolio-items is-unpadded is-colored--dark">

    <div class="project-item-container double">
        <div class="project-item" data-slug="<%= model.get('prev').slug %>"  data-delay="0">
            <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.get('prev').header %>');"></figure>
            <h2 class="project-item-title"><i>previous</i></h2>
        </div>
        <div class="project-item" data-slug="<%= model.get('next').slug %>" data-delay=".2">
            <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.get('next').header %>');"></figure>
            <h2 class="project-item-title"><i>next</i></h2>
        </div>
    </div>
</section>