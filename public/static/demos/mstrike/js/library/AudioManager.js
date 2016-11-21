(function(){
    NS('game.library.AudioManager');

    var SOUND_ON = true;
    var SOUND_OFF = false;

    var AudioManager = {

        sound : SOUND_ON,

        data : function(audioData) {
            this.audioContainer = audioData;
        },

        playFX : function(audioName) {
            if(this.sound == SOUND_ON) {
                this.audioContainer[audioName].cloneNode(true).play();
            }
        },

        playMusic : function(audioName) {
            if(this.sound == SOUND_ON) {
                this.checkIfPlaying(audioName);
                this.currentBgm = audioName;
                this.audioContainer[audioName].volume = .5;
                this.audioContainer[audioName].play();
                this.audioContainer[audioName].addEventListener('ended', this.replay.bind(this));
            } else {
                this.currentBgm = audioName;
            }
        },

        play : function(audioName) {
            this.audioContainer[audioName].play();
        },

        stop : function(audioName) {
            this.audioContainer[audioName].pause();
            this.audioContainer[audioName].currentTime = 0;
        },

        checkIfPlaying : function(audioName) {
            if(!this.currentBgm) return;
            if(this.currentBmg !== audioName && this.audioContainer[this.currentBgm].pause) {
                this.stopMusic(this.currentBgm);
            }
        },

        stopMusic : function(audioName) {
            this.audioContainer[audioName].pause();
            this.audioContainer[audioName].currentTime = 0;
            this.audioContainer[audioName].removeEventListener('ended', this.replay.bind(this));
            this.currentBgm = false;
        },

        replay : function() {
            this.audioContainer[this.currentBgm].currentTime = 0;
            this.audioContainer[this.currentBgm].play();
        },

        enableSound : function() {
            this.sound = SOUND_ON;

            if(this.currentBgm) {
                this.playMusic(this.currentBgm);
            }
        },

        disableSound : function() {
            this.sound = SOUND_OFF;

            if(this.currentBgm) {
                var cache = this.currentBgm;
                this.stopMusic(this.currentBgm);
                this.currentBgm = cache;
            }
        },

        toggleSound : function() {
            if(this.sound == SOUND_ON) {
                this.disableSound();
            } else {
                this.enableSound();
            }
        }
    };

    game.library.AudioManager = AudioManager;
})();