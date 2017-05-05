(function() {
    game = window.game || {};


    var _namespaceMaker = function (namespace, fn) {

        var names = namespace.split('.'),
            base = game,
            maxIndex = names.length - 1, i = 0;

        if (names[0] == 'game') {
            names = names.slice(1);
        }


        for (i; i < maxIndex; i++) {
            if (typeof base[names[i]] == 'undefined') {
                base[names[i]] = {};
            }

            base = base[names[i]];
        }

    };

    NS = window.NS || _namespaceMaker;
})();
(function(){
    var _o = (function() {
        var _each = function (value, callback, scope) {

            if (_isArray(value)) {
                _eachArray(value, callback, scope);
            } else {
                _eachObject(value, callback, scope);
            }
        };

        var _eachArray = function (arr, callback, scope) {
            for (var i = 0; i < arr.length; i++) {
                _doCallBack(arr[i], i, callback, scope);
            }
        };

        var _eachObject = function (obj, callback, scope) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    _doCallBack(obj[key], key, callback, scope);
                }
            }
        };

        var _doCallBack = function (value, index, callback, scope) {
            if (typeof callback === 'function') {
                if (scope) callback.call(scope, value, index);
               else  callback(value, index);
            }
        };

        var _isArray = function(value) {
            return value instanceof Array || (value.length);
        };

        return {
            each : _each,
            isArray : _isArray
        }
    })();

    _ = window._ || _o;

})();
(function() {
    NS('game.library.Class');

    var Class = function () {};

    Class.extend = function extend (props) {
        var fn = props.constructor;

        if (typeof fn !== 'function') {
            throw new ClassConstructorException();
        }

        fn.prototype = this.prototype;
        fn.prototype = Object.create(this.prototype);
        fn.extend = extend;

        for (var key in props) {
            if (props.hasOwnProperty(key)) {
                fn.prototype[key] = props[key];
            }
        }

        return fn;
    };

    var ClassConstructorException = function() {
        this.message = 'Invalid constructor provided. Constructor must be of type "function"';
        this.name = 'ClassConstructorException';
    };

    game.library.Class = Class;
})();
(function() {
    NS('game.library.AssetsLoader');

    var AssetsLoader = (function(){
        var _assetsLoaded = 0;
        var _assetCount;
        var _onCompleted;
        var _spriteAssets;
        var _audioAssets;

        /**
         * Load Assets.
         *
         * @param spriteSheet
         * @param AudioBook
         * @param callback
         * @private
         */
        var _loadAssets = function (spriteSheet, AudioBook, callback) {
            _spriteAssets = spriteSheet;
            _audioAssets = AudioBook;

            _assetCount = Object.keys(_spriteAssets).length + Object.keys(_audioAssets).length;
            _onCompleted = callback;

            for (var key in _spriteAssets) {
                if (_spriteAssets.hasOwnProperty(key)) {
                    _loadAsset(_spriteAssets[key], key);
                }
            }

            for (var note in _audioAssets) {
                if (_audioAssets.hasOwnProperty(note)) {
                    _loadAudio(_audioAssets[note], note);
                }
            }
        }

        /**
         * Load sprites.
         *
         * @param value
         * @param key
         * @private
         */
        var _loadAsset = function (value, key) {
            var image = new Image();
                image.src = value.src;

            image.onload = function () {
                _saveAsset(key, image);
            }
        };

        /**
         * Load Audio.
         *
         * @param value
         * @param key
         * @private
         */
        var _loadAudio = function (value, key) {
            var audio = new Audio(value);
            
            audio.oncanplaythrough = function () {
                _audioAssets[key] = audio;
                _assetsLoaded++;

                audio.oncanplaythrough = null;
                _checkAssetsLoader();
            }
        }

        /**
         * Store imageData in SpiteAssetsArray.
         *
         * @param key
         * @param image
         * @private
         */
        var _saveAsset = function (key, image) {
            var asset = _spriteAssets[key];

            asset.image = image;
            asset.width = image.width / asset.frames;
            asset.height = image.height;

            _assetsLoaded++;

            _checkAssetsLoader();
        };

        /**
         * Check if all files are loaded
         *
         * @private
         */
        var _checkAssetsLoader = function () {
            if (_assetsLoaded == _assetCount) {
                _onCompleted(_spriteAssets);
            }
        }

        /**
         * Return all sprite assets.
         *
         * @returns {*}
         * @private
         */
        var _getAllSprites = function () {
            return _spriteAssets;
        }

        /**
         * Return all audio assets.
         *
         * @returns {*}
         * @private
         */
        var _getAllAudio = function () {
            return _audioAssets;
        }

        /**
         * publicly accessible methods.
         */
        return {
            load: _loadAssets,
            getSpriteData: _getAllSprites,
            getAudioData: _getAllAudio
        }
    })();

    game.library.AssetsLoader = AssetsLoader;

})();
(function(){
    NS('game.library.SpriteManager');

    var SpriteManager = {
        data : function(spriteData) {
            this.spriteContainer = spriteData;
        },

        get : function(spriteName) {
            return this.spriteContainer[spriteName];
        }
    };

    game.library.SpriteManager = SpriteManager;
})();
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
(function(){
    NS('game.library.CanvasManager');

    var CanvasManager = {

        element : [],

        context : [],

        setCanvas : function(canvasId) {
            this.element[canvasId] = document.getElementById(canvasId);
            this.context[canvasId] = this.element[canvasId].getContext('2d');
            //this.context[canvasId].globalCompositeOperation = 'destination-over';

            this.width = this.element[canvasId].width;
            this.height = this.element[canvasId].height;
        },

        getCanvas : function(canvasId) {
            return this.element[canvasId];
        },

        getContext : function(canvasId) {
            return this.context[canvasId];
        },

        clearContext : function(width, height) {
            for(var key in this.context) {
                if(this.context.hasOwnProperty(key)){
                    this.context[key].clearRect(0, 0, width, height);
                }
            }
        }
    };

    game.library.CanvasManager = CanvasManager;

})();
(function(){

    NS('game.library.SpriteAnimator');

    var SpriteAnimator = function(spriteData, ctx) {
        SpriteAnimator.prototype.ctx = ctx;
        this.sprite = spriteData;
        this.isAnimating = false;
    };

    SpriteAnimator.prototype.draw = function(x, y, frame) {
        this.currentFrame = frame || 0;
        this._draw(x, y);
    };

    SpriteAnimator.prototype.playOnce = function(sequenceName, x, y, callBack) {
        this._play(sequenceName, x, y, callBack || function(){});
    };

    SpriteAnimator.prototype.playLoop = function(sequenceName, x, y) {
        this._play(sequenceName, x, y, this._resetFrame.bind(this, sequenceName));
    };

    SpriteAnimator.prototype._play = function(sequenceName, x, y, callBack) {

        if(! this.currentFrame || this.currentSequence != sequenceName) {
            this.currentFrame = this.sprite.frameSet[sequenceName][0];
            this.endFrame = this.sprite.frameSet[sequenceName][1];
            this.currentSequence = sequenceName;
            this.isAnimating = true;
        }

        if(this.currentFrame < this.endFrame) {
            this._draw(x, y);
            this.currentFrame++;
        }

        if(this.currentFrame + 1 == this.endFrame) {
            this.isAnimating = false;
            callBack();
        }
    };

    SpriteAnimator.prototype._draw = function(x, y) {
        this.ctx.drawImage(
            this.sprite.image,
            this.currentFrame * this.sprite.width, 0,
            this.sprite.width, this.sprite.height,
            x, y,
            this.sprite.width, this.sprite.height
        );
    };

    SpriteAnimator.prototype._resetFrame = function(sequenceName) {
        this.currentFrame = this.sprite.frameSet[sequenceName][0];
        this.isAnimating = true;
    };

    SpriteAnimator.prototype.setSprite = function(newSpriteData) {
        this.sprite = newSpriteData;
    };

    game.library.SpriteAnimator = SpriteAnimator;

})();
(function(){
    NS('game.library.CollisionDetect');
    var CollisionDetect = function() {};

    CollisionDetect.prototype.check = function(arr1, arr2, callback) {
        for(var i = 0; i < arr1.length; i++) {
            var a = arr1[i];

            for(var n = 0; n < arr2.length; n++) {
                var b = arr2[n];

                if(this.checkHit(a, b)) {
                    return (callback) ? callback(a, b) : true;
                }
            }
        }
    }

    CollisionDetect.prototype.checkHit = function(a, b) {
        if(a.isAlive === false || b.isAlive == false) return false;

        return a.x < b.x + b.width
            && a.x + a.width > b.x
            && a.y < b.y + b.height
            && a.y + a.height > b.y
    }

    game.library.CollisionDetect = new CollisionDetect();

})();
(function(){
    NS('game.library.GameArray');
    var GameComponent = function(){};

    GameComponent.prototype = Array.prototype;

    GameComponent.prototype.add = GameComponent.prototype.push;

    GameComponent.prototype.addArray = function(arr) {
        var i = 0, l = arr.length;

        for (i; i < arr.length; i++) {
            this.add(arr[i]);
        }
    };

    GameComponent.prototype.remove = function(component) {
        this.splice(this.indexOf(component), 1);
    };

    game.library.GameArray = GameComponent;

})();
var SpriteSheet = {

    ship : {
        src :'img/ship5.png',
        frames : 4
    },

    bullet : {
        src : 'img/bullet.png',
        frames : 1
    },

    explosion_1 : {
        src : 'img/explosion/ex-1-a.png',
        frames : 40,
        frameSet : {
            explode : [0, 40]
        }
    },

    explosion_2 : {
        src : 'img/explosion/ex-2.png',
        frames : 48,
        frameSet : {
            explode : [0, 48]
        }
    },

    explosion_small_1 : {
        src : 'img/explosion/ex-small-1.png',
        frames : 40,
        frameSet : {
            explode : [0, 40]
        }
    },

    explosion_small_2 : {
        src : 'img/explosion/ex-small-2.png',
        frames : 64,
        frameSet : {
            explode : [0, 64]
        }
    },

    explosion_small_3 : {
        src : 'img/explosion/ex-small-3.png',
        frames : 8,
        frameSet : {
            explode : [0, 8]
        }
    },

    explosion_small_4 : {
        src : 'img/explosion/ex-small-4.png',
        frames : 10,
        frameSet : {
            explode : [0, 10]
        }
    },
    meteor_1 : {
        src : 'img/meteor/meteor_1.png',
        frames : 2
    },
    meteor_2 : {
        src : 'img/meteor/meteor_2.png',
        frames : 2
    },
    meteorite_1 : {
        src : 'img/meteor/s_1.png',
        frames : 1
    },
    meteorite_2 : {
        src : 'img/meteor/s_2.png',
        frames : 1
    },
    background : {
        src : 'img/dark-purple.png',
        frames : 1
    },
    live : {
        src : 'img/live.png',
        frames : 1
    }
};
var AudioBook = {
    explode : 'audio/explode.mp3',
    laser : 'audio/pewV2.mp3',
    //chopper : 'audio/chopper.mp3',
    level1 : 'audio/bg.mp3',
    pew : 'audio/pew.mp3',
    coin : 'audio/coin.mp3',
    bgmIntro : 'audio/main-theme.mp3'
};
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
    };

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
(function(Class, SpriteAnimator, SpriteManager){
    NS('game.component.GameObject');

    var GameObject = Class.extend({
        type : 'GameObject',

        constructor : function GameObject(spriteName) {
            this._spriteData = SpriteManager.get(spriteName);
            this._animator = new SpriteAnimator(this._spriteData, this.ctx);
            this.width = this._spriteData.width;
            this.height = this._spriteData.height;
            this.xCenter = this.width / 2;
            this.yCenter = this.height / 2;
            this.destroy = false;
            this.isActive = true;
        },

        draw : function() {
            //override this method
        },

        update : function(gameTime, timestamp) {
            //override this method
        },

        ticker : function(tickName, ms, fn) {
            var timeName = tickName + 'Stamp';
            var timestamp = performance.now();
            if(!this[timeName]) this[timeName] = timestamp;

            var progress = timestamp - this[timeName];

            if(progress > ms) {
                fn(timeName);
                this[timeName] = false;
            }
        }
    });

    GameObject.setContext = function(ctx) {
        this.prototype.ctx = ctx;
    };

    game.component.GameObject = GameObject;

})(game.library.Class, game.library.SpriteAnimator, game.library.SpriteManager);


(function(GameObject, AudioManager){

    NS('game.component.explosion.Explosion');

    var Explosion = GameObject.extend({

        constructor : function Explosion(x, y, type) {
            this.spriteName = (type) ? type : 'explosion_2';
            this.x = x;
            this.y = y;

            GameObject.call(this, this.spriteName);

            AudioManager.playFX('explode');
        },

        draw : function() {
            this._animator.playOnce(
                'explode',
                this.x - this.xCenter,
                this.y - this.yCenter,
                this.completed.bind(this)
            );
        },

        completed : function() {
            if(this.doOnCompleted) this.doOnCompleted(this);
            this.doOnCompleted = null;
            this.isActive = false;
        },

        onCompleted : function(callback) {
            this.doOnCompleted = callback;
        }
    });

    Explosion.type = {
        BIG_1 : 'explosion_1',
        BIG_2 : 'explosion_2',
        SMALL_1 : 'explosion_small_1'
    };

    game.component.explosion.Explosion = Explosion;

})(game.component.GameObject, game.library.AudioManager);
(function(GameObject, AudioManager){
    NS('game.component.weapon.Bullet');

    var Bullet = GameObject.extend({

        spriteName : 'bullet',

        type : 'bullet',

        power : 5,

        speed : 20,

        constructor : function Bullet(x, y) {
            this.x = x;
            this.y = y;

            AudioManager.playFX('laser');

            GameObject.call(this, this.spriteName);
        },

        draw : function() {
            this._animator.draw(this.x - this.xCenter, this.y);
        },

        update : function(gameTime, timestamp) {
            this.y -= this.speed;

            this.checkBound();
        },

        checkBound : function() {
            if(!this.isInactive) {
                if(this.y < -this.height) this.destroy = true;
            }
        },

        hit : function() {
            this.destroy = true;
        },

    });

    game.component.weapon.Bullet = Bullet;

})(game.component.GameObject, game.library.AudioManager);
(function(GameObject, Bullet, GameArray, Explosion){

    NS('game.component.player.Ship');

    var Ship = GameObject.extend({

        bullets : new GameArray(),

        constructor : function Ship(x, y) {
            this.spriteName = 'ship';
            this.type = 'player';
            this.x = x;
            this.y = y;
            this.reloadTime = 150;
            this.recoverTime = 1000;
            this.isHit = false;
            this.points = 1000;
            this.frame = 0;

            GameObject.call(this, this.spriteName);
        },

        draw : function(){
            this._animator.draw(this.x, this.y, this.frame);
        },

        update : function() {
            this.x += ((game.mouseX - this.xCenter) - this.x) / 20;
            this.y += ((game.mouseY - this.yCenter) - this.y) / 20;

            this.autoFire();
            if(this.isHit) {
                this.recover();
            }
        },

        hit : function() {
            this.isActive = false;

            if (this.frame > 2) {
                this.dead = true;
                this.explode();
            } else {
                this.isHit = true;
                this.frame++;
            }
        },

        recover : function() {
            this.ticker('recover', this.recoverTime, this.recovered.bind(this))
        },

        recovered : function() {
            this.isHit = false;
            if(this.dead === true) return;
            this.isActive = true;
        },

        autoFire : function() {
            if(this.dead || this.toDraw === false) return;
            this.ticker('fire', this.reloadTime, this.fire.bind(this));
        },


        fire : function() {
            var bullet = new Bullet(this.x + this.xCenter, this.y + this.yCenter);

            GameComponents.add(bullet);

            this.bullets.push(bullet);
        },

        explode : function() {
            this.toDraw = false;
            var ex = new Explosion(this.x + this.xCenter, this.y + this.yCenter, Explosion.type.BIG_2);

            ex.onCompleted(this.cleanUp.bind(this));

            GameComponents.add(ex);
        },

        cleanUp : function(ex) {
            GameComponents.remove(ex);

            this.isHit = false;
            this.dead = false;
            //this.toDraw = this.draw.bind(this);
            this.frame = 0;
            this.gameOver();
        }
    });

    game.component.player.Ship = Ship;

})(
    game.component.GameObject,
    game.component.weapon.Bullet,
    game.library.GameArray,
    game.component.explosion.Explosion);


(function(GameObject, Explosion){
    NS('game.component.meteor.Meteorite');

    var MODE_LEFT = 0;
    var MODE_RIGHT = 1;

    var sprites = ['meteorite_1', 'meteorite_2'];

    var EXPLOSION_TYPE = 0;

    var Meteorite = GameObject.extend({

        constructor : function Meteor(x, y, direction) {

            this.x = x;
            this.y = y;
            this.spriteName = sprites[Math.round(Math.random())];
            this.hp = 5;
            this.speed = 16;
            this.points = 100;

            GameObject.call(this, this.spriteName);

            this.setVelocities(direction)
        },

        setVelocities : function(mode) {
            var speed = (Math.random() * 3);

            if(mode === MODE_LEFT) {
                this.speedX = speed * -1;
                this.x += -10;
            } else {
                this.speedX = speed;
                this.x += 10;
            }

            this.speedY = (Math.random() * 4);
        },

        draw : function() {
            this._animator.draw(this.x, this.y);
        },

        update : function() {
            this.y += this.speedY;

            this.x += this.speedX;

            this.checkBound();
        },

        checkBound : function() {
            if(!this.isInactive) {
                if(this.y > CANVAS_HEIGHT || this.x < -this.width || this.x > CANVAS_WIDTH) {
                    this.destroy = true;
                }
            }
        },

        hit : function(damage) {

            this.hp -= damage;
            this.speed++;

            if(this.hp <= 0) {
                this.explode();
            }
        },

        explode : function() {
            this.killed = true;
            this.toDraw = false;
            this.isActive = false;

            var ex = new Explosion(this.x + this.xCenter, this.y + this.yCenter, Explosion.type.SMALL_1);
            ex.onCompleted(this.cleanUp.bind(this));

            GameComponents.add(ex);
        },

        cleanUp : function(ex) {
            GameComponents.remove(ex);
            this.destroy = true;
        }
    });

    game.component.meteor.Meteorite = Meteorite;

})(game.component.GameObject, game.component.explosion.Explosion);
(function(GameObject, Explosion, Meteorite){
    NS('game.component.meteor.Meteor');

    var sprites = ['meteor_1', 'meteor_2'];

    var Meteor = GameObject.extend({

        constructor : function Meteor(x, y) {

            this.x = x;
            this.y = y;
            this.spriteName = sprites[Math.round(Math.random())];
            this.hp = 10;
            this.frame = 0;
            this.speed = 2;
            this.points = 300;

            GameObject.call(this, this.spriteName);
        },

        draw : function() {
            this._animator.draw(this.x, this.y, this.frame);
        },

        update : function() {
            this.y += this.speed;

            this.checkBound();
        },

        checkBound : function() {
            if(!this.isInactive) {
                if(this.y > CANVAS_HEIGHT) {
                    this.destroy = true;
                }
            }
        },

        hit : function(damage) {

            this.hp -= damage;
            this.frame++;
            this.speed--;

            if(this.hp <= 0) {
                this.explode();
            }
        },

        explode : function(isDead) {
            this.killed = true;
            this.toDraw = false;
            this.isActive = false;

            var ex = new Explosion(this.x + this.xCenter, this.y + this.yCenter, Explosion.type.BIG_2);
                ex.onCompleted(this.cleanUp.bind(this));

            GameComponents.add(ex);

            if(isDead) return;
            this.createMeteorite();
        },

        createMeteorite : function() {
            var m1 = new Meteorite(this.x, this.y + this.yCenter, 0);
            var m2 = new Meteorite(this.x + this.width, this.y + this.yCenter, 1);

            GameComponents.addArray([m1, m2]);

            LevelContent.enemies.addArray([m1, m2])
        },

        cleanUp : function(ex) {
            GameComponents.remove(ex);

            this.destroy = true;
        }
    });

    game.component.meteor.Meteor = Meteor;

})(game.component.GameObject, game.component.explosion.Explosion, game.component.meteor.Meteorite);
(function(GameObject, SpriteManager){
    NS('game.component.HUD');

    var HUD = GameObject.extend({
        score : 0,
        textScore : 0,
        lives :3,
        shakeTime : 60,
        zeros : '000000',

        settings : {
            font : "24pt 'Kenvector Future'",
            shadowBlur : 4,
            shadowColor : 'grey',
            textAlign : 'end',
            textBaseline : 'buttom',
            fillStyle : '#fff'
        },

        constructor : function HUD(element) {
            this.element = element;
            this.imageData = SpriteManager.get('live');
            this.ctx.translate(0.5, 0.5);
            this.setupContext();
            this.addScore(0);
        },

        restart : function() {
            this.score = 0;
            this.textScore = 0;
            this.lives = 3;
            this.addScore(0);
        },

        setupContext : function() {
            _.each(this.settings, this.applyContextSettings, this);
        },

        applyContextSettings : function(value, settingName) {
            this.ctx[settingName] = value;
        },

        draw : function() {
            this.setupContext();
            this.ctx.fillText(this.textScore, CANVAS_WIDTH - 10,  CANVAS_HEIGHT - 10);
            this.showLives();
        },

        showLives : function() {
            for(var i = 0; i < this.lives; i++) {
                this.ctx.drawImage(this.imageData.image, this.imageData.width * i + 20, CANVAS_HEIGHT - 40);
            }
        },

        update : function() {
            if(this.isHit) {
                this.shakeScreen();
            }
        },

        addScore : function(points) {
            this.score += points;
            var s = this.zeros + this.score;
            this.textScore = s.substr(s.length - this.zeros.length);
        },

        hit : function() {
            this.lives--;
            this.isHit = true;
        },

        shakeScreen : function() {
            var val = - this.shakeTime + Math.round(Math.random() * this.shakeTime);

            if(this.shakeTime > 0) {
                this.shakeTime -= 1.4;
                this.element.style.transform = 'translate(' + val +'px, ' + val + 'px)';
            } else {
                this.isHit = false;
                this.shakeTime = 60;
                this.element.style.transform = 'translate(0, 0)';
            }
        },

        reset : function() {
            this.score = 0;
            this.textScore = 0;
            this.lives =3;
            this.shakeTime = 60;
            this.zeros = '000000';
        }

    });

    HUD.setContext = function(ctx) {
        this.prototype.ctx = ctx;
    };

    game.component.HUD = HUD;
})(game.component.GameObject, game.library.SpriteManager);
(function(Class, SpriteManager){
    NS('game.component.background.Background');

    var Background = Class.extend({

        constructor : function Background() {
            this._spriteData = SpriteManager.get('background');
            this.width = this._spriteData.width;
            this.height = this._spriteData.height;
            this.x  = 0;
            this.y = 0;
            this.speed = 3;
            this.createBackground();
        },

        createBackground : function() {

            var repeat = {
                x : Math.ceil(CANVAS_WIDTH / this.width) + 1,
                y : Math.ceil(CANVAS_HEIGHT / this.height) + 1
            };


            this.pattern = [];

            this.startPos = CANVAS_HEIGHT - (repeat.y * this.height);

            for(var i = 0; i < repeat.x; i++) {

                for(var n = 0; n < repeat.y; n++) {
                    this.pattern.push([-this.width + (i * this.width), -this.height + (n * this.height)]);
                }
            }

            this.repeat = repeat
        },

        draw : function() {

            for(var i = 0; i < this.pattern.length; i++) {
                if(this.pattern[i][1] > CANVAS_HEIGHT) {
                    this.pattern[i][1] = this.startPos;
                }

                this.ctx.drawImage(this._spriteData.image, 0, 0,
                    this.width, this.height,
                    this.pattern[i][0] + this.x, this.pattern[i][1]+= this.speed,
                    this.width, this.height
                )
            }
        },

        update : function() {
            this.speed = 3 + (.005 * game.mouseY);
        }

    });

    Background.setContext = function(ctx) {
        this.prototype.ctx = ctx;
    };

    game.component.background.Background = Background;

})(game.library.Class, game.library.SpriteManager);
(function(AudioManager, GameArray, Meteor, CollisionDetect){
    NS('game.component.level.Level1');

    var TYPE_ENEMY = 'enemy';
    var TYPE_WEAPON = 'weapon';

    var Level1 = game.component.GameObject.extend({

        constructor : function Level1(player, hud) {
            this.makeTime = 1000;
            this.container = new GameArray();
            this.player = player;
            this.hud = hud;

            AudioManager.playMusic('level1');

            this.setup();
        },

        setup : function() {
            this.player.gameOver = this.gameOver.bind(this);
        },

        restart : function() {
            this.player.toDraw = true;
            this.player.isActive = true;
            this.gameEnded = false;
            this.hud.restart();
        },

        update : function() {
            this.checkIfInactive();
            this.createLevel();
            this.checkCollisions();
        },

        checkCollisions : function() {
            for(var i = 0; i < LevelContent.enemies.length; i++) {

                var enemy = LevelContent.enemies[i];

                if(!enemy.isActive) continue;

                if (this.player.isActive && CollisionDetect.checkHit(enemy, this.player)) {
                    enemy.hit(this.player.points);
                    this.player.hit();
                    this.hud.hit();
                }

                for(var n =0; n < this.player.bullets.length; n++) {

                    var bullet = this.player.bullets[n];

                    if(! bullet.isActive) continue;

                    if(CollisionDetect.checkHit(enemy, bullet)) {
                        enemy.hit(bullet.power);
                        bullet.hit();
                    }
                }
            }
        },


        checkIfInactive : function() {

            _.each(LevelContent.enemies, function(enemy){
                if(enemy.killed) {
                    this.hud.addScore(enemy.points);
                    enemy.killed = null;
                }

                if(enemy.destroy) {
                    this.removeComponent(enemy, TYPE_ENEMY);
                }
            }, this);

            _.each(this.player.bullets, function(bullet) {
                if(bullet.destroy) {
                    this.removeComponent(bullet, TYPE_WEAPON);
                }
            }, this);
        },

        removeComponent : function(component, type) {
            if(type === TYPE_ENEMY) {
                LevelContent.enemies.remove(component);

            } else if(type === TYPE_WEAPON) {
                this.player.bullets.remove(component);

            }

            GameComponents.remove(component);

            if(this.gameEnded && LevelContent.enemies.length == 0) {
                this.showStartScreen();
            }
        },

        createLevel : function() {
            if(!this.gameEnded) {
                this.ticker('meteor', this.makeTime, this.addMeteor.bind(this));
            }
        },

        addMeteor : function() {
            var meteor = new Meteor(100 + (Math.ceil(Math.random() * CANVAS_WIDTH - 200)), -80);

            GameComponents.add(meteor);

            LevelContent.enemies.add(meteor);

            this.makeTime = (this.makeTime >  500) ? this.makeTime - 100 : 500;
        },

        gameOver : function() {
            this.gameEnded = true;
            _.each(LevelContent.enemies, this.explode, this);
        },

        explode : function(enemy) {
            enemy.explode();
        }

    });

    game.component.level.Level1 = Level1;

})(
    game.library.AudioManager,
    game.library.GameArray,
    game.component.meteor.Meteor,
    game.library.CollisionDetect
);
;(function(CanvasManager, SpriteManager, AudioManager, GameArray) {

    window.CANVAS_WIDTH = MAX_WIDTH = 1200;
    window.CANVAS_HEIGHT = MAX_HEIGHT =  800;

    window.GameComponents = null;
    window.LevelContent = null;

    TYPE_MOUSEDOWN = 'mousedown';
    TYPE_MOUSEUP = 'mouseup';

    CANVAS_PLAY = 'playfield';
    CANVAS_BG = 'background';
    CANVAS_HUD = 'hud';

    /**
     * imports
     */
    var component = game.component;
    var canvasIds = [CANVAS_PLAY, CANVAS_BG, CANVAS_HUD];
    var startScreen;
    var container;
    var lastTime;
    var background;
    var player = null;
    var level = null;
    var hud = null;

    function initialize() {
        AudioManager.disableSound();

        GameComponents = new GameArray();

        LevelContent = {
            enemies : new GameArray(),
            bullets : new GameArray()
        };
        
        container = document.querySelector('#container');

        var loadScreen = new game.screen.LoadScreen(SpriteSheet, AudioBook);
            loadScreen.onCompleted(assetsLoaded);

        setGameWidth(window.innerWidth, window.innerHeight);

        setupCanvas();
    }

    function setGameWidth(width, height) {
        if(!canvasses) {
            var canvasses = document.querySelectorAll('.canvas');
        }

        var sw = (width > MAX_WIDTH) ? MAX_WIDTH : width;
        var sh = (height > MAX_HEIGHT) ? MAX_HEIGHT : height;

        var w = CANVAS_WIDTH = (sw) ? sw : CANVAS_WIDTH;
        var h = CANVAS_HEIGHT = (sh) ? sh: CANVAS_HEIGHT;


        _.each(canvasses, function(element){
            if(element.nodeName === 'CANVAS') {
                element.width = w;
                element.height = h;
            } else {
                element.style.width = w + 'px';
                element.style.height = h+ 'px';
            }
        });

        if(background) {
            background.createBackground();
        }
    }

    function setupCanvas() {
        _.each(canvasIds, function(id){
            CanvasManager.setCanvas(id);
        });

        component.GameObject.setContext(CanvasManager.getContext(CANVAS_PLAY));
        component.background.Background.setContext((CanvasManager.getContext(CANVAS_BG)));
        component.HUD.setContext(CanvasManager.getContext(CANVAS_HUD));

        gameLoop(new Date());
    }

    function assetsLoaded(spriteData, audioData) {
        SpriteManager.data(spriteData);
        AudioManager.data(audioData);


        addEvents();
        showStart();
    }
    function addEvents() {
        game.mouseX = 100;
        game.mouseY = 100;

        //container.addEventListener('mousedown', handleMouseClick);
        //container.addEventListener('mouseup', handleMouseClick);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('touchstart', handleTouch);
         container.addEventListener('touchmove', handleTouch);
        window.addEventListener('resize', handleResize);
    }

    function handleMouseClick(e) {
        var eventType = e.type;

        switch(eventType) {
            case TYPE_MOUSEUP:
                break;
            case TYPE_MOUSEDOWN:
                break
        }
    }

    function handleMouseMove(e) {
        game.mouseX = e.pageX - container.offsetLeft;
        game.mouseY = e.pageY - container.offsetTop;
    }

    function handleTouch(e) {
        e.preventDefault();
        var touch = e.changedTouches[0];
        
        game.mouseX = (touch.pageX - container.offsetLeft);
        game.mouseY = (touch.pageY - container.offsetTop);
    }

    function handleResize(e) {
        setGameWidth(window.innerWidth, window.innerHeight);
    }

    function showStart() {
        startScreen = new game.screen.StartScreen();
        startScreen.onStart(startGame);

        background = new component.background.Background();
        GameComponents.add(background);
    }

    function startGame() {
        if(player === null) loadComponents();
        level.restart();

        GameComponents.addArray([player, level, hud]);
    }

    function loadComponents() {
        player = new component.player.Ship(100, 100);
        hud = new component.HUD(container);
        level = new component.level.Level1(player, hud);
        
        level.showStartScreen = gameOver;
    }

    function gameOver() {
        GameComponents.remove(player);
        GameComponents.remove(hud);
        GameComponents.remove(level);
        startScreen.show();
    }

    function gameLoop(timestamp) {
        var now = Date.now();
        var gameTime = (now - lastTime) / 1000;

        update(gameTime, timestamp);
        lastTime = now;

        requestAnimationFrame(gameLoop);
    }

    function update(gameTime, timestamp) {
        CanvasManager.clearContext(CANVAS_WIDTH, CANVAS_HEIGHT);

        _.each(GameComponents, function(component) {
            if(component.toDraw !== false) component.draw(gameTime, timestamp);
            if(component.update !== false) component.update();
        });
    }

    initialize();

})(game.library.CanvasManager, game.library.SpriteManager, game.library.AudioManager, game.library.GameArray);
//# sourceMappingURL=game.js.map
