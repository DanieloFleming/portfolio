<script type="template" id="<?=$slug;?>">
    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"Record collecting is an infinite journey backwards"</h3>
                    <h4 data-delay=".2">- Zach Cowie -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/vinylly-music-player/vinyl.png" />
                </div>
            </div>
        </div>
    </div>
    <div class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/vinylly-music-player/views.png" style="width:100%;" class="smart-object"/>
        </div>
    </div>
    <section class="section" style="background:#e6e6e6;">
        <div class="container is-centered">
            <iframe data-delay="0"
                    src="<?= url('/static/demos/vinylly/index.html');?>"
                    style="width:100%; height:100%; position:absolute; top:0; left:0">
            </iframe>
            <canvas width="300" height="500" style="visibility: hidden"></canvas>
        </div>
    </section>
    <?php echo view('layouts.project-footer');?>
</script>