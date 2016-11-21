define([
    'underscore',
    'jquery'
], function(_, $){
    var ImageLoader = function(url) {
        this.progress = 0;
        this.bytesLoaded = 0;
        this.filesize = 0;
        this.onChange = null;
        this.onCompleted = null;
        this.onStart = null;

        this.request = new XMLHttpRequest();
        this.request.responseType = "blob";
        this.request.addEventListener("progress", this._handleProgress.bind(this));
        this.request.addEventListener("load", this._loadCompleted.bind(this));
        this.request.open("GET", url, true);
        this.request.send(null);
    };

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
        }
    };

    ImageLoader.prototype._loadCompleted = function(e) {
        this.progress = 1;
        this.bytesLoaded = e.total;

        var data = {
            progress : this.progress,
            bytesLoaded : e.total,
            totalBytes : e.total
        };

        data.image = this._handleResponseData(this.request.response);

        if(this.onCompleted) this.onCompleted (data);
    };

    ImageLoader.prototype._handleResponseData = function(response) {
        var imageDataUrl = window.URL.createObjectURL(response);
        var image = new Image();

        image.load = function() {
            window.webkitURL.revokeObjectURL(imageDataUrl);
        };

        image.src = imageDataUrl;

        return image;
    };

    ImageLoader.prototype.onLoadStart = function(callback) {
        this.onStart = callback;
    };
    ImageLoader.prototype.onProgressChanged = function(callback) {
        this.onChange = callback;
    };

    ImageLoader.prototype.onLoadCompleted = function(callback) {
        this.onCompleted = callback;
    };

    return ImageLoader;
});