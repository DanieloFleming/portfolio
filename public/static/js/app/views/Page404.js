define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ScrollToModule',
], function(_, BaseView, FadeInComponent, ScrollToModule) {

    return  BaseView.extend({
        className : 'page 404',

        templateName : '#404',

        templateVars : {},

        components : {

            fader : {
                module : FadeInComponent,
                el: 'this'
            },
            scrollTo : {
                module : ScrollToModule,
                el : '.scroll-to'
            }
        },

        events : {
            'click .section-header' : 'interact',
            'click .scroll-indicator' : 'goHome'
        },

        interact : function(){
            if(this.isInteracting) return;
            this.isInteracting = true;

            this.components.scrollTo.interact(function(){
                this.isInteracting = false;
            }.bind(this));
        },

        goHome : function(e) {
            e.preventDefault();
            var footer = this.el.querySelector('footer');
            footer.style.display = 'none';
            TweenMax.to(this.el, .7, {opacity:0, onComplete:this.handleComplete})
        },

        handleComplete : function() {
            app.router.navigate('/', {trigger: true});
        },

        onClose : function() {
            this.isClicked = false;
        }
    });
});