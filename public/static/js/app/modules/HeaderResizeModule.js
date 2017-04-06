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
