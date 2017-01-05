<script type="template" id="<?=$slug;?>">
    <?= view('layouts.project-item-header');?>

    <section class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"High heels were invented by a woman who had been kissed on the forehead."</h3>
                    <h4 data-delay=".2">- Christopher Morley -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/tanya-heath-paris/logo.png" />
                </div>
            </div>
        </div>
    </section>

    <section class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/tanya-heath-paris/mac-2016.png" style="width:100%;" class="smart-object"/>
        </div>
    </section>

    <section class="section is-unpadded--bottom is-aligned--center is-colored--dark">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/tanya-heath-paris/devices.png" style="width: 100%; max-width: 700px" class="smart-object"/>
        </div>
    </section>

    <section class="section is-unpadded">
        <div class="container is-centered">
            <iframe data-delay="0"
                    src="<?= url('/static/demos/heels/index.html');?>"
                    style="width:100%; height:100%; position:absolute; top:0; left:0"></iframe>
            <canvas width="480" height="450" style="width:90%; max-height:490px; visibility: hidden"></canvas>
        </div>
    </section>

    <section class="section is-unpadded" style="line-height:0">
        <img data-delay="0" src="/static/img/cases/tanya-heath-paris/autumn-phone.jpg" style="width:100%" class="smart-object"/>
    </section>

    <?php echo view('layouts.project-footer');?>
</script>