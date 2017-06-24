define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    return Backbone.View.extend({

        initialize : function(){
            _.bindAll(this, 'handleResize');

            if(app.browser.isMobile()) {
                $(window).on('resize', this.handleResize);
                this.handleResize();
            }
            
            if(!app.browser.isChrome()) {
                this.handleNonChrome();
            }

            var headerBackground = this.el.querySelector('.header-background');

            if(headerBackground) {
                if (app.browser.isWindows() && !app.browser.isIe()) {
                    TweenMax.set(headerBackground, {left: -app.config.applicationWidth / 2 + "px"});
                }
            }
        },

        handleNonChrome : function() {

            if(app.browser.isSafari()) {
                $("#application").css({transform:'none'});
            }
        },

        handleResize: function() {
            this.el.style.height = window.innerHeight + 'px';
        },

        close : function() {
            if(app.browser.isMobile()) {
                $(window).off('resize', this.handleResize);
            }
        }
    });
});
