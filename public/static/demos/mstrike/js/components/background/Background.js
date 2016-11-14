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