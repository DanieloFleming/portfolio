define([
	'underscore',
	'app/components/VideoComponent'
], function(_, VideoComponent){

	var componentTypes = {
		'video' : VideoComponent
	};

	var ComponentLoader = {
		
		componentArray : [],

		load : function(elements) {
			if(!elements.length && this._validHtml(elements)) {
				elements = [elements];
			} else if (!elements.length && !this._validHtml(elements)) {
				return false;
			}

			_.each(elements, this._loadModule, this);
		},

		_loadModule : function(value) {
			var type = value.getAttribute('data-component');

			if(! componentTypes[type]) {
				if(window.console) {
					console.log('invalid type Exception');
				}
			}

			this.componentArray.push(new componentTypes[type]({el:value}));
		},

		_validHtml : function(element) {
			return element instanceof Element;
		},

		close : function() {
			_.each(this.componentArray, this._closeComponent);
			this.componentArray = [];
		},

		_closeComponent : function(component) {
			component.close();
		}
	};

	return ComponentLoader;
});