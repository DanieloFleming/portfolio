define([
    'app/views/BaseView',
    'app/components/FadeInComponent',
    'app/modules/ProjectViewerModuleG',
    'app/modules/ScrollToModule',
    'app/components/ComponentLoader'
], function(BaseView, FadeInComponent, ProjectViewerModule, ScrollToModule, ComponentLoader) {

    return  BaseView.extend({
        id : 'projectPage',
        
        className : 'page',

        templateVars : {},

        ui: {
            components: '[data-component]',
            headerImage : ".header-background",
            projectItem : '.project-item',
            casesFooter : '.footer-cases'
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
            }
        },

        events : {
            'click .footer-cases' : 'handleCaseClicked'
        },

        onInitialize : function () {
            this.templateVars.model = this.model;

            this.template = app.templateManager.get(this.model.attributes.slug);

            this.listenToOnce(this.model, 'change', this.updateTemplate);
        },

        initialized : function () {
            _.bindAll(this, "handleComplete");
            ComponentLoader.load(this.ui.components);

            this.handleHeaderLoading();

        },

        handleCaseClicked : function() {
            if(this.isClicked) return;

            this.isClicked = true;

            TweenMax.to(this.el, .7, {
                opacity:0, y: "+100vh",
                onComplete : this.handleComplete
            })
        },

        handleComplete : function() {
            app.router.navigate('/projects', {trigger: true});
        },

        handleHeaderLoading : function() {
            var headerImageUrl = this.ui.headerImage.getAttribute('data-headerImageUrl');

            this.ui.headerImage.removeAttribute("data-headerImageUrl");
            this.ui.headerImage.style.backgroundImage = "url(" + headerImageUrl + ")";
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

        onClose : function() {
            this.isClicked = false;

            ComponentLoader.close();
        }
    });

});