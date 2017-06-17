<script type="template" id="<?=$slug;?>">
    <?= view('layouts.project-item-header');?>

    <section class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"These young guys are playing checkers. I'm out there playing chess"</h3>
                    <h4 data-delay=".2">- Kobe Bryant -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/rz-basketball/logo.png" />
                </div>
            </div>
        </div>
    </section>

    <section class="section">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/rz-basketball/mac.png" style="width:100%" class="smart-object"/>
        </div>
    </section>

    <div class="section is-colored--dark">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/rz-basketball/tabs-2.png" style="width:100%;" class="smart-object"/>
        </div>
    </div>

    <section class="section">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/rz-basketball/mobiles.png" style="width:100%;" class="smart-object"/>
        </div>
    </section>
    <section class="section is-unpadded--bottom is-aligned--center is-colored--dark">
        <h1 data-delay="0">#WEARERZ</h1>
    </section>
    <section class="section is-aligned--center is-colored--dark"
             style="display:flex; justify-content:space-around; flex-wrap:wrap; align-items:flex-start;padding-top: 2rem">
        <?php for($i = 1; $i < 11; $i++):?>
            <img data-transition-type="slideDown" data-delay="<?=.15 * $i;?>" src="/static/img/cases/rz-basketball/insta/<?=$i;?>.jpg" style="width:calc(<?=(100/5);?>% - 10px);  height: auto; margin: 5px">
        <?php endfor;?>
    </section>
    <div class="section is-unpadded black-style" style="overflow:hidden; background-color:black;">
        <div class="video-container" data-component="video">
            <video class="video-full" poster="/static/img/cases/rz-basketball/poster.jpg">
                <source src="/static/video/cases/rz-basketball/rz-promo.mp4" type="video/mp4">
            </video>
        </div>
    </div>
    <?php echo view('layouts.project-footer')->with('data', $data);?>
</script>