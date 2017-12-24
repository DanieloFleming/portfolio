require.config({

    baseUrl: "/static/js",

    paths: {
        jquery: 'vendor/jquery-1.11.2',
        underscore: 'vendor/underscore-1.8.3',
        backbone: 'vendor/backbone-1.1.2'
    },

    shims: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps:['underscore', 'jquery'],
            exports: 'Backbone'
        }
    }
});

require([
    'app/App',
    'vendor/tweenmax',
    'app/modules/TabCheckModule'
], function(App){
    window.app = window.app || {};

    app.models = window.app.models || {};
    app.collections = window.app.collections || {};
    app.config = window.app.config || {};

    App.start();
});