<script type="template" id="<?=$slug;?>">

    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"Beauty... is in the eye of the beer holder."</h3>
                    <h4 data-delay=".2">- Kinky Friedman -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/cafe-de-kroeg/bavaria-logo.jpg" />
                </div>
            </div>
        </div>
    </div>
    <div class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/cafe-de-kroeg/responsive2.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>

    <div class="section is-unpadded" style="overflow:hidden; background-color:black;">
        <div class="video-container" data-component="video" data-delay="0">
            <video class="video-full" poster="/static/img/cases/cafe-de-kroeg/poster.jpg">
                <source src="/static/video/cases/cafe-de-kroeg/promo.mp4" type="video/mp4">
            </video>
        </div>
    </div>

    <?php echo view('layouts.project-footer');?>
</script>