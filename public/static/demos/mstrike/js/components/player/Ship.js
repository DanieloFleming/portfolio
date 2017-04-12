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

