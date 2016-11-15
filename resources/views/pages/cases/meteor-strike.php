<script type="template" id="meteor-strike">

    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"Galloping around the cosmos is a game for the young"</h3>
                    <h4 data-delay=".2">- Captain Kirk -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/meteor-strike/enemyBlack2.png" />
                </div>
            </div>
        </div>
    </div>
    <div class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/meteor-strike/aircase.jpg" style="width:100%;" class="smart-object"/>
        </div>
    </div>
    <div class="section" style="background:url('/static/img/cases/meteor-strike/blue.png'); center center repeat">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/meteor-strike/sprite3.png" style="width:100%;" class="smart-object"/>
        </div>
    </div>
    <div class="section is-aligned--center is-unpadded" style="background:#3A2E3F">
        <div class="row is-unpadded">
            <div class="column is-unpadded">
                <iframe src="<?= url('/static/demos/mstrike/test.html');?>" style="width:100%; height:100%; max-width:800px;position:absolute;top:0"></iframe>
                <canvas width="800" height="600" style="width:100%; max-width:800px"></canvas>
            </div>
        </div>
    </div>

    <?php echo view('layouts.footer');?>
</script>