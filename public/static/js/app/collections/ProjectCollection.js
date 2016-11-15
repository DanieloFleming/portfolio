define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/ProjectModel'
], function($, _, Backbone, ProjectModel){

    return Backbone.Collection.extend({
        url : '/api/projects',
        model : ProjectModel,

        prev : function(model) {
            var currentIndex = this.indexOf(model);
            var id = (currentIndex - 1 < 0) ? this.length - 1 : currentIndex - 1;

            return this.at(id);
        },
        next : function(model) {
            var currentIndex = this.indexOf(model);
            var id = (currentIndex + 1 > this.length - 1) ? 0 : currentIndex + 1;

            return this.at(id);
        }

    });
});