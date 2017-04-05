define([
], function(){

	var TemplateManager = (function(){
		var templateCache = {};
		var slugs = {};

		var getTemplates = function(models) {
			_.each(models, _getTemplateId);
		};

		var _getTemplateId = function(model) {
			var slug = model.get('slug');

			var templateId = ($('#' + slug).length !== 0) ? '#' + slug : '#project-overview';

			slugs[slug] = templateId;

			if(! templateCache[templateId] ) {
				templateCache[templateId] = _.template($(templateId).html());
				$(templateId).remove();
			}
		};

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