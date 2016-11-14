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

