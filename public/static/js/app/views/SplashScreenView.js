/**
 * @author Danielo Fleming <connect@danielofleming.nl>
 */
define([
    'jquery',
    'underscore',
    'app/views/BaseView',
    'app/modules/PreloaderModule',
    'app/modules/HeaderResizeModule'
], function ($, _, BaseView, PreloaderModule, HeaderResizeModule) {

    /**
     * @extends BaseView
     */
    return BaseView.extend({
        id: 'splash-screen',
        className: 'splash-screen',
        templateName: '#splash-screen',

        /**
         * This is used for getting the requested HTMLElements
         * within this component and use it the way we want to
         * @type {Object}
         */
        ui: {
            paths: '.path',
            logo: '.logo',
            text: '.rep',
            loader: '.i-loader',
            loadbar: '.i-loadbar',
            outScroll: '.out-scroll',
            inScroll: '.in-scroll'
        },
        /**
         * Here we declare which components need to be loaded
         * for this page it is only on, the other pages have multiple
         * 
         * @type {Object}
         */
        components : {
            headerResize: {
                module : HeaderResizeModule,
                el : 'this'
            }
        },

        /**
         * This is a method executed before we bind the view to the dom
         */
        onInitialize: function () {
            this.ease = Power4.easeInOut;
            
            _.bindAll(this, 
                'setStrokeLength', 
                'handleAnimationCompleted', 
                'handleLoadCompleted', 
                'animateIndicator'
            );
        },

        /**
         * This method is executed after the view is binded to the dom
         */
        initialized: function () {
            /**
             * In order to animate the SVG lines we need to know about the
             * strokeDashArray and offset
             */
            _.map(this.ui.paths, this.setStrokeLength);

            /**
             * this here starts the first part of the whole animation
             */
            this.handlePreLoad();
        },

        /**
         * Calculate the strokeLengts of the SVG and apply
         * these values to the stroke style
         */
        setStrokeLength: function (path) {
            var strokeLength = path.getTotalLength();

            path.style.strokeDasharray = strokeLength;
            path.style.strokeDashoffset = strokeLength;
        },

        /**
         * Create the timeline animation and execute.
         * 
         * @todo This name might need a change
         */
        handlePreLoad: function () {
            /**
             * Set the callback for when this part of the animation 
             * is doen.
             */
            this.preAnimation = new TimelineMax({
                onComplete: this.handleLoadCompleted
            });

            //Long story short -> animate stuff
            this.preAnimation.set(this.ui.paths, {stroke: '#fff', opacity: 0})
                .set(this.ui.text, {opacity: 0})
                .to(this.ui.paths, 3, {strokeDashoffset: 0})
                .to(this.ui.paths, 1, {opacity: 1}, 0)
                .to(this.ui.paths, 2, {fill: '#fff', strokeWidth: 0, ease: Power2.easeInOut}, '-=2')
                .timeScale(1.2);

            this.preAnimation.play();
        },

        /**
         * After the Images or loaded we setup and start the second
         * part of the animation.
         */
        handlePostLoad: function () {
            var strokeD = this.ui.paths[0];
            var strokeF = this.ui.paths[1];

            this.postAnimation = new TimelineMax({
                onComplete: this.handleAnimationCompleted
            });

            this.postAnimation.to(this.ui.paths, 2, {fill: '#222', ease: Power2.easeInOut})
                .to(this.el, 2, {backgroundColor: '#fff', ease: Power2.easeInOut}, '-=2')
                .to(this.ui.text, 2, {y: '+=30', opacity: 1, ease: Power4.easeOut}, '-=1.5')
                .to(strokeD, 1, {x: '-=300', y: '+=200', ease: Back.easeInOut})
                .to(strokeF, 1, {x: '+=300', y: '-=200', ease: Back.easeInOut}, '-=1')
                .to(this.ui.logo, 1, {opacity: 0, ease: Power2.easeInOut}, '-=1')
                .timeScale(1.2);

            this.postAnimation.play();
        },

        /**
         * Call from the outside. Create the preloader with the collection
         * provided.
         * @param {Backbone.Collection} collection collection of models
         */
        setCollection: function (collection) {
            var preLoader = new PreloaderModule();

            preLoader.load(collection);

            /**
             * The callback for when progress changed
             */
            preLoader.onProgressChanged(this.animateIndicator);
        },

        /**
         * Animates the loading bar based on the provided progress value
         * 
         * To make the animation go smooth we give it some milliseconds
         * before it is called again. this gives TweenMax the space to 
         * complete the animation before it is called again.
         * 
         * @param {Function(progress:int)} name description
         * 
         * @todo We should actually make a method for this. now we keep
         * filling the memory with the same function over and over again
         */
        animateIndicator: _.debounce(function (progress) {
            var value = 1.5 * progress - 150;

            TweenMax.to(this.ui.loadbar, 1, {
                x: value, onComplete: function () {
                    if (this.ui.loadbar instanceof HTMLElement
                        && this.ui.loadbar._gsTransform.x == 0) {
                        TweenMax.to(this.ui.loader, 1.25, {
                            scaleX: 0
                        });
                        /**
                         * When everything has done loading basically
                         * continue with the rest of the animation process
                         */
                        this.handleLoadCompleted();
                    }
                }.bind(this),
                ease: Circ.easeInOut
            });

        }, 300),

        /**
         * Handle what needs to be done when preloaded is completed
         */
        handleLoadCompleted: function () {
            if (this.loadCompleted) {
                this.handlePostLoad();
            }

            this.loadCompleted = true;
        },

        /**
         * Handle everything after all animations are completed
         */
        handleAnimationCompleted: function () {
            /**
             * Outside Objects are listening to the completed
             * in order to fire the route navigation.
             * 
             * @fires SplashScreenVuew#completed
             */
            this.trigger('completed');
        },

        /**
         * Because I want to hide the scrollbar. I calculate some stuff 
         * to do so when this components is closed. Not before because
         * this view had no scroll bars to begin with.
         */
        onClose: function () {
            var css = {};
            var scrollbarWidth = this.ui.outScroll.offsetWidth - this.ui.inScroll.offsetWidth;
            app.config.applicationWidth = scrollbarWidth < 15 ? 15 : scrollbarWidth;

            if(app.browser.isAndroid && !app.browser.isChrome) {
                //do nothing
            } else {
                css.width = "calc(100% + " + app.config.applicationWidth + "px)";

                //Dumb Sh!t happends on windows so... ie exceptions
                if(app.browser.os !== 'windows') {
                    css.paddingRight = app.config.applicationWidth + "px";
                }

                $('#application').css(css);
            }

            /**
             * The next 3 things clear all animations
             */
            this.preAnimation.kill();
            this.postAnimation.kill();
            this.ease = null;
        },

        /**
         * Executed when view is bound to dom and is ready to be shown.
         * We override the method in this class to do the following
         */
        onShow : function() {
            /**
             * The other pages have the FadeIn Module which means
             * it is not the page thats fade in but the components.
             * For this page that is all not needed and we just fade
             * the page in.
             */
            TweenMax.to(this.el, .4, {
                opacity:1,
                display:'block',
                clearProps:'display, opacity'
            });
        }
    });
});
