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