/**
 * @author Danielo Fleming <connect@danielofleming.nl>
 */
define([
	'backbone',
	'underscore'
], function(Backbone, _){

	/**
	 * @extends Backbone.View
	 * @constructor {Object} options - passed options
	 */
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

	/**
	 * @constant animation time value in seconds
	 */
	FadeInComponent.prototype.ANIMATION_TIME = 1;

	/**
	 * Hide element in the view by adding hide classname
	 * 
	 * @function setupTransition
	 * 
	 * @param {HTMLElement} element - Target element to hide.
	 */
	FadeInComponent.prototype.setupTransition = function(element) {
		element.classList.add('hide');
	};

	/**
	 * Link the this.update function to the TweenMax tick event
	 * @function addEvents
	 */
	FadeInComponent.prototype.addEvents = function() {
		TweenMax.ticker.addEventListener('tick', this.update);
	};

	/**
	 * This is executed on every RAF
	 * @function update
	 */
	FadeInComponent.prototype.update = function() {
		this.checkIfVisible();
        //this.checkMaxScroll();
	};

	/**
	 * @deprecated Check to find out if scroll has reached maxed.
	 * We are not useing this anymore and this needs to be removed
	 * 
	 * @function checkMaxScroll
	 */
	FadeInComponent.prototype.checkMaxScroll = function() {
    	var docElement = document.documentElement;
        var maxScrollHeight = docElement.scrollHeight - docElement.clientHeight;
        var currentScrollPositionY = window.pageYOffset;

        if(maxScrollHeight === currentScrollPositionY) {
            //this.showAll = true;
        }
    };

	/**
	 * Check if the Element is withing the bound of the view
	 * @function checkIfVisible
	 */
	FadeInComponent.prototype.checkIfVisible = function() {
		var i = 0, arrayLength = this.sections.length;
		
		if(arrayLength <= 0 ) {
			this.terminate();
		}

		for(i; i < arrayLength; i++) {
			var section = this.sections[i];

			if((this.showAll && section) || (section && this.isVisible(section) ) ) {
				this.showElements(section);
				this.sections.splice(i, 1);
			}
		}
	};

	/**
	 * Show the element by setting the data-visibity to true
	 * @function showElements
	 * @param {HTMLElement} section - the section containing the elements to show
	 */
	FadeInComponent.prototype.showElements = function(section) {
		var elements = section.querySelectorAll('[data-delay]');

		section.setAttribute('data-visible', true);

		_.each(elements, this.fadeInElement);
	};
	
	/**
	 * Check if the element is in view
	 * @function isVisible
	 * @param {HTMLElement} element - The section containing the elements
	 * @return {bool} true|false
	 */
	FadeInComponent.prototype.isVisible = function(element) {
		var bounds = element.getBoundingClientRect();
		var windowHeight = window.innerHeight;

		return (bounds.top * 1.3 < windowHeight || bounds.bottom < windowHeight);
	};

	/**
	 * Create the transition to show the element
	 * @function fadeInElement
	 * @param {HTMLElement} element - element to show
	 */
	FadeInComponent.prototype.fadeInElement = function(element) {
		if(TweenMax.isTweening(element)) return false;

		var delayTime = element.getAttribute('data-delay') || 0;

		element.style.transitionDelay = delayTime + 's';
		element.classList.remove('hide');

		element.addEventListener("transitionend", this.removeTransformValues);
	};

	/**
	 * When the transition has ended, remove events and attributes
	 * @function removeTransformValues
	 * @param {Event} event - transition Animation event
	 */
	FadeInComponent.prototype.removeTransformValues = function(event) {
		var element = event.currentTarget;

		element.style.transitionDelay = '';
		element.removeAttribute('data-delay');
		element.removeEventListener("transitionend", this.removeTransformValues);
	}

	/**
	 * Terminate the TweenMax tick event
	 * @function terminate
	 */
	FadeInComponent.prototype.terminate = function() {
		TweenMax.ticker.removeEventListener('tick', this.update);
	};

	/**
	 * remove stored HTMLElements from arrays
	 * @function close
	 */
	FadeInComponent.prototype.close = function() {
		this.sections = this.elements = [];
	};

	return FadeInComponent;

});