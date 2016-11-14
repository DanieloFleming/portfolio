(function(){
    NS('game.library.SpriteManager');

    var SpriteManager = {
        data : function(spriteData) {
            this.spriteContainer = spriteData;
        },

        get : function(spriteName) {
            return this.spriteContainer[spriteName];
        }
    };

    game.library.SpriteManager = SpriteManager;
})();