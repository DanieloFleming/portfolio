define([
    'jquery',
    'underscore',
    'backbone',

    'app/views/BaseView',
    'app/components/FadeInComponent'
], function($, _, Backbone, BaseView, FadeInComponent) {

    return  BaseView.extend({
        className : 'page 404',

        templateName : '#404',

        components: {
            fader : {
                module : FadeInComponent,
                el: 'this'
            }
        }
    });
});