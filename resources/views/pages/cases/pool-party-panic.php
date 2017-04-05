<script type="template" id="<?=$slug;?>">
    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"If you can't stand the heat... I think you know"</h3>
                    <h4 data-delay=".2">- Sean Price -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/pool-party-panic/outlawslogo-black.png" />
                </div>
            </div>
        </div>
    </div>
    <section class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/pool-party-panic/tv.png" style="width:100%;" class="smart-object"/>
        </div>
    </section>

    <section class="section is-unpadded--horizontal is-colored--dark" style="font-size: 0">

        <div class="row">
            <div class="column span-5-10 span-md-10-10 is-unpadded is-aligned--center">
                <img data-delay=".4" src="/static/img/cases/pool-party-panic/screenshots/g2.png" style="border:2px solid white; width:95%; margin-bottom:10px" class="smart-object"/>
                <img data-delay=".8" src="/static/img/cases/pool-party-panic/screenshots/g3.png" style="border:2px solid white; width:95%; margin-top:10px" class="smart-object"/>
            </div>
            <div class="column span-5-10 span-md-10-10 is-unpadded is-aligned--center">
                <img data-delay=".2" src="/static/img/cases/pool-party-panic/screenshots/g4.png" style="border:2px solid white; width:95%; margin-bottom:10px" class="smart-object"/>
                <img data-delay=".6" src="/static/img/cases/pool-party-panic/screenshots/g5.png" style="border:2px solid white; width:95%; margin-top:10px" class="smart-object"/>
            </div>
        </div>
    </section>
    <section class="section is-unpadded black-style" style="overflow:hidden; background-color:black;">
        <div class="video-container" data-component="video">
            <video class="video-full" poster="/static/img/cases/pool-party-panic/poster.jpg">
                <source src="/static/video/cases/pool-party-panic/promo.mp4" type="video/mp4">
            </video>
        </div>
    </section>
    <?php echo view('layouts.project-footer');?>
</script>