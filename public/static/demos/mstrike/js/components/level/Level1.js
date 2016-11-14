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