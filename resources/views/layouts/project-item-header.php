<div class="section parallax section-header is-inverted is-aligned--center is-unpadded--vertical">
    <div class="header-background" data-headerImageUrl="<%= model.get('image').src %>"></div>
    <div class="row fill-parent is-aligned--middle is-unpadded section-header--info">
        <div class="column is-unpadded--horizontal">
            <h3 class="sub-title" data-delay=".2">- <%= model.get('type') %> -</h3>
            <h1 class="case-header-title" data-delay=".4" ><%= model.get('title') %></h1>
        </div>

        <div class="scroll-indicator scroll-to" data-delay=".6">
            <span class="indicator"></span>
            <span class="indicator-text text-top">view</span>
            <span class="indicator-text text-bottom">project</span>
        </div>
    </div>
</div>