define([
    'backbone',
    'underscore'
], function(Backbone, _){
    var BaseView = Backbone.View.extend({
    	close : function(){
    		if(this.onClose) this.onClose();
    	}
    });

    return BaseView;
});