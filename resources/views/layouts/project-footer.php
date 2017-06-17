<section class="section is-inverted case-info">
    <div class="container">
        <div class="row is-aligned--left">

            <?php $i = 0; foreach($data as $key => $value):?>
                <?php $space = $i % 2 == 0 ? 'space-l-1-10' : 'space-r-1-10';?>
                <div class="column span-4-10 <?=$space;?> span-md-5-10 space-md-none">
                    <h3 data-transition-type="slideLeft" data-delay="<?= .2 * $i + .0;?>"><?=$key;?></h3>
                    <?php if(is_array($value)):?>
                        <ul data-delay="<?= .3 * $i + .0; ?>" data-transition-type="slideLeft">
                            <?php foreach($value as $item):?>
                                <li><?= $item;?></li>
                            <?php endforeach;?>
                        </ul>
                    <?php else:?>
                        <p data-delay="<?= .3 * $i + .0; ?>" data-transition-type="slideLeft"> <?= $value;?></p>
                    <?php endif; $i++?>
                </div>
            <?php endforeach;?>
        </div>
    </div>
</section>

<section class="section section-portfolio-items is-unpadded is-colored--dark">

        <div class="project-item-container double">
                <div class="project-item" data-slug="<%= model.get('prev').slug %>">
                        <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.get('prev').image.src %>');"></figure>
                        <h2 class="project-item-title"><i>previous</i></h2>
                </div>
                <div class="project-item" data-slug="<%= model.get('next').slug %>">
                        <figure class="project-item-thumb smart-object" style="background-image:url('<%= model.get('next').image.src %>');"></figure>
                        <h2 class="project-item-title"><i>next</i></h2>
                </div>
        </div>
</section>

<section class="section is-unpadded footer-cases">
        <p class="footer-cases-text">MORE<i>CASES</i></p>
</section>
<?= view('layouts.footer');?>