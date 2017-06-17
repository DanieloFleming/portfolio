define([
], function(){

	/**
	 * Handles the storing of templates and remove the source from the dom.
	 */
	var TemplateManager = (function(){
		var templateCache = {};
		var slugs = {};

		/**
		 * Get the templates of each induvidual model.
		 * 
		 * @param {Collection} models 
		 */
		var getTemplates = function(models) {
			_.each(models, _getTemplateId);
		};

		/**
		 * store the template in the templateCache with the 
		 * slug as key and remove the source from the dom
		 * 
		 * @param {Model} model 
		 */
		var _getTemplateId = function(model) {
			var slug = model.get('slug');

			var templateId = ($('#' + slug).length !== 0) ? '#' + slug : '#project-overview';

			slugs[slug] = templateId;

			if(! templateCache[templateId] ) {
				templateCache[templateId] = _.template($(templateId).html());
				$(templateId).remove();
			}
		};

		/**
		 * Get the template corresponding with the provided key
		 * @param {String} slug 
		 */
		var get = function(slug) {
			return templateCache[slugs[slug]];
		};

		/**
		 * Make methods publicly accessable.
		 */
		return {
			cacheTemplates : getTemplates,
			get : get
		};
	});

	return new TemplateManager();
});