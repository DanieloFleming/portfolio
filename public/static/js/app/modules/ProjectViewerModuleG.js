define([
    'underscore',
    'app/modules/BaseModule'
], function(_, BaseModule) {

    return BaseModule.extend({
        ANIMATION_TIME : .7,
        template : '<div class="project-overlay"><div class="overlay-item"></div></div>',
        events : {
            'click .project-item' : 'handleClick'
        },

        initialize : function() {
            _.bindAll(this,
                'scrollCompleteHandler',
                'setupHeaderAnimation',
                'handleTransitionCompleted',
                'scrollToPosition'
            );

            this.overlayElement = $(this.template)[0];

            this.$body = $(
                app.browser.isFireFox ? 'body, html' : 'body'
            );

            this.$application = $('#application');

            this.viewPort = document.documentElement;
        },

        handleClick : function(e) {
            if(this.isClicked) return;

            this.trigger('clicked');
            
            this.isClicked = true;
            app.navigation.hide();

            this.getTargetData(e);
            this.setScrollEvent(false);

            this.setupScroll();
        },

        getTargetData : function(e) {
            this.item = e.currentTarget;
            var backgroundImage = this.item.querySelector('.project-item-thumb').style.backgroundImage;

            this.imageUrl = backgroundImage.slice(4, -1).replace(/"/g, "");

            this.item.classList.add('selected');
            this.slug = this.item.getAttribute('data-slug');
        },

        setupScroll : function() {
            var scrollTarget = this.getScrollPosition(this.item);
            var maxScroll = this.getMaxScroll();
            var scrollData = {
                top : this.$application.scrollTop()
            };

            if(scrollTarget > maxScroll) {
                scrollTarget = maxScroll;
            }
            this.overlayElement.style.width = this.$application[0].clientWidth + 'px';
            this.$application[0].appendChild(this.overlayElement);


            this.animateScroll(scrollTarget, scrollData);
        },

        getScrollPosition : function() {
            var box = this.item.getBoundingClientRect();
            var bodyOffset = this.$application.offset();

            return Math.round(box.top + this.$application.scrollTop() - bodyOffset.top);
        },

        getMaxScroll : function() {
            return Math.max(this.$application.prop('scrollHeight')) - this.viewPort.clientHeight;
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
            //window.scroll(0, scrollData.top);
            this.$application[0].scrollTop = scrollData.top;
        },


        scrollCompleteHandler : function() {
            this.loadHeader();
        },










        //HERE STARTS ASTRONOMY

        loadHeader : function() {
            this.headerImage = new Image();
            this.headerImage.className = 'overlay-item-thumb smart-object';
            this.headerImage.src = this.imageUrl;

            this.headerImage.onload = this.setupHeaderAnimation;
        },

        setupHeaderAnimation : function() {
            this.overlayContainer = this.$body[0].querySelector('.project-overlay');
            //this.overlayContainer.style.width = this.$application[0].clientWidth + 'px';
            this.overlayImage = this.overlayContainer.querySelector('.overlay-item');
            this.overlayContainer.style.display = 'block';

            var backgroundData = this.getHeaderImageSize(this.headerImage);
            var scale = this.getScale(backgroundData);

            this.overlayImage.appendChild(this.headerImage);


            this.setOverlayItem(backgroundData);

            this.animateHeader(scale);
        },

        getHeaderImageSize : function(image) {
            //var dataSize = this.overlayContainer.getBoundingClientRect();
            this.viewPort = {clientWidth:this.$application[0].clientWidth, clientHeight:this.viewPort.clientHeight, kees:'koking'};
            var ratio = image.width / image.height;
            var viewWidth = this.viewPort.clientWidth;// = dataSize.width;
            var viewHeight = this.viewPort.clientHeight;// = dataSize.height;

            var stretch = (viewWidth / viewHeight > ratio ) ? 'width' : 'height';

            if(/*this.viewPort.clientWidth / (this.viewPort.clientWidth / 1.5) <= ratio*/ true) {
                return {
                    height:viewHeight ,
                    width:(viewHeight / image.height) * image.width,
                    cover : 'height',
                    stretchTo : stretch
                }
            }else {
                return {
                    
                    width:viewWidth,
                    height: (viewWidth / image.width) * image.height,
                    cover : 'width',
                    stretchTo : stretch
                }
            }
        },

        getScale : function(scaleData) {
            console.log(this.viewPort);
            if(scaleData.stretchTo == 'width') {
                return this.viewPort.clientWidth / scaleData.width;
            } else {
                return this.viewPort.clientHeight / scaleData.height;
            }
        },


        setOverlayItem : function(bgSize) {
            var data = this.item.getBoundingClientRect();
            var viewWidth = this.viewPort.clientWidth;
            var viewHeight = this.viewPort.clientHeight;

            var scales = {
                x:(data.width / viewWidth),
                y:(data.height / viewHeight)
            };

            TweenMax.set(this.overlayImage, {
                x:data.left,
                y:data.top,
                width:viewWidth,
                height:viewHeight,
                scaleX: scales.x,
                scaleY: scales.y
            });


            TweenMax.set(this.headerImage, {
                width:bgSize.width + 'px',
                height:bgSize.height + 'px',
                top:'50%',
                left:'50%',
                x: '-50%',
                y: '-50%'
            });


            var scaleData = this.getItemImageSize(scales, bgSize);

            TweenMax.set(this.headerImage, {
                scaleX : scaleData.x,
                scaleY : scaleData.y
            });

        },

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

        animateHeader: function(scale) {
            var line = new TimelineMax();

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

        handleTransitionCompleted : function(e) {
            //window.scroll(0, 0);
            //this.$application[0].scrollTop = 0;
            this.setScrollEvent(true);
            app.router.navigate('/cases/' + this.slug, {trigger: true});
            app.navigation.show();
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