define([
    'underscore',
    'backbone'
], function(_, Backbone){

    return Backbone.View.extend({
        
        className  : 'page',

        initialize : function(options) {
            this._createCache();

            if(this.onInitialize) {
                this.onInitialize(options);
            }

            if(this.templateName) {
                this._setTemplate(this.templateName);
                $(this.templateName).remove();
            }
        },

        _setTemplate : function(template) {
            this.template = _.template($(template).html(), this.templateOptions || {});
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
         * Render html from template
         */
        render : function() {
            TweenMax.set(this.el, {
                opacity:0,
                display:'none'
            });

            window.scroll(0, 0);

            $('#application')[0].scrollTop = 0;

            this.$el.html(this.template(this.templateVars));

            this.once('render', this._rendered);

            this.trigger('render');
        },

        /**
         * show template content.
         */
        onShow : function() {
            TweenMax.to(this.el, 0, {
                opacity:1,
                display:'block',
                clearProps:'all'
            });
        },

        /**
         * Executed when view is rendered
         */
        _rendered : function() {
            this._setUi();
            this._setComponents();
        
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

            _.each(this._viewCache.ui, this._addUi, this);
        },
        
        /**
         * add HTML element to ui object.
         *
         * @param {String} value
         * @param {String} key
         */
        _addUi : function (value, key) {
            var element = this.el.querySelectorAll(value);
        
            this.ui = this.ui || {};

            this.ui[key] = (element.length === 1) ? element[0] : element;
        },

        /**
         * Make modules from component object
         */
        _setComponents : function() {
            _.each(this._viewCache.components, this._addComponent, this);
        },
        
        /**
         * Add module to compoents object.
         * 
         * @param {object} obj
         * @param {String} key
         */
        _addComponent : function(obj, key) {
            var options = obj.options || {};

            if(obj.el) {
                if(obj.el == 'this') {
                    options.el = this.el;
                } else {
                    options.el = (obj.el instanceof Element) ? obj.el : this.el.querySelectorAll(obj.el); 
                }
            }
            
            this.components = this.components || {};
            this.components[key] = new obj.module(options);
        },

        /**
         * Handle close
         */
        close : function() {
            if(this.onClose) {
                this.onClose();
            }

            this._unsetUi();
            this._unsetComponents();

            this.undelegateEvents();
            this.remove();
            this.unbind();
        },

        /**
         * Remove cached elements from the view and remove references
         */
        _unsetUi : function() {
            _.each(this.ui, function(value, key) {

                $(this.ui[key]).empty();
                
                this.ui[key] = null;
            }, this);

            this.ui = _.clone(this._viewCache.ui);
        },

        /**
         * Destroy components and remove references
         */
        _unsetComponents : function() {
            _.each(this.components, function(value, key) {
                this.components[key].close();
                this.components[key] = null;
            }, this);

            this.components = _.clone(this._viewCache.components);
        }
    });
});