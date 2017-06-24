define([], function() {
    'use strict';

    var body        = document.body,
        navivator   = window.navigator,
        userAgent   = navigator.userAgent.toLowerCase(),
        os          = document.body.getAttribute('data-os'),
        type        = document.body.getAttribute('data-browser');

    var BrowserCheck = {
        
        os : function() {
            return os;
        },

        type : function() {
            return type;
        },

        isWindows : function() {
            return os == 'windows';
        },

        isFireFox : function() {
            return body.style.MozTransform != undefined;
        },

        isSafari : function() {
            var test = /version\/(\d+).+?safari/.test(userAgent);
            return test !== null;
        },

        isChrome : function() {
            return (window.chrome != false);
        },

        isIe : function() {
            var test = /msie\s|trident\/|edge\//i.test(userAgent)
            return test !== null;
        },

        isAndroid : function() {
            return (/android/.test(userAgent));
        },

        isMobile : function() {
            return 'ontouchstart' in window || navigator.msMaxTouchPoints 
                || typeof window.orientation !== "undefined" 
                || navigator.userAgent.indexOf('iemobile') !== -1;
        },
    };

    return BrowserCheck;
});