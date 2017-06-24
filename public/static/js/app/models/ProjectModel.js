define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/ProjectCollection'
], function($, _, Backbone, ProjectCollection){

    return Backbone.Model.extend({
        urlRoot : '/api/projects/',

        get : function(attr) {

            switch(attr) {
                case 'prev':
                    this.getPreviousModel();
                    break;
                case 'next':
                    this.getNextModel();
                    break;
                default:
            }

            return Backbone.Model.prototype.get.call(this, attr);
        },

        getPreviousModel : function() {
            var currentIndex = this.collection.indexOf(this);
            var id = (currentIndex - 1 < 0) ? this.collection.length - 1 : currentIndex - 1;

            model =  this.collection.at(id);
            this.set({'prev' : model.toJSON()});
        },

        getNextModel : function() {
            var currentIndex = this.collection.indexOf(this);
            var id = (currentIndex + 1 > this.collection.length - 1) ? 0 : currentIndex + 1;

            model = this.collection.at(id);
            this.set({'next' : model.toJSON()});
        }
    });
});