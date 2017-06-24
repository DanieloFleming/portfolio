define([
], function(){

	var TemplateManager = (function(){
		var templateCache = {};
		var slugs = {};

		/**
		 * Get templates.
		 * 
		 * @param {Array[Backbone.Models]} models 
		 */
		var getTemplates = function(models) {
			_.each(models, _storeTemplateId);
		};

		/**
		 * Retreive the temlatename or templateId.
		 * 
		 * @param {Backbone.Model} model 
		 */
		var _storeTemplateId = function(model) {
			var slug = model.get('slug'),
				templateId = ($('#' + slug).length !== 0) ? '#' + slug : '#project-overview';

			slugs[slug] = templateId;

			if(! templateCache[templateId] ) {
				_cacheTemplate(templateId);
			}
		};

		/**
		 * Cache the template and remove template source from the dom.
		 * 
		 * @param {String} templateId 
		 */
		var _cacheTemplate = function(templateId) {
			templateCache[templateId] = _.template($(templateId).html());

			$(templateId).remove();
		}

		/**
		 * Retreive the template associated with the slug.
		 * 
		 * @param {String} slug 
		 */
		var get = function(slug) {
			return templateCache[slugs[slug]];
		};

		return {
			cacheTemplates : getTemplates,
			get : get
		};
	});

	return new TemplateManager();
});