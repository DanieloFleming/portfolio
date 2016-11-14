<script type="template" id="djos-ink">

    <div class="section section-header is-inverted is-aligned--center" style="background-color:white">
        <div class="header-background"  data-HeaderImageUrl="/static/img/cases/djos-ink/thumb.jpg"></div>
        <div class="row fill-parent is-aligned--middle is-unpadded">
            <div class="column">
                <h3 class="title" data-delay="0">- <%= model.get('type') %> -</h3>
                <h1 class="title" data-delay=".2" ><%= model.get('title') %></h1>
            </div>
        </div>
        <div class="scroll-indicator scroll-to" data-delay=".4">
            <span class="indicator"></span>
            <span class="indicator-text text-top">view</span>
            <span class="indicator-text text-bottom">project</span>
        </div>
    </div>
    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"The greatest pleasure in life is doing what people say you cannot do."</h3>
                    <h4 data-delay=".2">- Djovani Pimentel -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/djos-ink/djo.jpg" />
                </div>
            </div>
        </div>
    </div><!--
    <div class="section is-colored--dark">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/browser-showcase.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>-->
    <div class="section is-upadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/imac-showcase.jpg" style="width:97%" class="smart-object"/>
        </div>
    </div>
    <div class="section is-colored--dark">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/ipad-showcase-2.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>
    <div class="section">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/djos-ink/iphone-showcase-2.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>

    <div class="section is-unpadded" style="overflow:hidden; background-color:black;">
        <div class="video-container" data-component="video" data-delay="0">
            <video class="video-full" poster="/static/img/cases/djos-ink/poster3.jpg">
                <source src="/static/video/cases/djos-ink/djos-ink-promo_hd.mp4" type="video/mp4">
            </video>
        </div>
        
    </div>

    <section class="section section-portfolio-items is-unpadded is-colored--dark">

        <div class="project-item-container double">
            <div class="project-item" data-slug="travel-away"  data-delay="0">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/travel-away/thumb.jpg');"></figure>           
                <h2 class="project-item-title"><i>previous</i></h2>
            </div>
            <div class="project-item" data-slug="cafe-de-kroeg" data-delay=".2">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/cafe-de-kroeg/thumb.jpg');"></figure>     
                <h2 class="project-item-title"><i>next</i></h2>
            </div>
        </div>
    </section>
    <?php echo view('layouts.footer');?>
</script>

<script type="template" id="cafe-de-kroeg">

    <div class="section section-header is-inverted is-aligned--center">
        <div class="header-background" data-headerImageUrl="/static/img/cases/cafe-de-kroeg/thumb.jpg"></div>
        <div class="row fill-parent is-aligned--middle is-unpadded">
            <div class="column">
                <h3 class="title" data-delay="0">- <%= model.get('type') %> -</h3>
                <h1 class="title" data-delay=".2" ><%= model.get('title') %></h1>
            </div>
        </div>
        <div class="scroll-indicator scroll-to" data-delay=".4">
            <span class="indicator"></span>
            <span class="indicator-text text-top">view</span>
            <span class="indicator-text text-bottom">project</span>
        </div>
    </div>
    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"Beauty... is in the eye of the beer holder."</h3>
                    <h4 data-delay=".2">- Kinky Friedman -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/cafe-de-kroeg/bavaria-logo.jpg" />
                </div>
            </div>
        </div>
    </div>
    <div class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/cafe-de-kroeg/responsive2.jpg" style="width:100%" class="smart-object"/>
        </div>
    </div>

    <div class="section is-unpadded" style="overflow:hidden; background-color:black;">
        <div class="video-container" data-component="video" data-delay="0">
            <video class="video-full" poster="/static/img/cases/cafe-de-kroeg/poster.jpg">
                <source src="/static/video/cases/cafe-de-kroeg/promo.mp4" type="video/mp4">
            </video>
        </div>
        
    </div>

    <section class="section section-portfolio-items is-unpadded is-colored--dark">

        <div class="project-item-container double">
            <div class="project-item" data-slug="djos-ink"  data-delay="0">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/djos-ink/thumb.jpg');"></figure>           
                <h2 class="project-item-title"><i>previous</i></h2>
            </div>
            <div class="project-item" data-slug="meteor-strike" data-delay=".2">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/meteor-strike/thumb-2.png');"></figure>     
                <h2 class="project-item-title"><i>next</i></h2>
            </div>
        </div>
    </section>

    <?php echo view('layouts.footer');?>
</script>

<script type="template" id="meteor-strike">
    <div class="section section-header is-inverted is-aligned--center">
        <div class="header-background" data-headerImageUrl="/static/img/cases/meteor-strike/thumb-2.png"></div>
        <div class="row fill-parent is-aligned--middle is-unpadded">
            <div class="column">
                <h3 class="title" data-delay="0">- <%= model.get('type') %> -</h3>
                <h1 class="title" data-delay=".2" ><%= model.get('title') %></h1>
            </div>
        </div>
        <div class="scroll-indicator scroll-to" data-delay=".4">
            <span class="indicator"></span>
            <span class="indicator-text text-top">view</span>
            <span class="indicator-text text-bottom">project</span>
        </div>
    </div>

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
    <section class="section section-portfolio-items is-unpadded is-colored--dark">
        <div class="project-item-container double">
            <div class="project-item" data-slug="cafe-de-kroeg"  data-delay="0">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/cafe-de-kroeg/thumb.jpg');"></figure>           
                <h2 class="project-item-title"><i>previous</i></h2>
            </div>
            <div class="project-item" data-slug="noted" data-delay=".2">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/noted/thumb.jpg');"></figure>     
                <h2 class="project-item-title"><i>next</i></h2>
            </div>
        </div>
    </section>

    <?php echo view('layouts.footer');?>
</script>
<script type="template" id="noted">
    <div class="section section-header is-inverted is-aligned--center">
        <div class="header-background" data-headerImageUrl="/static/img/cases/noted/thumb.jpg"></div>
        <div class="row fill-parent is-aligned--middle is-unpadded">
            <div class="column">
                <h3 class="title" data-delay="0">- <%= model.get('type') %> -</h3>
                <h1 class="title" data-delay=".2" ><%= model.get('title') %></h1>
            </div>
        </div>
        <div class="scroll-indicator scroll-to" data-delay=".4">
            <span class="indicator"></span>
            <span class="indicator-text text-top">view</span>
            <span class="indicator-text text-bottom">project</span>
        </div>
    </div>

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
    <section class="section section-portfolio-items is-unpadded is-colored--dark">
        <div class="project-item-container double">
            <div class="project-item" data-slug="meteor-strike"  data-delay="0">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/meteor-strike/thumb-2.png');"></figure>           
                <h2 class="project-item-title"><i>previous</i></h2>
            </div>
            <div class="project-item" data-slug="travel-away" data-delay=".2">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/travel-away/thumb.jpg');"></figure>     
                <h2 class="project-item-title"><i>next</i></h2>
            </div>
        </div>
    </section>
    <?php echo view('layouts.footer');?>
    </script>
    <script type="template" id="travel-away">
    <div class="section section-header is-inverted is-aligned--center">
        <div class="header-background" data-headerImageUrl="/static/img/cases/travel-away/thumb.jpg"></div>
        <div class="row fill-parent is-aligned--middle is-unpadded">
            <div class="column">
                <h3 class="title" data-delay="0">- <%= model.get('type') %> -</h3>
                <h1 class="title" data-delay=".2" ><%= model.get('title') %></h1>
            </div>
        </div>
        <div class="scroll-indicator scroll-to" data-delay=".4">
            <span class="indicator"></span>
            <span class="indicator-text text-top">view</span>
            <span class="indicator-text text-bottom">project</span>
        </div>
    </div>

    <div class="section is-aligned--center is-unpadded--bottom">
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
        </div>
    </div>
    <div class="section is-unpadded--top">
        <div class="container">
            <img data-delay="0" src="/static/img/cases/travel-away/responsive.jpg" style="width:100%;" class="smart-object"/>
        </div>
    </div>
    <div class="section is-unpadded" style="line-height:0">
        <img data-delay="0" src="/static/img/cases/travel-away/showcase.jpg" style="width:100%" class="smart-object"/>
    </div>
    <section class="section section-portfolio-items is-unpadded is-colored--dark">
        <div class="project-item-container double">
            <div class="project-item" data-slug="noted"  data-delay="0">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/noted/thumb.jpg');"></figure>           
                <h2 class="project-item-title"><i>previous</i></h2>
            </div>
            <div class="project-item" data-slug="djos-ink" data-delay=".2">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/djos-ink/thumb.jpg');"></figure>     
                <h2 class="project-item-title"><i>next</i></h2>
            </div>
        </div>
    </section>
    <?php echo view('layouts.footer');?>
    </script>