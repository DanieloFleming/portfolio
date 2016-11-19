<script type="template" class="page" id="homepage">
    <section class="section section-header is-unpadded is-mobile">
            <div class="accordeon-overlay" data-delay=".0" data-transition-type="zoomOut"
            styles="background-image:url('/static/img/backgrounds/destruction.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;">
                <div class="accordeon-content">
                    <h1 class="accordeon-overlay-title">
                        To destroy is always the first step in any creation.

                        <span> - <i>Pablo</i>Picasso - </span>
                    </h1>
                </div>
            </div>

            <div class="scroll-indicator scroll-to light" data-delay=".4">
                <span class="indicator"></span>
                <span class="indicator-text text-top">latest</span>
                <span class="indicator-text text-bottom">cases</span>
            </div>
    </section>

    <section class="section section-portfolio-items is-unpadded is-colored--dark is-mobile">

        <% for(var index = 0; index <= collection.length; index++) {
            var model = collection[index] || {};
            var isDouble = (collection.length - index > 1) ? "double" : "single";
            var delay = .2 * index + .3;
        %>

            <% if(index % 2 == 0) { %>
                <div class="project-item-container  <%= isDouble %>" >
            <% } %>

            <% if (index - collection.length == 0) { %>
                <div class="project-item-placeholder all-cases" data-delay=".2" data-transition-type="slideUp">
                    <h2 class="project-item-title"><?=$placeholder->sub_title;?></h2>
                </div>
            <% } else { %>
                <div class="project-item <%= model.slug %>" data-slug="<%= model.slug %>" data-delay="<%= delay %>">
                    <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.image.src %>');"></figure>
                    <h2 class="project-item-title" data-transition-type="slideLeft" data-delay="<%= delay + .2%>"> <% model.sub_title%> </h2>
                </div>
            <% } %>

            <% if(index % 2 == 1) %> </div>
        <% } %>
        <!-- if( collection.length % 2 == 1 ) </div> -->
    </section>

    <section class="section section-accordeon is-unpadded section-header">
        <div class="accordeon stroke-1" data-slug="djos-ink">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".0" style="background-image:url('/static/img/cases/djos-ink/thumb.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>

            <h2 class="accordeon-title"><i>Djos</i>Ink</h2>
        </div>
        <div class="accordeon" data-slug="cafe-de-kroeg">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".1" style="background-image:url('/static/img/cases/cafe-de-kroeg/thumb.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>
            <h2 class="accordeon-title"><i>De</i>Kroeg</h2>
        </div>
        <div class="accordeon" data-slug="meteor-strike">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".2" style="background-image:url('/static/img/cases/meteor-strike/thumb-2.png'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>
            <h2 class="accordeon-title"><i>M</i>Strike</h2>
        </div>
        <div class="accordeon" data-slug="noted">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".3" style="background-image:url('/static/img/cases/noted/thumb.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>
            <h2 class="accordeon-title"><i>N</i>oted</h2>
        </div>
        <div class="accordeon accordeon-placeholder" data-slug="" data-transition-type="fadeIn" data-delay=".4">
            <div class="accordeon-image-item smart-object" style="background:white"></div>
            <h2 class="accordeon-title"><i>all</i>cases</h2>
        </div>
        <div class="accordeon-overlay overlay-desktop" data-delay=".2" data-transition-type="zoomOut" >
            <div class="accordeon-content">
                <h1 class="accordeon-overlay-title">
                    To destroy is always the first step in any creation.

                    <span> - <i>Pablo</i>Picasso - </span>
                </h1>

            </div>
            <div class="scroll-indicator scroll-hide light" data-delay=".4">
                <span class="indicator"></span>
                <span class="indicator-text text-top">latest</span>
                <span class="indicator-text text-bottom">cases</span>
            </div>
        </div>

    </section>
</script>