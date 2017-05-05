<script type="template" id="<?=$slug;?>">

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
    <div class="section" style="background:url('/static/img/cases/meteor-strike/blue.png'); repeat;">
        <img data-delay="0" src="/static/img/cases/meteor-strike/sprite3.png" style="width:100%;" class="smart-object layer_middle"/>
<!--
        <div class="layer_group layer_front">
            <img src="/static/img/cases/meteor-strike/sliced/sprite_05.png" style="position:absolute; left:0; top:0;">
            <img src="/static/img/cases/meteor-strike/sliced/sprite_06.png" style="position:absolute; left:210%; top:130px;">
            <img src="/static/img/cases/meteor-strike/sliced/sprite_08.png" style="position:absolute; left:89%; top:150px;">
        </div>
        <div class="layer_group layer_middle">
            <img src="/static/img/cases/meteor-strike/sliced/sprite_05.png" style="position:absolute; left:40%; top:0;">
            <img src="/static/img/cases/meteor-strike/sliced/sprite_06.png" style="position:absolute; left:11%; top:130px;">
            <img src="/static/img/cases/meteor-strike/sliced/sprite_07.png" style="position:absolute; left:60%; top:210px;">
        </div>
        <div class="layer_group layer_back">
            <img src="/static/img/cases/meteor-strike/sliced/sprite_07.png" style="position:absolute; left:34%; top:210px;">

            <img src="/static/img/cases/meteor-strike/sliced/sprite_08.png" style="position:absolute; left:70%; top:150px;">
        </div>-->
    </div>
    <div class="section is-aligned--center is-unpadded" style="background:#3A2E3F">
        <div class="row is-unpadded">
            <div class="column is-unpadded">
                <iframe src="<?= url('/static/demos/mstrike/test.html');?>" style="width:100%; height:100%; max-width:800px;position:absolute;top:0"></iframe>
                <canvas width="800" height="600" style="width:100%; max-width:800px;  visibility: hidden"></canvas>
            </div>
        </div>
    </div>

    <?php echo view('layouts.project-footer');?>
</script>