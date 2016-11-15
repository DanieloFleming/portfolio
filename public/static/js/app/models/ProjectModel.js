define([
    'jquery',
    'underscore',
    'backbone',
    'app/collections/ProjectCollection'
], function($, _, Backbone, ProjectCollection){

    return Backbone.Model.extend({
        urlRoot : '/api/projects/',

        setPrev : function(model) {
            this.set({'prev' : model.toJSON()});
        },

        setNext : function(model) {
            this.set({'next' : model.toJSON()});
        }
       /* defaults : {
            'id'        : '10101',
            'order'     : '0',
            'type'      : 'default type',
            'title'     : 'default Title',
            'sub-title' : 'default subtitle',
            'slug'      : 'default-slug',
            'header'    : 'image'
        },
        index : function(){
            return this.collection.indexOf(this);
        },
        prev : function() {
            var id = (this.index() - 1 < 0) ? this.collection.length - 1 : this.index() -1;
            return this.collection.at(id)
        },
        next: function() {
            var id = (this.index() + 1 > this.collection.length - 1) ? 0 : this.index() +1;
            return this.collection.at(id)
        }*/
    });
});