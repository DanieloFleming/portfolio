define([
    'backbone',
    'underscore'
], function(Backbone, _) {

    return Backbone.View.extend({

        initialize : function(){
            if(app.browser.isMobile) {
                _.bindAll(this, 'handleResize');

                $(window).on('resize', this.handleResize);

                this.handleResize();
            }
            if(!app.browser.isChrome) {
                this.handleNonChrome();
            }
        },

        handleNonChrome : function() {
            Object.assign($("#application")[0].style, {perspective : 'none', transform:'none'});

            var vid = this.el.querySelector('.video-header-homepage');
            var bg = this.el.querySelector('.header-background');
            if(vid) {
                vid.classList.add("no-parallax");
            } else if(bg) {
                bg.style.transform = 'none';
            }
        },

        handleResize: function() {
            this.el.style.height = window.innerHeight + 'px';
        },

        close : function() {
            if(app.browser.isMobile) {
                $(window).off('resize', this.handleResize);
            }
        }
    });
});
