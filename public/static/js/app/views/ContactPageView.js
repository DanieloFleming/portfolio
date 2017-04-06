define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/HeaderResizeModule'
], function(_, BaseView, FadeInComponent, HeaderResizeModule) {

    return  BaseView.extend({
        id : 'contactpage',

        templateName: '#contactpage',

        components : {
            fader : {
                module : FadeInComponent,
                el: 'this'
            },
            headerResize: {
                module : HeaderResizeModule,
                el: '.section-header'
            }
        }
    });

});