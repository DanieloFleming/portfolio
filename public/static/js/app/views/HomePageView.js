define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ProjectViewerModuleG',
    'app/modules/ScrollToModule',
    'app/modules/HeaderResizeModule'
], function(_, BaseView, FadeInComponent, ProjectViewerModule, ScrollToModule, HeaderResizeModule) {

    return  BaseView.extend({
        id : 'homepage',

        className : 'page',

        templateName : '#homepage',

        templateVars : {},

        ui : {
            projectItemsContainer : '.section-portfolio-items',
            header : '.section-header'
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
            },
            headerResize: {
                module : HeaderResizeModule,
                el : '.section-header'
            }
        },

        onInitialize : function(options) {
            this.templateVars.collection = _.first(options.collection.toJSON(), 3);
        },

        handleClick : function(e) {
            TweenMax.to(this.el, .5, {
                opacity:0,
                onComplete : this.handleComplete
            });
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