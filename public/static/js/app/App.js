define([
    'app/routes/ApplicationRouter',
    'app/collections/ProjectCollection',
    'app/models/ProjectModel',
    'app/utils/RegionManager',
    'app/utils/TemplateManager',
    'app/views/SplashScreenView',
    'app/components/HamburgerComponent'
], function(Router, ProjectCollection, ProjectModel, RegionManager, TemplateManager, SplashScreenView, HamburgerComponent){
    //strict mode on!
    "use strict";

    var Application = (function(){
        var splashScreen;
        /**
         * initialize pre-loader.
         */
        function initialize() {
            checkBrowser();
            app.regionManager = RegionManager;
            app.templateManager = TemplateManager;

            app.models.projectModel = new ProjectModel();
            app.collections.projectCollection = new ProjectCollection();

            app.collections.projectCollection.fetch({
                success: startRouter
            });

            //startSplashScreen();

        }

        function startSplashScreen() {
            splashScreen = new SplashScreenView();

            app.regionManager.show(splashScreen);

            splashScreen.on('completed', startRouter);
        }

        function checkBrowser() {
            app.browser = {};
            if(document.body.style.MozTransform != undefined) {
                app.browser.isFireFox = true;
            } 
        }
        /**
         * Start the application when pre-loading is completed
         */
        function startRouter() {
            var models = app.collections.projectCollection.models;

            app.templateManager.cacheTemplates(models);
            app.router = new Router();
            Backbone.history.start({pushState: true});

            //app.navigation = new navigationComponent();
            app.navigation = new HamburgerComponent();
            //$('footer')[0].classList.remove('hidden');
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