define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
], function(_, BaseView, FadeInComponent) {

    return  BaseView.extend({
        id : 'contactpage',

        templateName: '#contactpage',

        components : {
            fader : {
                module : FadeInComponent,
                el: 'this'
            }
        },

        intialized : function() {
            
        }
    });

});