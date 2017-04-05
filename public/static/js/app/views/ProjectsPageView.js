define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ProjectViewerModuleG',
], function(_, BaseView, FadeInComponent, ProjectViewerModule) {

    return  BaseView.extend({
        id : 'project-index',

        templateName: '#project-index',
        templateVars : {},

        components : {

            projectViewer : {
                module : ProjectViewerModule,
                el:'.section-portfolio-items'
            },

            fader : {
                module : FadeInComponent,
                el: 'this'
            }
        },

        events : {
            "click .empty-project-item" : "handleCaseClicked"
        },

        onInitialize : function(options) {
            this.templateVars.collection = options.collection.toJSON();
        },

        handleCaseClicked : function() {
            if(this.isClicked === true) return;

            this.isClicked = true;

            TweenMax.to(this.el, .7, {
                opacity:0,
                onComplete : this.handleComplete.bind(this)
            })
        },

        handleComplete : function() {
            app.router.navigate('/contact', {trigger: true});
        },

        onClose : function() {
            this.isClicked = false;
        }

    });

});