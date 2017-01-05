<script type="template" id="<?=$slug;?>">
    <?= view('layouts.project-item-header');?>
    <div class="section is-aligned--center is-unpadded--bottom">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"You white folks see UFOs in your dreams. You don't hear about Martians in Harlem"</h3>
                    <h4 data-delay=".2">- Paul Mooney -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/lucidicy/infoboard.png" />
                </div>
            </div>
        </div>
    </div>
    <?php echo view('layouts.project-footer');?>
</script>
