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