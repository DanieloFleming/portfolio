define([
	'backbone',
	'underscore'
], function(Backbone, _){

	var FadeInComponent = Backbone.View.extend({

		initialize : function(options) {
			this.sections = Array.prototype.slice.call(this.el.querySelectorAll('.section'));
			this.elements = this.el.querySelectorAll('[data-delay]');
            this.showAll = false;

			_.bindAll(this, 'setupTransition', 'update', 'checkIfVisible', 'isVisible', 'fadeInElement', 'terminate', 'removeTransformValues');

			if(this.elements.length && this.elements.length > 0) {
				_.each(this.elements, this.setupTransition);
				this.addEvents();
			}
		}
	});

	FadeInComponent.prototype.ANIMATION_TIME = 1;

	FadeInComponent.prototype.setupTransition = function(element) {
		element.classList.add('hide');
	};

	FadeInComponent.prototype.addEvents = function() {
		TweenMax.ticker.addEventListener('tick', this.update);
	};

	FadeInComponent.prototype.update = function() {
		this.checkIfVisible();
        this.checkMaxScroll();
	};

	FadeInComponent.prototype.checkMaxScroll = function() {
    	var docElement = document.documentElement;
        var maxScrollHeight = docElement.scrollHeight - docElement.clientHeight;
        var currentScrollPositionY = window.pageYOffset;

        if(maxScrollHeight === currentScrollPositionY) {
            this.showAll = true;
        }
    };

	FadeInComponent.prototype.checkIfVisible = function() {
		var i = 0, arrayLength = this.sections.length;
		
		if(arrayLength <= 0 ) {
			this.terminate();
		}

		for(i; i < arrayLength; i++) {
			var section = this.sections[i];

			if(this.showAll || (section && this.isVisible(section) ) ) {
				this.showElements(section);
				this.sections.splice(i, 1);
			}
		}
	};

	FadeInComponent.prototype.showElements = function(section) {
		var elements = section.querySelectorAll('[data-delay]');
		
		section.dataset.visible = true;

		_.each(elements, this.fadeInElement);
	};
	
	FadeInComponent.prototype.isVisible = function(element) {
		var bounds = element.getBoundingClientRect();
		var windowHeight = window.innerHeight;

		return (bounds.top * 1.3 < windowHeight || bounds.bottom < windowHeight);
	};

	FadeInComponent.prototype.fadeInElement = function(element) {
		if(TweenMax.isTweening(element)) return false;

		var delayTime = element.getAttribute('data-delay') || 0;

		element.style.transitionDelay = delayTime + 's';
		element.classList.remove('hide');

		element.addEventListener("transitionend", this.removeTransformValues);
	};

	FadeInComponent.prototype.removeTransformValues = function(event) {
		var element = event.currentTarget;

		element.style.transitionDelay = '';
		element.removeAttribute('data-delay');
	}

	FadeInComponent.prototype.terminate = function() {
		TweenMax.ticker.removeEventListener('tick', this.update);
	};

	FadeInComponent.prototype.close = function() {
		this.sections = this.elements = [];
	};

	return FadeInComponent;

});