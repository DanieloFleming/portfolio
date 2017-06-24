define([
    'backbone',
    'app/views/HomePageView',
    'app/views/AboutPageView',
    'app/views/ProjectsPageView',
    'app/views/ProjectInfoPageView',
    'app/views/ContactPageView',
    'app/views/Page404'
], function(Backbone, HomePage, AboutPage, ProjectPage, ProjectInfoPage, ContactPage, Page404){

    return Backbone.Router.extend({

        routes: {
            ''               : 'home',
            'about'          : 'about',
            'cases(/)'       : 'cases',
            'cases/:slug'    : 'case',
            'contact'        : 'contact',
            '*action'        : 'pageNotFound'
        },

        initialize : function(props) {
            this.collection = props.collection;

            this.views = {
                homePage        : new HomePage({collection: app.collections.projectCollection}),
                portfolioPage   : new ProjectPage({collection: app.collections.projectCollection}),
                projectInfo     : new ProjectInfoPage({model: app.models.projectModel}),
                contactPage     : new ContactPage(),
                aboutPage       : new AboutPage(),
                page404         : new Page404()
            };

            Backbone.history.start({pushState: true});
        },

        home : function() {
            app.regionManager.show(this.views.homePage);
        },

        about : function() {
            app.regionManager.show(this.views.aboutPage);
        },

        cases : function() {
            app.regionManager.show(this.views.portfolioPage);
        },

        case : function(slug) {
            var model = this.collection.findWhere({slug : slug});

            if (model === undefined) {
                return this.pageNotFound();
            }

            this.views.projectInfo.setModel(model);
            
            app.regionManager.show(this.views.projectInfo);
        },

        contact : function() {
            app.regionManager.show(this.views.contactPage);
        },

        pageNotFound : function() {
            app.regionManager.show(this.views.page404);
        }
    });
});