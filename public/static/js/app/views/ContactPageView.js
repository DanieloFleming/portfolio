define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ScrollToModule'
], function(_, BaseView, FadeInComponent, ScrollToModule) {

    return  BaseView.extend({
        id : 'contactpage',

        templateName: '#contactpage',

        events : {
            //'click .section-header' : 'interact'
        },
        
        components : {
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