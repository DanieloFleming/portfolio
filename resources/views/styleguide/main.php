<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title></title>
        <link rel="stylesheet" href="<?=url('static/css/styleguide.css');?>">
    </head>
    <body>
    <?php if(is_array($views)):?>
        <?php foreach($views as $view):?>
            <?= $view;?>
        <?php endforeach;?>
    <?php else:?>
        <?= $views;?>
    <?php endif;?>
    </body>
</html>
