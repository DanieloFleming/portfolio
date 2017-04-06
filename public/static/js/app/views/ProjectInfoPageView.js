define([
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ProjectViewerModuleG',
    'app/modules/ScrollToModule',
    'app/components/ComponentLoader',
    'app/modules/HeaderResizeModule'
], function(BaseView, FadeInComponent, ProjectViewerModule, ScrollToModule, ComponentLoader, HeaderResizeModule) {

    return  BaseView.extend({
        id : 'projectPage',
        
        className : 'page',

        templateVars : {},

        ui: {
            components: '[data-component]',
            headerImage : ".header-background",
            projectItem : '.project-item',
            casesFooter : '.footer-cases',
            demos : 'iframe'
        },
        
        components : {

            projectViewer : {
                module : ProjectViewerModule,
                el:'.section-portfolio-items'
            },

            fader : {
                module : FadeInComponent,
                el: 'this'
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

        events : {
            'click .footer-cases' : 'handleCaseClicked',
            'click .section-header' : 'interact',
        },

        onInitialize : function () {
            this.templateVars.model = this.model;

            this.template = app.templateManager.get(this.model.attributes.slug);

            this.listenToOnce(this.model, 'change', this.updateTemplate);
        },

        initialized : function () {
            _.bindAll(this, 'handleComplete', 'preparePageChange', 'handleKeyPress');

            ComponentLoader.load(this.ui.components);

            this.handleHeaderLoading();
            this.listenTo(this.components.projectViewer, 'clicked', this.preparePageChange);

        },
        interact : function(){
            if(this.isInteracting) return;

            this.isInteracting = true;

            this.components.scrollTo.interact(function(){
                this.isInteracting = false;
            }.bind(this));
        },

        handleCaseClicked : function() {
            if(this.isClicked || this.components.projectViewer.isClicked) return;

            this.isClicked = true;
            this.components.projectViewer.isClicked = true;
            //$('body').off('keyup', this.handleKeyPress);

            TweenMax.to(this.el, .7, {
                opacity:0,
                onComplete : this.handleComplete
            });
        },

        handleComplete : function() {
            app.router.navigate('/cases', {trigger: true});
        },

        handleHeaderLoading : function() {
            var headerImageUrl = this.ui.headerImage.getAttribute('data-headerImageUrl');

            this.ui.headerImage.removeAttribute("data-headerImageUrl");
            this.ui.headerImage.style.backgroundImage = "url(" + headerImageUrl + ")";

            $('body').on('keyup', this.handleKeyPress);
        },

        setModel : function(model) {
            this.model.set(model.toJSON());

            this.updateTemplate();
        },

        updateTemplate : function() {
            var slug = this.model.get('slug');
            this.templateVars.model = this.model;
            this.template = app.templateManager.get(slug);

            this.setClass(slug);

            window.scroll(0, 0);
        },

        setClass : function(templateClassName) {
            this.el.className = templateClassName;
        },

        preparePageChange : function() {
            $('body').off('keyup', this.handleKeyPress);

            if(this.ui.demos) {
                TweenMax.set(this.ui.demos, {
                    opacity:0
                });
            }
        },

        handleKeyPress : function(e) {
            var slug;
            switch (e.keyCode) {
                case 37:
                    slug = this.model.get('prev').slug;
                    break;
                case 39:
                    slug = this.model.get('next').slug;
                    break;
                default: return;
            }

            app.router.navigate('/cases/' + slug, {trigger: true});
        },

        onClose : function() {
            $('body').off('keyup', this.handleKeyPress);

            this.isClicked = false;

            ComponentLoader.close();
        }
    });

});