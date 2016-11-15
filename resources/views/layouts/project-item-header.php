<div class="section section-header is-inverted is-aligned--center">
    <div class="header-background" data-headerImageUrl="<%= model.get('header') %>"></div>
    <div class="row fill-parent is-aligned--middle is-unpadded">
        <div class="column">
            <h3 class="title" data-delay="0">- <%= model.get('type') %> -</h3>
            <h1 class="title" data-delay=".2" ><%= model.get('title') %></h1>
        </div>
    </div>
    <div class="scroll-indicator scroll-to" data-delay=".4">
        <span class="indicator"></span>
        <span class="indicator-text text-top">view</span>
        <span class="indicator-text text-bottom">project</span>
    </div>
</div>