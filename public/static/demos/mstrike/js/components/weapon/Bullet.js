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