var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix){
    mix.scripts([
        "../../../public/static/demos/mstrike/js/utils/NameSpace.js",
        "../../../public/static/demos/mstrike/js/utils/Helper.js",
        "../../../public/static/demos/mstrike/js/library/Class.js",
        "../../../public/static/demos/mstrike/js/library/AssetsLoader.js",
        "../../../public/static/demos/mstrike/js/library/SpriteManager.js",
        "../../../public/static/demos/mstrike/js/library/AudioManager.js",
        "../../../public/static/demos/mstrike/js/library/CanvasManager.js",
        "../../../public/static/demos/mstrike/js/library/SpriteAnimator.js",
        "../../../public/static/demos/mstrike/js/library/CollisionDetect.js",
        "../../../public/static/demos/mstrike/js/library/GameArray.js",
        "../../../public/static/demos/mstrike/js/assets/SpriteSheet.js",
        "../../../public/static/demos/mstrike/js/assets/AudioBook.js",
        "../../../public/static/demos/mstrike/js/screens/LoadScreen.js",
        "../../../public/static/demos/mstrike/js/screens/StartScreen.js",
        "../../../public/static/demos/mstrike/js/components/GameObject.js",
        "../../../public/static/demos/mstrike/js/components/explosion/Explosion.js",
        "../../../public/static/demos/mstrike/js/components/weapon/Bullet.js",
        "../../../public/static/demos/mstrike/js/components/player/Ship.js",
        "../../../public/static/demos/mstrike/js/components/meteor/Meteorite.js",
        "../../../public/static/demos/mstrike/js/components/meteor/Meteor.js",
        "../../../public/static/demos/mstrike/js/components/HUD.js",
        "../../../public/static/demos/mstrike/js/components/background/Background.js",
        "../../../public/static/demos/mstrike/js/components/level/Level1.js",
        "../../../public/static/demos/mstrike/js/main.js"
    ], 'public/static/demos/mstrike/js/game.js');
});
