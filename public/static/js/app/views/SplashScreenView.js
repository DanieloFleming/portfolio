define([
    'jquery',
    'underscore',
    'app/views/BaseView',
    'app/modules/HeaderLoaderModule'
], function($, _, BaseView, HeaderLoaderModule) {

    return  BaseView.extend({
        id: 'splash-screen',
        className : 'splash-screen',
        templateName : '#splash-screen',

        ui : {
            paths : '.path',
            logo : '.logo',
            text : '.rep',
            loader : '.i-loader',
            loadbar : '.i-loadbar'
        },

        onInitialize : function() {
            _.bindAll(this, 'setStrokeLength', 'handleAnimationCompleted', 'handleLoadCompleted' ,'animateIndicator');
        },

        initialized : function () {
            _.map(this.ui.paths, this.setStrokeLength);
            this.ease = Power4.easeInOut;
            this.handlePreLoad();
        },

        setStrokeLength : function(path) {
            var strokeLength = path.getTotalLength();

            path.style.strokeDasharray = strokeLength;
            path.style.strokeDashoffset = strokeLength;
        },

        handlePreLoad : function() {
            this.preAnimation = new TimelineMax({
                onComplete : this.handleLoadCompleted
            });

            this.preAnimation.set(this.ui.paths, {stroke:'#fff', opacity:0})
            .set(this.ui.text, {opacity:0})
            .to(this.ui.paths, 3, {strokeDashoffset : 0})
            .to(this.ui.paths, 1, {opacity:1}, 0)
            .to(this.ui.paths, 2, {fill:'#fff',  strokeWidth:0, ease: Power2.easeInOut}, '-=2')
            .timeScale(1.2);

            this.preAnimation.play();
        },

        handlePostLoad : function() {
            var strokeD = this.ui.paths[0];
            var strokeF = this.ui.paths[1];

            this.postAnimation = new TimelineMax({
                onComplete : this.handleAnimationCompleted
            });

            this.postAnimation.to(this.ui.paths, 2, {fill:'#222', ease: Power2.easeInOut})
                .to(this.ui.loader, 0, {opacity : .0, ease: Power2.easeInOut}, 0)
                .to(this.el, 2, {backgroundColor:'#fff', ease: Power2.easeInOut}, '-=2')
                .to(this.ui.text, 2, {y:'+=30', opacity:1, ease:Power4.easeOut}, '-=1.5')
                .to(strokeD, 1, {x:'-=300', y:'+=200', ease: Back.easeInOut})
                .to(strokeF, 1, {x:'+=300', y: '-=200', ease: Back.easeInOut}, '-=1')
                .to(this.ui.logo, 1, {opacity:0, ease: Power2.easeInOut}, '-=1')
                .timeScale(1.2);

            this.postAnimation.play();
        },

        setCollection: function(collection) {
            var preloader = new HeaderLoaderModule();
                preloader.load(collection);
                preloader.onProgressChanged(this.animateIndicator)
        },

        animateIndicator : function(progress) {
            var value = 1.5 * progress - 150;

            TweenMax.set(this.ui.loadbar, {
                x : value
            });

            if(progress == 100) {
                this.handleLoadCompleted();
            }
        },

        handleLoadCompleted : function() {
            if(this.loadCompleted) {
                this.handlePostLoad();
            }

            this.loadCompleted = true;
        },

        handleAnimationCompleted : function() {
            this.trigger('completed');
        },

        onClose : function() {
            this.preAnimation.kill();
            this.postAnimation.kill();
        }
    });

});
