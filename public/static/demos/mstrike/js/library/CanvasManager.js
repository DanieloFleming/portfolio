(function(){
    NS('game.library.CanvasManager');

    var CanvasManager = {

        element : [],

        context : [],

        setCanvas : function(canvasId) {
            this.element[canvasId] = document.getElementById(canvasId);
            this.context[canvasId] = this.element[canvasId].getContext('2d');
            //this.context[canvasId].globalCompositeOperation = 'destination-over';

            this.width = this.element[canvasId].width;
            this.height = this.element[canvasId].height;
        },

        getCanvas : function(canvasId) {
            return this.element[canvasId];
        },

        getContext : function(canvasId) {
            return this.context[canvasId];
        },

        clearContext : function(width, height) {
            for(var key in this.context) {
                if(this.context.hasOwnProperty(key)){
                    this.context[key].clearRect(0, 0, width, height);
                }
            }
        }
    };

    game.library.CanvasManager = CanvasManager;

})();