define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    return Backbone.View.extend({

        elements : {},

        initialize : function(options) {

            if(this.onInitialize) {
                this.onInitialize(options);
            }

            this.rendered();
        },

        /**
        * Cache ui en components keys.
        */
        _createCache : function() {
            this._viewCache = {
                ui : _.clone(this.ui) || {},
                components : _.clone(this.components) || {}
            };
        },

        /**
         * Executed when view is rendered
         */
        rendered : function() {
            this._setUi();
        
            this.delegateEvents();

            if(this.initialized){
                this.initialized();
            }
        },

        /**
         * Make HtmlElements from ui object
         */
        _setUi : function() {
            if(_.keys(this.ui).length == 0) return;

            _.map(this.ui, function(value, key) {
                this._addUi(key, value);
            }, this);
        },
        
        /**
         * add HTML element to ui object.
         *
         * @param key
         * @param value
         */
        _addUi : function (key, value) {
            var element = this.el.querySelectorAll(value);
        
            this.ui = this.ui || {};

            this.ui[key] = (element.length === 1) ? element[0] : element;
        },

        close : function() {
            if(this.onClose) {
                this.onClose();
            }

            this._unsetUi();

            this.undelegateEvents();
            this.unbind();
            this.remove();
        },

        _unsetUi : function() {
            _.each(this.ui || {}, function(value, key) {
                $(this.ui[key]).empty();
                this.ui[key] = null;
            }, this);

            this.ui = _.clone(this._viewCache.ui);
        }
    });
});