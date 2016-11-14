(function(){
    NS('game.library.GameArray');
    var GameComponent = function(){};

    GameComponent.prototype = Array.prototype;

    GameComponent.prototype.add = GameComponent.prototype.push;

    GameComponent.prototype.addArray = function(arr) {
        var i = 0, l = arr.length;

        for (i; i < arr.length; i++) {
            this.add(arr[i]);
        }
    };

    GameComponent.prototype.remove = function(component) {
        this.splice(this.indexOf(component), 1);
    };

    game.library.GameArray = GameComponent;

})();