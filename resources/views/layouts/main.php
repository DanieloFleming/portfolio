<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta charset="utf-8">

        <title>

        </title>
        <link rel="stylesheet" href="<?=$paths['css'];?>/main.css">
    </head>
    <body>

        <div id="application">

        </div>

        <?= View::make('layouts.header');?>
        
        <script data-main="<?=$paths['js'];?>/main.js" src="<?=$paths['js'];?>/vendor/require-2.1.17.js"></script>
        
        <?php if(isset($templates) && is_array($templates)):?>
            <?php foreach($templates as $template):?>
                <?= $template;?>
            <?php endforeach;?>
        <?php endif;?>
    </body>
</html>
