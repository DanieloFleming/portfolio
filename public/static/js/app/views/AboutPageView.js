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


        components: {
            scrollTo : {
                module : ScrollToModule,
                el : '.scroll-to'
            }
        },

        ui : {
            codeTypeName: '.language-type',
            codeBar : '.language-type-bar',
            platformBar : '.platform-bar',
            platformTypeName : '.platform-type'
        },

        onInitialize : function () {

        },

        initialized : function () {

            this.setupCodeTypeSection();

            this._addComponent('fader', {
                module : FadeInComponent,
                el: 'this'
            });
        },

        setupCodeTypeSection : function() {
            _.each(this.ui.codeBar, function(value, key){
                var delay = .2 * key + 's';
                
                this.ui.codeTypeName[key].dataset.delay = .2 * key;

                value.dataset.delay = .25 * key;
                value.dataset.transitionType = 'slideRight';
                value.style.width = value.dataset.points + '%';

            }.bind(this));

            _.each(this.ui.platformBar, function(value, key){

                this.ui.platformTypeName[key].dataset.delay = .25 * key + .4;
                //this.ui.platformTypeName[key].dataset.transitionType = 'slideUp';
                value.dataset.delay = .2 * key + .4;
                value.dataset.transitionType = 'slideUp';
                //value.style.width = value.dataset.points + '%';
            }.bind(this));
            //set length animation bar
            //set delay
            //when in view
            //add animation-class
            
            
        },

        onClose : function() {

        }
    });

});