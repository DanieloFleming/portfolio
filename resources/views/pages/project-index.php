<script type="template" id="project-index">
    <section class="section section-portfolio-items is-unpadded is-colored--dark">

        <?php if(!empty($collection)) :?>

            <?php for($i = 0; $i <= count($collection); $i++): ?>
                <?php $project = (isset($collection[$i])) ? (object) $collection[$i] : $placeholder;?>
                <?php $isDouble = (count($collection) - $i > 1) ? "double" : "single";?>
                <?php $delay = 0.2 * $i + .3;?>
                <?php if($i % 2 == 0) echo '<div class="project-item-container ' . $isDouble. '">';?>

                <?php if ($i == count($collection)):?>
                    <?php $side = ($i % 2 == 0) ? 'left' : 'right';?>
                    <div class="empty-project-item <?= $side;?>" data-delay="<?= $delay?>">
                        <?= $placeholder->content;?>
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
    </section>
</script>