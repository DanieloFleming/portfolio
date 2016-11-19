define([
    'underscore',
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ProjectViewerModuleG',
], function(_, BaseView, FadeInComponent, ProjectViewerModule) {

    return  BaseView.extend({
        id : 'projectPage',

        templateName: '#project-index',

        components : {

            projectViewer : {
                module : ProjectViewerModule,
                el:'.section-portfolio-items'
            },

            fader : {
                module : FadeInComponent,
                el: 'this'
            },
        },

        events : {
            "click .empty-project-item" : "handleCaseClicked"
        },

        handleCaseClicked : function() {
            if(this.isClicked === true) return;

            this.isClicked = true;

            TweenMax.to(this.el, .7, {
                opacity:0,
                y: "+100vh",
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