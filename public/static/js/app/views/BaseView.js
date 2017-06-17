/**
 * @author Danielo Fleming <connect@danielofleming.nl>
 */
define([
    'underscore',
    'backbone'
], function(_, Backbone){

    /**
     * @extends Backbone.view
     */
    return Backbone.View.extend({
        
        //tagName    : 'div',
        className  : 'page',
        //components : {},
        //elements   : {},

        //templateName : '<div></div>',
        //templateOptions: {},
        //templateVars   : {},
        //template       : {},


        /**
         * 
         * Backbone's standart initialize method
         * 
         * @param {Object} options - params for the initialize function
         */
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

        /**
         * Create the requested template
         * 
         * @param {String} template - Template content for the view
         */
        _setTemplate : function(template) {
            this.template = _.template($(template).html(), this.templateOptions || {});
        },

        /**
        * Cache ui en components keys. 
        * This is for when we close the view to reset the values
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

            $('#application')[0].scrollTop = -1;

            $(this.el).html(this.template(this.templateVars));

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
            _.map(this._viewCache.ui, function(value, key) {
                this._addUi(key, value);
            }, this);
        },
        
        /**
         * add HTML element to ui object.
         *
         * @param {String} key - Name of the key where value is stored in this.ui object
         * @param {String} value - The className to find within this view and store
         */
        _addUi : function (key, value) {
            var element = this.el.querySelectorAll(value);
        
            this.ui = this.ui || {};

            this.ui[key] = (element.length === 1) ? element[0] : element;
        },

        /**
         * Make modules from component object
         */
        _setComponents : function() {
            _.map(this._viewCache.components, function(value, key){
                this._addComponent(key, value);    
            }, this);
        },
        
        /**
         * Add module to compoents object.
         * 
         * @param {String} key - Name of the key where value is stored in this.components object
         * @param {Object} obj - The object containing the values for creating the component and store
         */
        _addComponent : function(key, obj) {
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
         * Handle close. This is basically the viewDestroyer
         */
        close : function() {
            if(this.onClose) {
                this.onClose();
            }

            this._unsetUi();
            this._unsetComponents();

            //these 3 methods are for backbone to remove the view
            //Unbind the events and remove everything within the view
            this.undelegateEvents();
            this.remove();
            this.unbind();
        },

        /**
         * Unset Html elements from ui and reset to initial state
         */
        _unsetUi : function() {
            _.each(this.ui, function(value, key) {
                $(this.ui[key]).empty();
                this.ui[key] = null;
            }, this);

            this.ui = _.clone(this._viewCache.ui);
        },

        /**
         * Unset the components elements and reset to intial state
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