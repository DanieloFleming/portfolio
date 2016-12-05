<script type="template" class="page" id="homepage">
    <section class="section section-header is-unpadded">
        <div class="row fill-parent is-aligned--middle is-unpadded is-aligned--center">
            <div class="column span-8-10 space-l-1-10 span-md-10-10 space-md-none">
                <h1 class="title" data-delay="0">I'm poiting at the moon, but you keep looking at my finger.</h1>
                <h3 class="text is-bold" data-delay=".2"> - <i>VAST</i>AIRE - </h3>
            </div>
        </div>
        <div class="scroll-indicator scroll-to" data-delay=".4">
            <span class="indicator"></span>
            <span class="indicator-text text-top">latest</span>
            <span class="indicator-text text-bottom">cases</span>
        </div>
    </section>

    <section class="section section-portfolio-items is-unpadded is-colored--dark">

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
</script>