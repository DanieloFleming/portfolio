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
        var prefix = typeof document.hidden == "undefined" ? "ms" : '';
        /**
         * initialize pre-loader.
         */
        function initialize() {

            app.regionManager = RegionManager;
            app.templateManager = TemplateManager;

            app.models.projectModel = new ProjectModel();
            app.collections.projectCollection = new ProjectCollection();

            checkBrowser();
            setActiveTabCheck();
            startSplashScreen();

            app.collections.projectCollection.fetch({
                success : function() {
                    splashScreen.setCollection(app.collections.projectCollection);
                }
            });
        }

        function startSplashScreen() {
            splashScreen = new SplashScreenView();

            app.regionManager.show(splashScreen);

            splashScreen.on('completed', startRouter);
        }

        function checkBrowser() {
            app.browser = {};

            app.browser.isFireFox = document.body.style.MozTransform != undefined;

            app.browser.isChrome = (window.chrome) &&
                window.navigator.vendor == "Google Inc." &&
                window.navigator.userAgent.indexOf("OPR") == -1;

            app.browser.isMobile = 'ontouchstart' in window || navigator.msMaxTouchPoints ||
            typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('IEMobile') !== -1;
        }

        function setActiveTabCheck() {
            var eventName = prefix + 'visibilitychange';

            document.addEventListener(eventName, handleDocumentTitleChange);
        }

        function handleDocumentTitleChange() {
            var hidden = prefix + "hidden";
            if(document[hidden]) {
                document.title = ":( come back ";
            } else {
                document.title = "welcome back @ danielo.nl";
            }
        }
        /**
         * Start the application when pre-loading is completed
         */
        function startRouter() {
            var models = app.collections.projectCollection.models;

            app.router = new Router();
            app.navigation = new HamburgerComponent();
            app.templateManager.cacheTemplates(models);

            Backbone.history.start({pushState: true});
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