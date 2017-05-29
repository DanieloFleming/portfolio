define([
    'backbone',
    'app/utils/ViewFactory'
], function(Backbone, ViewFactory){

    return Backbone.Router.extend({

        routes: {
            ''               : 'home',
            'about'          : 'about',
            'cases(/)'       : 'cases',
            'cases/:slug'    : 'case',
            'contact'        : 'contact',
            '*action'        : 'pageNotFound'
        },

        initialize : function() {
            this.views = {
                homePage        : ViewFactory.get(ViewFactory.VIEW_HOME, {collection: app.collections.projectCollection}),
                aboutPage       : ViewFactory.get(ViewFactory.VIEW_ABOUT),
                portfolioPage   : ViewFactory.get(ViewFactory.VIEW_PORTFOLIO, {collection: app.collections.projectCollection}),
                projectInfo     : ViewFactory.get(ViewFactory.VIEW_PROJECT, {model: app.models.projectModel}),
                contactPage     : ViewFactory.get(ViewFactory.VIEW_CONTACT),
                page404         : ViewFactory.get(ViewFactory.VIEW_404)
            };
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
            var collection = app.collections.projectCollection;
            var model = collection.findWhere({slug : slug});
            if (model === undefined) {
                return this.pageNotFound();
            }

            model.setPrev(collection.prev(model));
            model.setNext(collection.next(model));

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