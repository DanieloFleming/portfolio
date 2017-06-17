define([
    'underscore',
	'app/modules/BaseModule'
], function(_, BaseModule) {

	return BaseModule.extend({
		events : {
			'click' : 'handleClick'
		},

		initialize : function() {
            this.$body = $('#application');

            _.bindAll(this, 'handleComplete', 'scrollToPosition');

            this.interact();
		},

        interact : function(callback) {
            this.el.classList.add('case-loading');

            TweenMax.delayedCall(1.5, function() {
                this.el.classList.remove("case-loading");
                if(_.isFunction(callback)) callback();
            }, null, this);
        },

		handleClick : function(e) {
			this.setScrollEvent(false);

			var target = e.currentTarget;
			var scrollTo = this.getScrollPosition(target);
            this.el.classList.remove("case-loading");

			this.animateScroll(scrollTo);
		},

        getScrollPosition : function(element) {
            var box = element.getBoundingClientRect();
            var bodyOffset = this.$body.offset();

            return Math.round(box.bottom + this.$body.scrollTop() - bodyOffset.top);
        },

        animateScroll : function(scrollTo) {
        	var obj = {top:this.$body.scrollTop() };

        	TweenMax.to(obj, .7, {
        		top:scrollTo,
        		onUpdate:this.scrollToPosition,
        		onUpdateParams:[obj],
        		ease:Power4.easeInOut,
        		onComplete:this.handleComplete
        	});
        },

        handleComplete : function() {
        	this.setScrollEvent(true);
        },

        scrollToPosition : function(scrollData) {
            //window.scroll(0, scrollData.top);
            this.$body[0].scrollTop = scrollData.top;
        },

        /**
         * Toggle scroll availability.
         * 
         * @param {bool} enabled
         */
        setScrollEvent : function(enabled) {
        	if(!enabled) {
				this.$body[0].addEventListener('mousewheel', this.preventPageScroll);
        	} else {
				this.$body[0].removeEventListener('mousewheel', this.preventPageScroll);
        	}
        },

        /**
         * Prevents the page from scrolling on scroll.
         */
         preventPageScroll : function(e) {
            e.preventDefault();
            e.stopPropagation();
        }
	});
});