define([
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ProjectViewerModuleG',
    'app/modules/ScrollToModule'
], function(BaseView, FadeInComponent, ProjectViewerModule, ScrollToModule) {

    return  BaseView.extend({
        id : 'homepage',

        className : 'page',

        templateName : '#homepage',

        templateVars : {},

        ui : {
            projectItemsContainer : '.section-portfolio-items',
        },

        events : {
            'click .all-cases' : 'handleClick',
            'click .section-header' : 'interact'
        },

        components : {
            projectViewer : {
                module : ProjectViewerModule,
                el :'.section-portfolio-items'
            },
            fader : {
                module : FadeInComponent,
                el : 'this'
            },
            scrollTo : {
                module : ScrollToModule,
                el : '.scroll-to'
            }
        },

        onInitialize : function(options) {
            this.templateVars.collection = _.first(options.collection.toJSON(), 3);
        },

        handleClick : function() {
            TweenMax.to(this.el, .7, {
                opacity:0, y: "+100vh",
                onComplete : this.handleComplete
            })
        },

        interact : function(){
            if(this.isInteracting) return;

            this.isInteracting = true;

            this.components.scrollTo.interact(function(){
                this.isInteracting = false;
            }.bind(this));
        },



        handleComplete : function() {
            app.router.navigate('/cases', {trigger: true});
        },
    });

});