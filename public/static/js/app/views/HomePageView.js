define([
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ProjectViewerModuleG',
    'app/modules/AccordeonModule',
    'app/modules/ScrollToModule'
], function(BaseView, FadeInComponent, ProjectViewerModule, AccordeonModule, ScrollToModule) {

    return  BaseView.extend({
        id : 'homepage',

        className : 'page',

        templateName : '#homepage',

        ui : {
            projectItemsContainer : '.section-portfolio-items',
            accordeonOverlay : '.overlay-desktop',
            overlayContent : '.overlay-desktop .accordeon-content'
        },

        events : {
            'click .scroll-hide' : "hideOverlay",
            'click .all-cases' : 'handleClick'
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
            accordeon : {
                module : AccordeonModule,
                el : '.section-accordeon'
            },
            scrollTo : {
                module : ScrollToModule,
                el : '.scroll-to'
            }
        },

        initialized : function () {
            _.bindAll(this, "hideOverlay");

            $(window).one('wheel', this.hideOverlay);
        },

        hideOverlay : function(event) {
            if(event.type == "click" && this.isClicked) {
                return;
            }

            this.isClicked = true;

            TweenMax.to(this.ui.accordeonOverlay, .7, {
                display : 'none',
                opacity : 0,
                ease:Power4.easeInOut,
            });

            TweenMax.to(this.ui.overlayContent, .7, {
                opacity : 0,
                y : "-100%",
                ease:Power4.easeInOut, 
            });
        },

        handleClick : function() {
            console.log('HEREE');
            TweenMax.to(this.el, .7, {
                opacity:0,
                y: "+100vh",
                onComplete : this.handleComplete
            })
        },

        handleComplete : function() {
            app.router.navigate('/projects', {trigger: true});
        },

        onClose : function() {
            $(window).off('mousewheel', this.hideOverlay);
            this.isClicked = false;
        }
    });

});