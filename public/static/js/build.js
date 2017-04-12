({
    baseUrl: "../js",
    paths: {
        jquery: 'vendor/jquery-1.11.2',
        underscore: 'vendor/underscore-1.8.3',
        backbone: 'vendor/backbone-1.1.2',
        TweenMax: 'vendor/tweenmax'
    },
    shims: {
        underscore: {
            exports: '_'
        },

        backbone: {
            deps:['underscore', 'jquery'],
            exports: 'Backbone'
        }
    },
    name: "main",
    out: "main-built.js",
    preserveLicenseComments: false
});