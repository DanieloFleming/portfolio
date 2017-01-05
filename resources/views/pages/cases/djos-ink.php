<script type="template" id="<?=$slug;?>">

    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"The greatest pleasure in life is doing what people say you cannot do."</h3>
                    <h4 data-delay=".2">- Djovani Pimentel -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/djos-ink/djo.jpg" />
                </div>
            </div>
        </div>
    </div>
    <div class="section is-upadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/imac-showcase.jpg" style="width:97%" class="smart-object"/>
        </div>
    </div>
    <div class="section is-colored--dark">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/ipad-showcase-2.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>
    <div class="section">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/iphone-showcase-2.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>
    <div class="section is-colored--dark">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/browser-showcase.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>
    <div class="section is-unpadded" style="overflow:hidden; background-color:black;">
        <div class="video-container" data-component="video" data-delay="0">
            <video class="video-full" poster="/static/img/cases/djos-ink/poster3.jpg">
                <source src="/static/video/cases/djos-ink/djos-ink-promo_hd.mp4" type="video/mp4">
            </video>
        </div>
    </div>

    <?php echo view('layouts.project-footer');?>
</script>