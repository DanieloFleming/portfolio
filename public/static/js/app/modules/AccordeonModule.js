define([
    'app/modules/BaseModule'
], function(BaseModule) {

    return BaseModule.extend({
        ANIMATION_TIME : .7,
        ITEM_CLASSNAME : '.accordeon',
        ITEM_IMAGE_CLASSNAME : ".accordeon-image-item",
        OVERLAY_CLASSNAME : '.accordeon-overlay',
        TITLE_CLASSNAME : '.accordeon-title',
        FOCUS_ZOOM_RATIO : .40,

        events : {
            'click .accordeon' : 'handleClick',
            'mouseenter .accordeon' : 'handleMouseEnter',
            'mouseleave' : "handleMouseLeave"
        },

        initialize : function() {
            this.items = Array.prototype.slice.call( this.el.querySelectorAll(this.ITEM_CLASSNAME) );
            this.contentItems = this.el.querySelectorAll(this.ITEM_IMAGE_CLASSNAME);
            this.arrayLength = this.items.length;
            this.windowWidth = window.outerWidth;
            this.elementWidth = this.windowWidth / this.arrayLength
        	this.isClicked = false;
            this.blurredZoomRatio = (1 - this.FOCUS_ZOOM_RATIO) / (this.arrayLength - 1);
        	
        	_.bindAll(this, "handleResize", "placeElement", "tweenElements", "animateHeader");

            this.positionElements();

        	window.addEventListener('resize', this.handleResize);
        },

        positionElements : function() {
            this.items.forEach(this.placeElement)
        },

        placeElement : function(element, index) {
            var posX = index * this.elementWidth;
            var xScale = 1 / this.arrayLength;
            var contentItem = this.contentItems[index];

            TweenMax.set(element, {
                x : posX,
                scaleX : xScale
            });

            TweenMax.set(contentItem, {
                scaleX : this.arrayLength
            });
        },

        handleClick : function(event) {
        	var target = event.currentTarget;

        	//this.slug = target.dataset.slug;

            target.style.zIndex = 10;
        	target.classList.add("selected");

        	if(this.isClicked != true) {
                this.isClicked = true;
                this.animateHeader(target);
        	}
        },

        handleMouseEnter : function(event) {
        	this.playAccordeon(event.currentTarget);
        },

        handleMouseLeave : function(event) {
        	this.playAccordeon();
        },

        playAccordeon : function(selectedElement) {
        	if(this.isClicked != true) {
                xPos = 0;
        		
                this.items.forEach(function(element, index){

                    if(selectedElement)
                        if(element == selectedElement) {
                            this.tweenElements(index, element, xPos, this.FOCUS_ZOOM_RATIO);
                            xPos += this.windowWidth * this.FOCUS_ZOOM_RATIO;
                        } else {
                            this.tweenElements(index, element, xPos, this.blurredZoomRatio);
                            xPos += this.windowWidth * this.blurredZoomRatio;
                        } 
                    else {
                        this.tweenElements(index, element, xPos, 1 / this.arrayLength);
                        xPos += this.windowWidth * (1 / this.arrayLength);
                    }
                }, this);
        	}
        },

        tweenElements : function(index, element, xPos, xScale) {
            var easeType = Power4.easeInOut;
            var imageScale = 1 / xScale;
            var animationTime = .34;
            var imageContent = this.contentItems[index];

            TweenMax.to(element, animationTime, {
                scaleX : xScale,
                x : xPos
            });

            TweenMax.to(imageContent, animationTime, {
                scaleX : imageScale
            });
        },

        animateHeader : function(element) {
                TweenMax.to(element, .7, {
                    x:0,
                    scaleX:1,
                    ease: Power4.easeInOut,
                });

                TweenMax.to(element.querySelector(this.ITEM_IMAGE_CLASSNAME), .7, {
                    scaleX:1,
                    ease: Power4.easeInOut,
                    onComplete : this.handleTransitionCompleted,
                    onCompleteParams : [element.dataset.slug]
                });
        },

        handleTransitionCompleted : function(slug) {
            window.scroll(0, 0);
            var goToPage = (slug == "") ?  "/projects" : "/projects/" + slug;

            app.router.navigate(goToPage, {trigger: true});
            app.navigation.show();
        },

        handleResize : function(event) {
        	this.windowWidth = event.currentTarget.outerWidth;
            this.elementWidth = this.windowWidth / this.arrayLength;
        	//this.playAccordeon();
            this.positionElements();
        },

        close : function() {
        	window.removeEventListener('resize', this.handleResize);
        }
    });
});