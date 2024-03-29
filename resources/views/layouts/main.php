<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, user-scalable=no">
        <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta charset="utf-8">

        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="pragma" content="no-cache">

        <link rel="shortcut icon" href="/static/img/favicon.ico" type="image/x-icon">
        <link rel="icon" href="/static/img/favicon.ico" type="image/x-icon">
        <title>welcome @ danielo.nl</title>
        <link rel="stylesheet" href="<?=$paths['css'];?>/main.css?v3">
    </head>
    <body data-os="<?php if(isset($dataOS)) echo $dataOS;?>" data-browser="<?php if(isset($dataBrowser)) echo $dataBrowser;?>">

        <div id="application">

        </div>

        <?= View::make('layouts.header');?>

        <?php if (App::environment('local')):?>
            <script data-main="<?=$paths['js'];?>/main.js" src="<?=$paths['js'];?>/vendor/require-2.1.17.js"></script>
        <?php else:?>
            <script data-main="<?=$paths['js'];?>/main-built.js" src="<?=$paths['js'];?>/vendor/require-2.1.17.js"></script>
        <?php endif;?>

        <?php if(isset($templates) && is_array($templates)):?>
            <?php foreach($templates as $template):?>
                <?= $template;?>
            <?php endforeach;?>
        <?php endif;?>
    </body>
</html>
