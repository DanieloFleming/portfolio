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