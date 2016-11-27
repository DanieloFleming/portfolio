define([
    'backbone',
    'app/utils/ViewFactory'
], function(Backbone, ViewFactory){

    return Backbone.Router.extend({

        routes: {
            ''               : 'index',
            'about'          : 'about',
            'cases(/)'    : 'projectIndex',
            'cases/:slug' : 'projectPage',
            'page-not-found' : 'pageNotFound',
            'contact'        : 'contact',
            '*action'        : 'invalidUrl',
        },

        initialize : function() {
            this.views = {
                homePage        : ViewFactory.get(ViewFactory.VIEW_HOME, {collection: app.collections.projectCollection}),
                aboutPage       : ViewFactory.get(ViewFactory.VIEW_ABOUT),
                portfolioPage   : ViewFactory.get(ViewFactory.VIEW_PORTFOLIO, {collection: app.collections.projectCollection}),
                projectInfo     : ViewFactory.get(ViewFactory.VIEW_PROJECT, {model: app.models.projectModel}),
                contactPage     : ViewFactory.get(ViewFactory.VIEW_CONTACT)
            };
        },

        index : function() {
            app.regionManager.show(this.views.homePage);
        },

        about : function() {
            app.regionManager.show(this.views.aboutPage);
        },

        projectIndex : function() {
            app.regionManager.show(this.views.portfolioPage);
        },

        projectPage : function(slug) {
            var collection = app.collections.projectCollection;

            var model = collection.findWhere({slug : slug});
                model.setPrev(collection.prev(model));
                model.setNext(collection.next(model));

            if (model === undefined) {
                return this.invalidUrl();
            }

            this.views.projectInfo.setModel(model);
            
            app.regionManager.show(this.views.projectInfo);
        },

        contact : function() {
            app.regionManager.show(this.views.contactPage);
        },

        invalidUrl : function() {
           //app.router.navigate('/page-not-found', {trigger: true});
        },
        pageNotFound : function() {
            console.log('page not found');
        }

    });



});