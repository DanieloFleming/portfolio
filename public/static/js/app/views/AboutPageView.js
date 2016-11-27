define([
    'jquery',
    'underscore',
    'backbone',

    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ScrollToModule',
], function($, _, Backbone, BaseView, FadeInComponent, ScrollToModule) {

    return  BaseView.extend({
        className : 'page aboutpage',

        templateName : '#aboutpage',

        events : {
            'click .section-header' : 'interact'
        },

        components: {
            scrollTo : {
                module : ScrollToModule,
                el : '.scroll-to'
            },
            fader : {
                module : FadeInComponent,
                el: 'this'
            }
        },

        interact : function(){
            if(this.isInteracting) return;

            this.isInteracting = true;

            this.components.scrollTo.interact(function(){
                this.isInteracting = false;
            }.bind(this));
        }
    });
});