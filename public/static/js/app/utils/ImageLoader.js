/**
 * @author Danielo Fleming <connect@danielofleming.nl>
 */
define([
    'underscore',
    'jquery'
], function(_, $){
    /**
     * Handles the loading of images
     * 
     * @param {String} url 
     */
    var ImageLoader = function(url) {
        this.progress = 0;
        this.bytesLoaded = 0;
        this.filesize = 0;
        this.onChange = null;
        this.onCompleted = null;
        this.onStart = null;

        this.request = new XMLHttpRequest();
        this.request.open("GET", url, true);
        this.request.responseType = "blob";
        this.request.addEventListener("progress", this._handleProgress.bind(this));
        this.request.addEventListener("load", this._loadCompleted.bind(this));

        this.request.send(null);
    };

    /**
     * Handle the load progress
     * 
     * @function _handleProgress
     * @param {Event} e - ProgressEvent
     * 
     * @todo Note: When using a vpn (like opera's buildin vpn)we were not 
     * able to get e.lengthComputable. In this case we'll just wait
     * for the loader to be completed and show 0 in the meanwhile, but fixes this
     */
    ImageLoader.prototype._handleProgress = function(e) {
        if(e.lengthComputable) {
            this.progress = e.loaded / e.total;
            this.bytesLoaded = e.loaded;

            if(this.filesize === 0) {
                this.filesize = e.total;
                if(this.onStart) this.onStart(this.filesize);
            }
            if(this.onChange && this.filesize !== 0) this.onChange ({
                progress : this.progress,
                bytesLoaded : this.bytesLoaded,
                totalBytes : e.total
            });
        } else {
            if(this.onStart) this.onStart(0);

            if(this.onChange) this.onChange ({
                progress : this.progress,
                bytesLoaded : this.bytesLoaded,
                totalBytes : e.total
            });
        }
    };

    /**
     * Handle when load is completed. 
     * - removing events 
     * - set image data
     * - execute callback
     * 
     * @function _loadCompleted
     * @param {Event} e - LoadEvent
     */
    ImageLoader.prototype._loadCompleted = function(e) {
        this.progress = 1;
        this.bytesLoaded = e.total;

        var data = {
            progress : this.progress,
            bytesLoaded : e.total,
            totalBytes : e.total
        };

        this.request.removeEventListener("progress", this._handleProgress.bind(this));
        this.request.removeEventListener("load", this._loadCompleted.bind(this));

        data.image = this._handleResponseData(this.request.response);

        if(this.onCompleted) this.onCompleted (data);
    };

    /**
     * Set the url for the Image object.
     * 
     * @function _handleResponseData
     */
    ImageLoader.prototype._handleResponseData = function(response) {
        var imageDataUrl = window.URL.createObjectURL(response);
        var image = new Image();

        image.load = function() {
            window.webkitURL.revokeObjectURL(imageDataUrl);
        };

        image.src = imageDataUrl;

        return image;
    };

    /**
     * Exectute callback when onLoadStart is fired
     * 
     * @func onLoadStart
     * @param {Function} callback - callback method
     */
    ImageLoader.prototype.onLoadStart = function(callback) {this.onStart = callback};

    /**
     * Exectute callback when onProgressChanged is fired
     * 
     * @func onProgressChanged
     * @param {Function} callback - callback method
     */
    ImageLoader.prototype.onProgressChanged = function(callback) {this.onChange = callback};

    /**
     * Exectute callback when onLoadCompleted is fired
     * 
     * @func onLoadCompleted
     * @param {Function} callback - callback method
     */
    ImageLoader.prototype.onLoadCompleted = function(callback) {this.onCompleted = callback};

    return ImageLoader;
});