define([
    'underscore',
    'jquery',
    'app/utils/ImageLoader'
], function(_, $, ImageLoader) {

    var HeaderLoaderModule = function () {
        this.loaders = [];
        this.items = 0;
        this.bytes = 0;
        this.progress = 0;
        this.bytesLoaded = 0;
        this.bytesChecked = false;
        this.key = "header";
    };

    HeaderLoaderModule.prototype.load = function(collection, key) {
        this.collection = collection;
        this.key = key || "header";

        _.each(this.collection.models, this._loadImages, this);
    };

    HeaderLoaderModule.prototype._loadImages = function(model) {

        var loader = new ImageLoader(model.get(this.key));

            loader.onLoadStart(this._checkFileSize.bind(this));

            loader.onProgressChanged(this._updateLoadProgress.bind(this));

            loader.onLoadCompleted(function(data){
                model.set("image", data.image);
            });

        this.loaders.push(loader);
    };

    HeaderLoaderModule.prototype._checkFileSize = function(filesize) {
        this.bytes += filesize;
        this.items++;

        if(this.items == this.loaders.length) {
            this.bytesChecked = true;
        }
    };

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

    HeaderLoaderModule.prototype.onProgressChanged = function(callback) {
        this._onChanged = callback;
    };

    HeaderLoaderModule.prototype.close = function() {
        this.loaders  = this.key = this.collection = null;
        this.items = this.bytes = this.progress = this.bytesLoaded = null;
        this._onChanged = this._onCompleted = null;
    };

    return HeaderLoaderModule;
});