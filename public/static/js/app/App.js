define([
    'app/routes/ApplicationRouter',
    'app/collections/ProjectCollection',
    'app/models/ProjectModel',

    'app/utils/RegionManager',
    'app/utils/TemplateManager',
    'app/utils/BrowserCheck',

    'app/views/SplashScreenView',
    'app/components/HamburgerComponent'
], function(
    Router, 
    ProjectCollection, 
    ProjectModel,

    RegionManager, 
    TemplateManager, 
    BrowserCheck,

    SplashScreenView, 
    HamburgerComponent
    ){
    //strict mode on!
    "use strict";

    var Application = (function(){
        var splashScreen;

        /**
         * Instanciate modules
         */
        function setModules() {
            app.browser = BrowserCheck;
            app.regionManager = RegionManager;
            app.templateManager = TemplateManager;
            app.models.projectModel = new ProjectModel();
            app.collections.projectCollection = new ProjectCollection();
        };

        /**
         * Start setup application
         * 
         */
        function initialize() {
            setModules();

            splashScreen = new SplashScreenView();
            splashScreen.on('completed', startApplication);

            app.regionManager.show(splashScreen);

            app.collections.projectCollection.fetch({
                success : handleFetchCompleted
            });
        }

        /**
         * Handle success of fetch
         * 
         * @param {Backbone.Collection} collection 
         */
        function handleFetchCompleted(collection) {
            splashScreen.setCollection(collection);
            app.templateManager.cacheTemplates(collection.models);
        }

        /**
         * Start the application when pre-loading is completed
         */
        function startApplication() {
            app.router = new Router({
                collection:app.collections.projectCollection
            });

            app.navigation = new HamburgerComponent({
                router:app.router
            });
        }

        /**
         * make methods publicly accessible
         */
        return {
            start: initialize
        }
    });

    return new Application();
});