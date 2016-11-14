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