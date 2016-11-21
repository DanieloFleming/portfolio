<script type="template" id="project-index">
    <section class="section section-portfolio-items is-unpadded is-colored--dark">

        <% for(var index = 0; index <= collection.length; index++) {
            var model = collection[index] || {};
            var isDouble = (collection.length - index > 1) ? "double" : "single";
            var delay = .2 * index + .3;
            var side = (index % 2 == 0) ? 'left' : 'right';
        %>

            <% if(index % 2 === 0) { %>
                <div class="project-item-container <%= isDouble %>" >
            <% } %>

            <% if (index - collection.length === 0) { %>
                <div class="empty-project-item <%= side %> data-delay="<%= delay %>">
                    <?= $placeholder->content;?>
                </div>
            <% } else { %>
                <div class="project-item <%= model.slug %>" data-slug="<%= model.slug %>" data-delay="<%= delay %>">
                    <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.image.src %>');"></figure>
                    <h2 class="project-item-title"  data-delay="<%= delay + .2 %>"> <%= model.sub_title%> </h2>
                </div>
            <% } %>

            <% if(index % 2 === 1) %> </div>
        <% } %>

        <% if( collection.length % 2 === 1 ) %> </div>
    </section>

</script>