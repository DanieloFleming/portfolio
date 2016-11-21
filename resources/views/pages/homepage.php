<script type="template" class="page" id="homepage">
    <section class="section section-header is-unpadded">
                <div class="accordeon-content">
                    <h1 class="accordeon-overlay-title" data-delay="0">
                        To destroy is always the first step in any creation.

                        <span data-delay=".2"> - <i>Pablo</i>Picasso - </span>
                    </h1>
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
            var isDouble = (collection.length - index > 1) ? "double" : "single";
            var delay = .2 * index + .3;
        %>

            <% if(index % 2 === 0) { %>
                <div class="project-item-container <%= isDouble %>" >
            <% } %>

            <% if (index - collection.length === 0) { %>
                <div class="project-item-placeholder all-cases" data-delay="<%= delay %>" data-transition-type="slideUp">
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