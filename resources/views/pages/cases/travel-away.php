<script type="template" id="<?=$slug;?>">

    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"Man cannot discover new oceans unless he has the courage to lose sight of the shore."</h3>
                    <h4 data-delay=".2">- Andre Gide -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/travel-away/logo-away.jpg" />
                </div>
            </div>
            <img data-delay=".6" src="/static/img/cases/travel-away/responsive.jpg" style="width:100%;" class="smart-object"/>
        </div>
    </div>

    <div class="section is-unpadded" style="line-height:0">
        <img data-delay="0" src="/static/img/cases/travel-away/showcase.jpg" style="width:100%" class="smart-object"/>
    </div>

    <?php echo view('layouts.project-footer')->with('data', $data);?>
</script>