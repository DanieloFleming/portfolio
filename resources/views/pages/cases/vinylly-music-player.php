<script type="template" id="<?=$slug;?>">

    <?= view('layouts.project-item-header');?>

    <div class="section is-aligned--center">
        <div class="container">
            <div class="row">
                <div class="column span-8-10 space-l-1-10">
                    <h3 data-delay="0" class="title">"Record collecting is an infinite journey backwards"</h3>
                    <h4 data-delay=".2">- Zach Cowie -</h4>
                </div>
            </div>
            <div class="row">
                <div class="column span-10-10">
                    <img data-delay=".4" src="/static/img/cases/vinylly-music-player/vinyl.png" />
                </div>
            </div>
            <img data-delay=".6" src="/static/img/cases/vinylly-music-player/views.png" style="width:100%;" class="smart-object"/>     
        </div>
    </div>

    <section class="section" style="background:#e6e6e6;">
        <div class="container is-centered">
            <object data-delay="0"
                    data="/static/demos/vinylly/index.html"
                    style="width:260px; height:100%; position:absolute; top:0; left:50%; margin-left:-130px;">
            </object>
            <canvas width="260" height="460" style="visibility: hidden"></canvas>
        </div>
    </section>
    <?php echo view('layouts.project-footer')->with('data', $data);?>
</script>