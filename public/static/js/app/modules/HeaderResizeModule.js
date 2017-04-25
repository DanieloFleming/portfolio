define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    return Backbone.View.extend({

        initialize : function(){
            _.bindAll(this, 'handleResize', 'ticker');

            if(app.browser.isMobile) {
                $(window).on('resize', this.handleResize);
                this.handleResize();
            }

            if(!app.browser.isChrome) {
                this.handleNonChrome();
            }

            TweenMax.ticker.addEventListener('tick', this.ticker);
        },

        handleNonChrome : function() {

            if(app.browser.isSafari) {
                $("#application").css({transform:'none'});
            }
        },

        handleResize: function() {
            this.el.style.height = window.innerHeight + 'px';
        },

        ticker : function() {

        },

        close : function() {
            if(app.browser.isMobile) {
                $(window).off('resize', this.handleResize);
            }
            TweenMax.ticker.removeEventListener('tick', this.ticker);
        }
    });
});
