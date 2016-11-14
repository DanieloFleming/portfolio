define([
	'backbone',
	'underscore'
], function(Backbone, _) {

	return Backbone.View.extend({
        ANIMATION_TIME : .7,

        events : {
            'click .project-item' : 'handleClick'
        },

        initialize : function(options) {
        	_.bindAll(this,
        		'scrollCompleteHandler',
                'handleTransitionCompleted'
            );

        	this.overlayElement = $('<div class="project-overlay"><div class="overlay-item smart-object"></div></div>')[0];

        	this.$body = $('body');
        },

        handleClick : function(e) {
        	this.saveTargetData(e);
        	this.setScrollEvent(false);

            this.item.classList.add('selected');
        	this.setupScroll();
        },

        saveTargetData : function(e) {
        	this.item = e.currentTarget;
            this.slug = this.item.getAttribute('data-slug');

        	this.backgroundImage = this.item.querySelector('.project-item-thumb').style.backgroundImage;
        },

        setupScroll : function() {
        	var scrollTarget = this.getScrollPosition(this.item);
            var scrollData = { top:this.$body.scrollTop() };
        	var maxScroll = this.getMaxScroll();
        	var item = this.item;

        	if(scrollTarget > maxScroll) scrollTarget = maxScroll;

        	this.$body[0].appendChild(this.overlayElement);

        	this.animateScroll(scrollTarget, scrollData);
        },

        getScrollPosition : function(item) {
        	var box = this.item.getBoundingClientRect();
        	var bodyOffset = this.$body.offset();

        	return Math.round(box.top + this.$body.scrollTop() - bodyOffset.top);
        },

        getMaxScroll : function() {
            return Math.max(this.$body.prop('scrollHeight')) - window.innerHeight;
        },

        animateScroll : function(target, obj) {
        	TweenMax.to(obj, this.ANIMATION_TIME, {
        		top:target,
        		ease: Power4.easeInOut,
        		onUpdate:this.scrollToPosition,
        		onUpdateParams:[obj],
        		onComplete:this.scrollCompleteHandler
        	});
        },

        scrollToPosition : function(scrollData) {
            window.scroll(0, scrollData.top);
        },

        scrollCompleteHandler : function() {
            this.setItem();
        },

        setItem : function() {
            this.overlayContainer = this.$body[0].querySelector('.project-overlay');
            this.overlayImage = this.overlayContainer.querySelector('.overlay-item');

            this.overlayContainer.style.display = 'block';
            this.overlayImage.style.backgroundImage = this.backgroundImage;

            var data = this.item.getBoundingClientRect();

            TweenMax.set(this.overlayImage, {
                x:data.left,
                y:data.top,
            });


            TweenMax.to(this.overlayImage, this.ANIMATION_TIME, {
                x:'0',
                y:'0',
                transformOrigin:'0 0',
                width:window.innerWidth,
                height:window.innerHeight,
                ease: Power4.easeInOut,
                onComplete: this.handleTransitionCompleted,
                z:0
            });

        },

        handleTransitionCompleted : function(e) {
        	this.setScrollEvent(true);
            app.router.navigate('/projects/' + this.slug, {trigger: true});
        },

        setScrollEvent : function(enabled) {
        	if(!enabled) {
				this.$body[0].addEventListener('mousewheel', this.preventPageScroll);
        	} else {
				this.$body[0].removeEventListener('mousewheel', this.preventPageScroll);
        	}
        },

        preventPageScroll : function(e) {
            e.preventDefault();
            e.stopPropagation();
        },

        close : function() {
            this.$body = null;

            this.remove();
            this.unbind();
        }

	});

});