<script type="template" id="noted">

    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"As it was written, so it shall be done."</h3>
                    <h4 data-delay=".2">- George Patton -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/noted/logo-noted.png" />
                </div>
            </div>
        </div>
    </div>
    <div class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/noted/triple-view.jpg" style="width:100%;" class="smart-object"/>
        </div>
    </div>
    <div class="section is-colored--dark">
        <div class="container">
            <div class="image-container" style="position:relative;">
                <img data-delay="0" src="/static/img/cases/noted/layer-bottom.png" style="width:100%;" class="smart-object"/>
                <img data-delay=".2"  src="/static/img/cases/noted/layer-center.png" style="width:100%; position:absolute; top:0; left:0;" class="smart-object"/>
                <img data-delay=".4" src="/static/img/cases/noted/layer-top.png" style="width:100%; position:absolute; top:0; left:0;" class="smart-object"/>
            </div>
        </div>
    </div>
    <div class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/noted/3th-view.jpg" style="width:100%;" class="smart-object"/>
        </div>
    </div>
    <div class="section is-unpadded" style="line-height:0">
        <img data-delay="0" src="/static/img/cases/noted/yellow.jpg" style="width:100%" class="smart-object"/>
    </div>

    <?php echo view('layouts.footer');?>
</script>