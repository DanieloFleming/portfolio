define([
    'jquery',
    'underscore',
    'app/views/BaseView',
], function($, _, BaseView) {

    return  BaseView.extend({
        id: 'splash-screen',

        className : 'splash-screen',
        
        templateName : '#splash-screen',

        ui : {
            paths : '.path',
            logo : '.logo',
            text : '.rep'
        },

        onInitialize : function() {
            _.bindAll(this, 'setStrokeLength', 'handleAnimationCompleted');
        },

        initialized : function () {
            _.map(this.ui.paths, this.setStrokeLength);

            this.createTimeLine();
            this.animation.play();
        },

        setStrokeLength : function(path) {
            var strokeLength = path.getTotalLength();

            path.style.strokeDasharray = strokeLength;
            path.style.strokeDashoffset = strokeLength;
        },

        createTimeLine : function() {
            var strokeD = this.ui.paths[0];
            var strokeF = this.ui.paths[1];

            this.animation = new TimelineMax({
                onComplete : this.handleAnimationCompleted
            });

            this.animation.set(this.ui.paths, {stroke:'#fff', opacity:0})
            .set(this.ui.text, {opacity:0})
            .to(this.ui.paths, 3, {strokeDashoffset : 0})
            .to(this.ui.paths, 1, {opacity:1}, 0)
            .to(this.ui.paths, 2, {fill:'#fff',  strokeWidth:0, ease: Power2.easeInOut}, '-=2')
            .to(this.ui.paths, 2, {fill:'#222', ease: Power2.easeInOut})
            .to(this.el, 2, {backgroundColor:'#fff', ease: Power2.easeInOut}, '-=2')
            .to(this.ui.text, 2, {y:'+=30', opacity:1, ease:Power4.easeOut}, '-=1.5')
            .to(strokeD, 1, {x:'-=300', y:'+=200', ease: Power2.easeInOut})
            .to(strokeF, 1, {x:'+=300', y: '-=200', ease: Power2.easeInOut}, '-=1')
            .to(this.ui.logo, 1, {opacity:0, ease: Power2.easeInOut}, '-=1')
            .timeScale(1.2);

        },

        handleAnimationCompleted : function() {
            this.trigger('completed');
        },

        onClose : function() {
            this.animation.kill();
        }
    });

});