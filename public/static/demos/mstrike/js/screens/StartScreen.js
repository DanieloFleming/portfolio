(function(){

    NS('game.screen.StartScreen');

    var BTN_START = 'btn-play';
    var BTN_SOUND = 'btn-sound';
    var CLASS_NAME = '.start-screen';
    var BG_MUSIC = 'bgmIntro';

    var StartScreen = function() {
        game.library.AudioManager.playMusic(BG_MUSIC);
        this.startScreen = document.querySelector(CLASS_NAME);
        this.initialize();
    };

    StartScreen.prototype.initialize = function() {
        this.startBtn = this.startScreen.querySelector('.' + BTN_START);
        this.soundBtn = this.startScreen.querySelector('.' + BTN_SOUND);

        this.addEvents();
    };

    StartScreen.prototype.addEvents = function() {
        this.soundBtn.addEventListener('click', this.handleClick.bind(this));
        this.startBtn.addEventListener('click', this.handleClick.bind(this));

        this.soundBtn.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        this.startBtn.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    };

    StartScreen.prototype.handleClick = function(e) {
        var button = e.currentTarget.getAttribute('data-btn');

        switch(button) {
            case BTN_START:
                this.startGame();
                break;
            case BTN_SOUND:
                this.toggleSound();
                break;
        }
    };

    StartScreen.prototype.handleMouseEnter = function(e) {
        game.library.AudioManager.playFX('pew');
    }

    StartScreen.prototype.startGame = function() {
        game.library.AudioManager.stopMusic(BG_MUSIC);
        game.library.AudioManager.playFX('coin');

        this.startScreen.classList.add('hide');
        this.onStartCallback();
    };

    StartScreen.prototype.toggleSound = function() {
        game.library.AudioManager.toggleSound();
    };

    StartScreen.prototype.onStart = function(callback) {
        this.onStartCallback = callback;
    };

    StartScreen.prototype.show = function() {
        game.library.AudioManager.playMusic(BG_MUSIC);

        this.startScreen.classList.remove('hide');
    };

    game.screen.StartScreen = StartScreen;

})();