(function(){
    NS('game.library.CollisionDetect');
    var CollisionDetect = function() {};

    CollisionDetect.prototype.check = function(arr1, arr2, callback) {
        for(var i = 0; i < arr1.length; i++) {
            var a = arr1[i];

            for(var n = 0; n < arr2.length; n++) {
                var b = arr2[n];

                if(this.checkHit(a, b)) {
                    return (callback) ? callback(a, b) : true;
                }
            }
        }
    }

    CollisionDetect.prototype.checkHit = function(a, b) {
        if(a.isAlive === false || b.isAlive == false) return false;

        return a.x < b.x + b.width
            && a.x + a.width > b.x
            && a.y < b.y + b.height
            && a.y + a.height > b.y
    }

    game.library.CollisionDetect = new CollisionDetect();

})();