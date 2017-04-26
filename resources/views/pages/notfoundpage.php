<script type="template" id="404">
    <section class="section section-header header-homepage is-aligned--centered is-inverted is-unpadded" style="border:10px solid white">
        <video class="video-header-homepage" muted autoplay loop data-delay="0" data-transition-type="fadeIn">
            <source src="/static/video/404/404.mp4" type="video/mp4">
        </video>
        <div class="row fill-parent is-aligned--middle is-unpadded header-content" data-delay="0" data-transition-type="zoomOut">
            <div class="column span-8-10 space-l-1-10 span-md-10-10 space-md-none">
                <h1 class="title" data-delay="1.2" data-transition-type="zoomOut" style="font-size: 150px"> 404</h1>
                <h3 class="text is-bold" data-delay="1.4">You really don't want to be here...</h3>
            </div>
        </div>
        <div class="scroll-indicator scroll-to" data-delay=".6">
            <span class="indicator"></span>
            <span class="indicator-text text-top">Help me</span>
            <span class="indicator-text text-bottom">Leave!</span>
        </div>
    </section>
    <?= view('layouts.footer');?>
</script>