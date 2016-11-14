define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    return Backbone.Model.extend({
        urlRoot : '/api/projects/',

        defaults : {
            'id'      : '10101',
            'type'    : 'default type',
            'slug'    : 'default-slug',
            'title'   : 'default Title',
            'preview' : 'image',
            'content' : []
        }

    });
});