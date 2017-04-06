define([
    'jquery',
    'underscore',
    'backbone',

    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ScrollToModule',
    'app/modules/HeaderResizeModule'
], function($, _, Backbone, BaseView, FadeInComponent, ScrollToModule, HeaderResizeModule) {

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
            },
            headerResize: {
                module : HeaderResizeModule,
                el : '.section-header'
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