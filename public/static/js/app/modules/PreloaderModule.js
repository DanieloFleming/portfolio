/**
 * @author Danielo Fleming <connect@danielofleming.nl>
 */
define([
    'underscore',
    'jquery',
    'app/utils/ImageLoader'
], function(_, $, ImageLoader) {

    /**
     * @constructor
     */
    var HeaderLoaderModule = function () {
        this.loaders = [];
        this.items = 0;
        this.bytes = 0;
        this.progress = 0;
        this.bytesLoaded = 0;
        this.bytesChecked = false;
        this.key = "header";
    };

    /**
     * Prepare collection for iteration for loading images
     * @function load
     * @param {Backbone.Collection} collection - collection of models
     * @param {string} key - default|header. Key name of the location where url should be taken from 
     */
    HeaderLoaderModule.prototype.load = function(collection, key) {
        this.collection = collection;
        this.key = key || "header";

        _.each(this.collection.models, this._loadImages, this);
    };

    /**
     * Load the images with the provided url from the model
     * @function _loadImages
     * @param {Backbone.Model} model - model
     */
    HeaderLoaderModule.prototype._loadImages = function(model) {

        var loader = new ImageLoader(model.get(this.key));

            loader.onLoadStart(this._checkFileSize.bind(this));

            loader.onProgressChanged(this._updateLoadProgress.bind(this));

            loader.onLoadCompleted(function(data){
                model.set("image", data.image);
            });

        this.loaders.push(loader);
    };

    /**
     * Get the total sizes of bytes to load. This is updated for every images
     * loaded until we have the size of all images combined
     * @function _checkFileSize
     * @param {int} filesize - size of the file
     */
    HeaderLoaderModule.prototype._checkFileSize = function(filesize) {
        this.bytes += filesize;
        this.items++;

        if(this.items == this.loaders.length) {
            this.bytesChecked = true;
        }
    };

    /**
     * Executed everytime more bytes of the image is loaded. Store the amounts
     * of current bytes loaded and total bytes loaded.
     * @function _updateLoadProgress
     */
    HeaderLoaderModule.prototype._updateLoadProgress = function() {
        var value = 0;

        _.each(this.loaders, function(obj){
            value += obj.bytesLoaded;
        });

        this.bytesLoaded = value;

        this.progress = (this.bytesChecked) ?
            Math.floor((this.bytesLoaded / this.bytes) * 100) : 0;

        if(this._onChanged) this._onChanged(this.progress);
    };

    /**
     * callback fire when onProgressChanged is fired
     * @function onProgressChanged
     */
    HeaderLoaderModule.prototype.onProgressChanged = function(callback) {
        this._onChanged = callback;
    };

    /**
     * When module is closed. clean everything up
     * @function close
     */
    HeaderLoaderModule.prototype.close = function() {
        this.loaders  = this.key = this.collection = null;
        this.items = this.bytes = this.progress = this.bytesLoaded = null;
        this._onChanged = this._onCompleted = null;
    };

    return HeaderLoaderModule;
});