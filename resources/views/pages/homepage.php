<script type="template" class="page" id="homepage">
    <section class="section parallax section-header header-homepage is-unpadded is-inverted">
        <video class="video-header-homepage" playsinline muted autoplay loop data-delay=".5" data-transition-type="fadeIn">
            <source src="/static/video/trailer.mp4" type="video/mp4">
        </video>
        <div data-delay="0" data-transition-type="fadeIn" class="row fill-parent is-aligned--middle is-unpadded is-aligned--center header-content">
            <div class="column span-8-10 space-l-1-10 span-md-10-10 space-md-none">
                <h1 class="title" data-delay=".2">I'm pointing at the moon, but you keep looking at my finger.</h1>
                <h3 class="text is-bold" data-delay=".4"> - <i>VAST</i>AIRE - </h3>
            </div>

            <div class="scroll-indicator scroll-to" data-delay=".6">
                <span class="indicator"></span>
                <span class="indicator-text text-top">latest</span>
                <span class="indicator-text text-bottom">cases</span>
            </div>
        </div>

    </section>

    <section class="section section-portfolio-items is-unpadded is-inverted">

        <% for(var index = 0; index <= collection.length; index++) {
            var model = collection[index] || {};

            var delay = .2 * index + .3;
        %>

            <% if(index % 2 == 0) {
                var isDouble = (collection.length - index > 0) ? "double" : "single";
            %>

                <div class="project-item-container <%= isDouble %>">
            <% } %>

            <% if (index - collection.length === 0) { %>
                <div class="project-item-placeholder all-cases" data-delay="<%= delay %>">
                    <figure class="project-item-thumb" style="background-image:url('<?=$placeholder->header;?>');"></figure>
                    <h2 class="project-item-title"><?=$placeholder->sub_title;?></h2>
                </div>
            <% } else { %>
                <div class="project-item <%= model.slug %>" data-slug="<%= model.slug %>" data-delay="<%= delay %>">
                    <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.image.src %>');"></figure>
                    <h2 class="project-item-title" data-transition-type="slideDown" data-delay="<%= delay + .4 %>"> <%= model.sub_title%> </h2>
                </div>
            <% } %>

            <% if(index % 2 === 1) %> </div>
        <% } %>

        <% if( collection.length % 2 === 1 ) %> </div>
    </section>
    <?= view('layouts.footer');?>
</script>