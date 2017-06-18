<script type="template" id="<?=$slug;?>">

    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"You white folks see UFOs in your dreams. You don't hear about Martians in Harlem"</h3>
                    <h4 data-delay=".2">- Paul Mooney -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/lucidicy/infoboard.png" />
                </div>
            </div>
            <img data-delay=".6" src="/static/img/cases/lucidicy/lucidicy_tablet.png" style="width:100%" class="smart-object"/> 
        </div>
    </div>

    <section class="section is-unpadded--bottom" style="background-color: #010d1d">
        <div class="row">
            <div class="column span-5-10 span-md-10-10 is-aligned--center">
                <img data-delay=".2" src="/static/img/cases/lucidicy/screenshots/2.jpg" style="border:2px solid white; width:95%;  margin-bottom:1rem" class="smart-object"/>
            </div>
            <div class="column span-5-10 span-md-10-10 is-aligned--center">
                <img data-delay=".4" src="/static/img/cases/lucidicy/screenshots/1.jpg" style="border:2px solid white; width:95%;  margin-bottom:1rem" class="smart-object"/>
            </div>
            <div class="column span-5-10 span-md-10-10 is-aligned--center">
                <img data-delay=".6" src="/static/img/cases/lucidicy/screenshots/7.jpg" style="border:2px solid white; width:95%;  margin-bottom:1rem" class="smart-object"/>
            </div>
            <div class="column span-5-10 span-md-10-10 is-aligned--center">
                <img data-delay=".8" src="/static/img/cases/lucidicy/screenshots/3.jpg" style="border:2px solid white; width:95%;  margin-bottom:1rem" class="smart-object"/>
            </div>
        </div>
    </section>
    <section class="section is-unpadded black-style" style="overflow:hidden; background-color:black;">
        <div class="video-container" data-component="video">
            <video class="video-full" poster="/static/img/cases/lucidicy/poster.gif">
                <source src="/static/video/cases/lucidicy/promo.mp4" type="video/mp4">
            </video>
        </div>
    </section>
    <?php echo view('layouts.project-footer')->with('data', $data);?>
</script>
