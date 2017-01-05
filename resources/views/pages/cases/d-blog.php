<script type="template" id="<?=$slug;?>">
    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"A blank piece of paper is God’s way of telling us how hard it to be God"</h3>
                    <h4 data-delay=".2">- Sidney Sheldon -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/d-blog/logo2.gif" />
                </div>
            </div>
        </div>
    </div>
    <div class="section is-upadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/d-blog/macbook.png" style="width:100%" class="smart-object"/>
        </div>
    </div>
    <div class="section is-colored--dark is-unpadded--bottom">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/d-blog/page.png" style="width:100%" class="smart-object"/>
        </div>
    </div>
    <div class="section">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/d-blog/mobile.png" style="width:100%; max-width: 780px;" class="smart-object"/>
        </div>
    </div>
    <section class="section" style="background: #f6f6f6;">
        <div class="container is-centered">
            <iframe data-delay="0"
                    src="<?= url('/static/demos/editor/index.php');?>"
                    style="width:100%; height:100%; position:absolute; top:0; left:0">
            </iframe>
            <canvas width="480" height="437" style="visibility: hidden"></canvas>
        </div>
    </section>
    <?php echo view('layouts.project-footer');?>
</script>