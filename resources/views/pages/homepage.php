<script type="template" class="page" id="homepage">
    <section class="section section-header is-unpadded is-mobile">
            <div class="accordeon-overlay" data-delay=".0" data-transition-type="zoomOut"
            style="background-image:url('/static/img/backgrounds/destruction.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;">
                <div class="accordeon-content">
                    <h1 class="accordeon-overlay-title">
                        To destroy is always the first step in any creation.

                        <span> - <i>Pablo</i>Picasso - </span>
                    </h1>
                </div>
            </div>

            <div class="scroll-indicator scroll-to light" data-delay=".4">
                <span class="indicator"></span>
                <span class="indicator-text text-top">latest</span>
                <span class="indicator-text text-bottom">cases</span>
            </div>
    </section>

    <section class="section section-portfolio-items is-unpadded is-colored--dark is-mobile">
        <?php if(!empty($collection)) :?>

            <?php for($i = 0; $i <= count($collection); $i++): ?>
                <?php $project = (isset($collection[$i])) ? (object) $collection[$i] : $placeholder;?>

                <?php $isDouble = (count($collection) - $i > 1) ? "double" : "single";?>
                <?php $delay = 0.2 * $i + .3;?>

                <?php if($i % 2 == 0) echo '<div class="project-item-container ' . $isDouble. '" data-lala="'. $i .'">';?>

                <?php if ($i - count($collection) == 0):?>
                    <div class="project-item-placeholder all-cases" data-delay=".2" data-transition-type="slideUp">
                        <h2 class="project-item-title"><?=$placeholder->sub_title;?></h2>
                    </div>
                <?php else:?>
                    <div class="project-item <?php echo $project->slug;?>" data-slug="<?php echo $project->slug;?>" data-delay="<?= $delay?>">
                        <figure class="project-item-thumb smart-object" style="background-image:url('<?php echo $project->header;?>');"></figure>
                        <h2 class="project-item-title" data-transition-type="slideLeft" data-delay="<?= $delay + .2?>"> <?php echo $project->sub_title?> </h2>
                    </div>
                <?php endif;?>
                <?php if($i % 2 == 1) echo '</div>';?>
            <?php endfor;?>

            <?php if(count($collection) % 2 == 1 ) echo '</div>';?>
        <?php endif;?>
        <!--
        <div class="project-item-container double">
            <div class="project-item" data-slug="djos-ink" data-delay="0">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/djos-ink/thumb.jpg');"></figure>
                <h2 class="project-item-title"><i>Djos</i>Ink</h2>
            </div>
            <div class="project-item" data-slug="cafe-de-kroeg" data-delay=".1" data-transition-type="slideRight">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/cafe-de-kroeg/thumb.jpg');"></figure>     
                <h2 class="project-item-title"><i>De</i>Kroeg</h2>
            </div>
        </div>
        <div class="project-item-container double">
            <div class="project-item" data-slug="meteor-strike"  data-delay=".2" data-transition-type="slideUp">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/meteor-strike/thumb-2.png');"></figure>           
                <h2 class="project-item-title"><i>M</i>Strike</h2>
            </div>
            <div class="project-item" data-slug="noted"  data-delay=".3" data-transition-type="slideLeft">
                <figure class="project-item-thumb smart-object" style="background-image:url('/static/img/cases/noted/thumb.jpg');"></figure>           
            <h2 class="project-item-title"><i>N</i>oted</h2>
            </div>
        </div>
        <div class="project-item-container single">
            <div class="project-item-placeholder all-cases" data-delay=".2" data-transition-type="slideUp">         
                <h2 class="project-item-title"><i>All</i>Cases</h2>
            </div>
        </div>-->
    </section>

    <section class="section section-accordeon is-unpadded section-header">
        <div class="accordeon stroke-1" data-slug="djos-ink">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".0" style="background-image:url('/static/img/cases/djos-ink/thumb.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>

            <h2 class="accordeon-title"><i>Djos</i>Ink</h2>
        </div>
        <div class="accordeon" data-slug="cafe-de-kroeg">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".1" style="background-image:url('/static/img/cases/cafe-de-kroeg/thumb.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>
            <h2 class="accordeon-title"><i>De</i>Kroeg</h2>
        </div>
        <div class="accordeon" data-slug="meteor-strike">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".2" style="background-image:url('/static/img/cases/meteor-strike/thumb-2.png'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>
            <h2 class="accordeon-title"><i>M</i>Strike</h2>
        </div>
        <div class="accordeon" data-slug="noted">
            <div class="accordeon-image-item smart-object" data-transition-type="fadeIn" data-delay=".3" style="background-image:url('/static/img/cases/noted/thumb.jpg'); background-size:cover;background-repeat:no-repeat; background-position:center center;"></div>
            <h2 class="accordeon-title"><i>N</i>oted</h2>
        </div>
        <div class="accordeon accordeon-placeholder" data-slug="" data-transition-type="fadeIn" data-delay=".4">
            <div class="accordeon-image-item smart-object" style="background:white"></div>
            <h2 class="accordeon-title"><i>all</i>cases</h2>
        </div>
        <div class="accordeon-overlay overlay-desktop" data-delay=".2" data-transition-type="zoomOut" >
            <div class="accordeon-content">
                <h1 class="accordeon-overlay-title">
                    To destroy is always the first step in any creation.

                    <span> - <i>Pablo</i>Picasso - </span>
                </h1>

            </div>
            <div class="scroll-indicator scroll-hide light" data-delay=".4">
                <span class="indicator"></span>
                <span class="indicator-text text-top">latest</span>
                <span class="indicator-text text-bottom">cases</span>
            </div>
        </div>

    </section>
</script>