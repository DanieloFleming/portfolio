define([
    'app/modules/BaseModule'
], function(BaseModule) {

    return BaseModule.extend({
        ANIMATION_TIME : .7,
        ITEM_CLASSNAME : '.accordeon',
        ITEM_IMAGE_CLASSNAME : ".accordeon-image-item",
        OVERLAY_CLASSNAME : '.accordeon-overlay',

        events : {
            'click .accordeon' : 'handleClick',
            'mouseenter .accordeon' : 'handleMouseEnter',
            'mouseleave' : "handleMouseLeave"
        },

        xMark : [
        	[0, 0, 1, 0], 
        	[0, -.25, 1, 0], 
        	[0, -1, .25, 0], 
        	[0, -1, 0, 0],
        	[0, -.5, .5, 0]
        ],

        initialize : function() {
        	this.isClicked = true;

        	this.items = Array.prototype.slice.call( this.el.querySelectorAll(this.ITEM_CLASSNAME) );
        	
        	_.bindAll(this, 'setItemDimensions', "handleResize", "handleTransitionCompleted", "setDefault");

        	window.addEventListener('resize', this.handleResize);

        	this.windowWidth = window.outerWidth;

        	TweenMax.delayedCall(2, function(){
        		this.isClicked = false;
        		_.each(this.items, this.setDefault);
        	}.bind(this))
        },

        handleClick : function(event) {
        	var target = event.currentTarget;

        	this.slug = target.dataset.slug;
        	target.classList.add("selected");

        	if(this.isClicked != true) {
        		this.isClicked = true;
				TweenMax.to(target, .7, {
					x:0,
					scaleX:1,
					ease: Power4.easeInOut,
				});

				TweenMax.to(target.querySelector(this.ITEM_IMAGE_CLASSNAME), .7, {
					scaleX:1,
					ease: Power4.easeInOut,
					onComplete : this.handleTransitionCompleted
				});
        	}
        },

        handleMouseEnter : function(event) {
        	if(this.isClicked) return false;
        	this.currentItem = event.currentTarget;
        	this.playAccordeon();
        },

        handleMouseLeave : function(event) {
        	this.currentItem = null;
        	this.playAccordeon();
        },

        playAccordeon : function() {
        	if(this.isClicked != true) {
        		_.each(this.items, this.setItemDimensions);
        	}
        },

        setDefault : function(item, index) {
        	var xScale = .25;
        	var xTransform = (this.windowWidth * xScale) * this.xMark[this.xMark.length -1][index];
        	
        	TweenMax.set(item, {
        		scaleX : xScale,
        		x : xTransform
        	})
        },

        setItemDimensions : function(item, index) {
        	var currentItemIndex = this.items.indexOf(this.currentItem);
        	var xScale = xTransform = "";

        	if(this.currentItem != null) {
        	    xScale = (item == this.currentItem) ? .4 : .2;
          		xTransform = (this.windowWidth * xScale) * this.xMark[currentItemIndex][index];	
        	} else {
        		
        		xScale = .25;

        		xTransform = (this.windowWidth * xScale) * this.xMark[this.xMark.length -1][index];
        	}


        	var photoScale = 1 / xScale;

			TweenMax.to(item.querySelector(this.ITEM_IMAGE_CLASSNAME), .34, {
				scaleX : photoScale,
                //ease: Power4.easeInOut,
			});

			TweenMax.to(item, .34, {
				scaleX : xScale,
				x : xTransform,
                //ease: Power4.easeInOut,
			});
        },

        handleTransitionCompleted : function() {
            window.scroll(0, 0);
            app.router.navigate('/projects/' + this.slug, {trigger: true});
            app.navigation.show();
        },

        handleResize : function(event) {
        	this.windowWidth = event.currentTarget.outerWidth;
        	this.playAccordeon();
        },

        close : function() {
        	window.removeEventListener('resize', this.handleResize);
        }
    });
});