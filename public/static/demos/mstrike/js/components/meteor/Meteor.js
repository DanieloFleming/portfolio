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