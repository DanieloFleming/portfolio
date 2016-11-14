(function(AssetsLoader){
    NS('game.screen.LoadScreen');

    var CLASS_NAME = '.load-screen';

    var LoadScreen = function (sprites, audio) {
        this.loadScreen = document.querySelector(CLASS_NAME);

        AssetsLoader.load(sprites, audio, this.loadCompleted.bind(this));
    };

    LoadScreen.prototype.loadCompleted = function() {

        this.loadScreen.classList.add('hide');

        this.callback(
            game.library.AssetsLoader.getSpriteData(),
            game.library.AssetsLoader.getAudioData()
        );
    };

    LoadScreen.prototype.onCompleted = function(callback) {
        this.callback = callback;
    };

    game.screen.LoadScreen = LoadScreen;

})(game.library.AssetsLoader);