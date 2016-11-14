define([
    'jquery',
    'underscore',
    'backbone',
    'app/models/ProjectModel'
], function($, _, Backbone, ProjectModel){

    return Backbone.Collection.extend({
        url : '/api/projects',
        model : ProjectModel
    });
});