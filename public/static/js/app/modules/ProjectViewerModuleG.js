/**
 * @author Danielo Fleming <connect@danielofleming.nl>
 */
define([
    'underscore',
    'app/modules/BaseModule'
], function(_, BaseModule) {
    
    /**
     * @extends BaseModule
     */
    return BaseModule.extend({
        /**
         * Duration of the animation of this module
         * 
         * @const {float} ANIMATION_TIME
         */
        ANIMATION_TIME : .7,

        /**
         * This is the template used for the overlay
         * 
         * @const {String} template
         */
        template : '<div class="project-overlay"><div class="overlay-item"></div></div>',

        /**
         * @event click#handleClick
         */
        events : {
            'click .project-item' : 'handleClick'
        },

        /**
         * Initializer. In this method will start binding this to some methods
         * and store some much used data for easy access. 
         */
        initialize : function() {
            //bind 'this' to all methods passed as parameters
            _.bindAll(this,
                'scrollCompleteHandler',
                'setupHeaderAnimation',
                'handleTransitionCompleted',
                'scrollToPosition'
            );

            //Turn the template into HTNL
            this.overlayElement = $(this.template)[0];

            //Set refrence to the body
            this.$body = $(
                app.browser.isFireFox ? 'body, html' : 'body'
            );

            //Set refrence to the application HTMLElement
            this.$application = $('#application');

            this.viewPort = document.documentElement;
        },

        /**
         * This method is executed when the user clicks on on of the cases
         * 
         * @param {Event} e - Event
         */
        handleClick : function(e) {
            /**
             * this is for preventing double clicks. we could have removed
             * the event, but this is already handled in the close method
             */
            if(this.isClicked) return;

            /**
             * Objects outside this class are listining for this event
             * @fires ProjectViewModule#clicked
             */
            this.trigger('clicked');
            
            /**
             * In order to prevent the user from messing with the animation
             * process when monkey testing we want to see if the user has
             * already clicked and if so store that in here.
             */
            this.isClicked = true;

            /**
             * Hide the hamburger menu. We don't want the user to open the menu
             * during the animation and i dont want to see the menu during the animation
             */
            app.navigation.hide();

            /**
             * Start collecting everything we need from the item the user clicked on
             */
            this.getTargetData(e);

            //Disable user scroll to prevent user from F*ck!ng with the animation process
            this.setScrollEvent(false);


            this.setupScroll();
        },

        /**
         * Get the backgroundUrl and slug used for navigation
         * @param {Event} e - Event
         */
        getTargetData : function(e) {
            this.item = e.currentTarget;
            //We want the backgroundImage so we can get the url of the image we need to animate
            var backgroundImage = this.item.querySelector('.project-item-thumb').style.backgroundImage;

            /**
             * slice of 'url' from the string first. after that remove the double qoute
             * this wil leave us with only the url
             */
            this.imageUrl = backgroundImage.slice(4, -1).replace(/"/g, "");

            /**
             * This class fades out the text and 'darkens' the item. 
             * because of the way we animate the text would warp and grow. 
             * things i dont want to see
             */
            this.item.classList.add('selected');

            //the slug is a part of the url we want to navigate to after the animation
            this.slug = this.item.getAttribute('data-slug');
        },

        /**
         * Set everything to make the page scroll to the location 
         * of the clicked element
         */
        setupScroll : function() {
            /**
             * this is where we store the position to scroll to
             * @type {int}
             */
            var scrollTarget = this.getScrollPosition(this.item);

            /**
             * This is where we store the maximum scroll value
             * @type {int}
             */
            var maxScroll = this.getMaxScroll();

            /**
             * store the scrollData in a object. This is needed in order
             * for TweenMax to play with it
             * @type {Object}
             */
            var scrollData = {
                top : this.$application.scrollTop()
            };

            /**
             * Determin the max scroll so we can assure the fadeInOut
             * of the animation. If we have a higher scroll value that possible
             * the animation would stop when exeeding the max scroll value, resulting
             * in the feeling of lagg.
             */
            if(scrollTarget > maxScroll) scrollTarget = maxScroll;
            
            
            /**
             * Because we made the #aplication element bigger to hide the
             * scrollbar, we can not use width 100% on the overlay element.
             * Here is where we set the width of the overlay content to the 
             * width of the window
             */
            this.overlayElement.style.width = window.innerWidth + 'px';

            //Append the overlayElement to the dom
            this.$body[0].appendChild(this.overlayElement);

            //tart scrolling
            this.animateScroll(scrollTarget, scrollData);
        },

        /**
         * Get the position to scroll to
         */
        getScrollPosition : function() {
            var box = this.item.getBoundingClientRect();
            var bodyOffset = this.$application.offset();

            return Math.round(box.top + this.$application.scrollTop() - bodyOffset.top);
        },

        /**
         * Determin how much we can acually scroll
         */
        getMaxScroll : function() {
            return Math.max(this.$application.prop('scrollHeight')) - this.viewPort.clientHeight;
        },

        /**
         * Execute the scroll animation
         * 
         * @param {Object} target - Oject containing the value to scroll to
         * @param {Object} obj - Object containing the data we want animated
         */
        animateScroll : function(target, obj) {
            /**
             * Here we use TweenMax 'animating' the scroll value.
             * The onUpdate is executed on every RAF
             * And when completed it should execute the provided
             * onComplete method
             */
            TweenMax.to(obj, this.ANIMATION_TIME, {
                top:target,
                ease: Power4.easeInOut,
                onUpdate:this.scrollToPosition,
                onUpdateParams:[obj],
                onComplete:this.scrollCompleteHandler
            });
        },

        /**
         * Scroll the page to the given scrollData value. This is the
         * actual method that makes the page scroll.
         * 
         * @param {Object} scrollData - Object containing the top value
         */
        scrollToPosition : function(scrollData) {
            //Set the scroll of the #application to the scrollData vobj
            this.$application[0].scrollTop = scrollData.top;
        },

        /**
         * Start the whole transition thing after we have scrolled to the position
         */
        scrollCompleteHandler : function() {
            this.loadHeader();
        },


        //HERE STARTS ASTRONOMY

        /**
         * Set the headerImage and start the preparation for the animation when
         * load is completed
         */
        loadHeader : function() {
            this.headerImage = new Image();
            /**
             * this class is added to make this item look 
             * exactly the same as the selected item.
             */
            this.headerImage.className = 'overlay-item-thumb smart-object';
            this.headerImage.src = this.imageUrl;

            /**
             * Execute the next method when loading is completed. because
             * all the header images are preloaded this should not really
             * take any seconds at all.
             */
            this.headerImage.onload = this.setupHeaderAnimation;
        },

        /**
         * Set the overlay container to begin animation. It is here
         * Where we setup everything in order to animate the transition
         */
        setupHeaderAnimation : function() {
            this.overlayContainer = this.$body[0].querySelector('.project-overlay');
            this.overlayImage = this.overlayContainer.querySelector('.overlay-item');
            this.overlayContainer.style.display = 'block';

            /**
             * This contains the information about the width and height
             * of the images
             * @type {Object}
             */
            var backgroundData = this.getHeaderImageSize(this.headerImage);

            /**
             * This contains the scaling factor. We use scaling for animations
             * instead of positions for perfomance enhancements
             * @type {float}
             */
            var scale = this.getScale(backgroundData);

            this.overlayImage.appendChild(this.headerImage);

            /**
             * This is where we initialize all the startvalues
             * for the animation
             */
            this.setOverlayItem(backgroundData);

            //start animating
            this.animateHeader(scale);
        },

        /**
         * Get all the values required to determine the scale values 
         * 
         * @return {Oject} Animation data for TweenMax to workk with
         */
        getHeaderImageSize : function(image) {
            this.viewPort = {
                clientWidth:this.$application[0].clientWidth, 
                clientHeight:this.viewPort.clientHeight
            };

            /**
             * This is where we have the value determing if the image
             * is potrait or landscape
             * @type {float}
             */
            var ratio = image.width / image.height;

            /**
             * Basically the with of the window
             * 
             * @type {int}
             */
            var viewWidth = this.viewPort.clientWidth;

            /**
             * Basically the height of the window
             * 
             * @type {int}
             */
            var viewHeight = this.viewPort.clientHeight;

            /**
             * Calculate if we need to scale the images on the 
             * X or Y
             */
            var stretch = (viewWidth / viewHeight > ratio ) ? 'width' : 'height';

            return {
                height:viewHeight ,
                width:(viewHeight / image.height) * image.width,
                cover : 'height',
                stretchTo : stretch
            }
        },

        /**
         * Get the scale value used for the animation 
         */
        getScale : function(scaleData) {
            if(scaleData.stretchTo == 'width') {
                return this.viewPort.clientWidth / scaleData.width;
            } else {
                return this.viewPort.clientHeight / scaleData.height;
            }
        },


        /**
         * Place the overlay container and the image to animate in 
         * the overlay container, scaled image down to the same size and location
         * as the selected or clicked on item
         */
        setOverlayItem : function(bgSize) {
            /**
             * The dimensions of the item we are about to animate
             * 
             * @type {Object} 
             */
            var data = this.item.getBoundingClientRect();

            /**
             * The width of the viewport
             * 
             * @type {int}
             */
            var viewWidth = this.viewPort.clientWidth;

            /**
             * the height of the viewport
             * 
             * @type {int}
             */
            var viewHeight = this.viewPort.clientHeight;

            /**
             * The target scaling values
             * 
             * @type {float}
             */
            var scales = {
                x:(data.width / viewWidth),
                y:(data.height / viewHeight)
            };

            /**
             * Here we set the dimensions for the overlay container
             */
            TweenMax.set(this.overlayImage, {
                x:data.left,
                y:data.top,
                width:viewWidth,
                height:viewHeight,
                scaleX: scales.x,
                scaleY: scales.y
            });

            /**
             * Here we set the dimensions for the image within 
             * the container. At this point the image is at its true size
             */
            TweenMax.set(this.headerImage, {
                width:bgSize.width + 'px',
                height:bgSize.height + 'px',
                top:'50%',
                left:'50%',
                x: '-50%',
                y: '-50%'
            });

            /**
             * Get the exact scaling factors
             */
            var scaleData = this.getItemImageSize(scales, bgSize);

            /**
             * The animation is about growing so on order for the
             * image to scale up, we have to scale it down first.
             * now we have scaled down the image to the same size as 
             * the image of the selected item.
             */
            TweenMax.set(this.headerImage, {
                scaleX : scaleData.x,
                scaleY : scaleData.y
            });

        },
        /**
         * Get the size of the image. because the image is bigger than 
         * the container. we need induvidual sizes for the image.
         */
        getItemImageSize : function(scales, bgSizes) {
            var imageData = this.headerImage.getBoundingClientRect();

            if(bgSizes.cover == 'height') {
                return  {
                    x : ( ( (bgSizes.height * scales.y) / bgSizes.height) * bgSizes.width ) / imageData.width,
                    y : 1
                }
            } else {
                return {
                    x : 1,
                    y : ( ( (bgSizes.width * scales.x) / bgSizes.width) * bgSizes.height ) / bgSizes.height
                }
            }
        },

        /**
         * Animate the overlaycontainer and the image 
         * back to there original size
         */
        animateHeader: function(scale) {
            var line = new TimelineMax();
            /**
             * The headerImage has a diffrent scaleFactor than the
             * container it's confined to. So we use The Timeline
             * for animation these two elements at the same time.
             * 
             * The overlayItem is the box which contains the image
             * this one just needs to  be scaled until it fills the viewport
             * 
             * @todo the x -.5px is a hack. clean this up.
             */
            line.to(this.headerImage, this.ANIMATION_TIME, {
                ease: Power4.easeInOut,
                scale: scale
            }).to(this.overlayImage, this.ANIMATION_TIME, {
                x:'-.5px',
                y:'0px',
                scale:1,
                transformOrigin:'0 0',
                ease: Power4.easeInOut,
                onComplete: this.handleTransitionCompleted
            }, 0);
        },

        /**
         * Enable scroll after the animation is completed. Then
         * navigate to the slug provided by the selected item and
         * show the hamburger navigation again
         */
        handleTransitionCompleted : function(e) {
            this.setScrollEvent(true);

            /**
             * finally we 'trigger' a navigation so the router can handle
             * the request.
             */
            app.router.navigate('/cases/' + this.slug, {trigger: true});
            
            /**
             * This method animates the hamburger menu back into the view
             * and enables it at the same time.
             */
            app.navigation.show();
        },

        /**
         * ScrollEnable toggles
         */
        setScrollEvent : function(enabled) {
            if(!enabled) {
                this.$body[0].addEventListener('mousewheel', this.preventPageScroll);
            } else {
                this.$body[0].removeEventListener('mousewheel', this.preventPageScroll);
            }
        },

        /**
         * Prevent page from scrolling
         */
        preventPageScroll : function(e) {
            e.preventDefault();
            e.stopPropagation();
        },

        /**
         * Destroy method
         */
        close : function() {
            this.$body = null;
            this.remove();

            this.unbind();
        }

    });

});