<!DOCTYPE html>
<html>
    <head>
        <script src="/static/js/vendor/underscore-1.8.3.js"></script>
        <script src="/static/js/vendor/tweenmax.js"></script>

        <style>
            progress {
                width:100%;
                height:40px;
                border: 1px solid #0063a6;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25)
            }
            progress::-webkit-progress-bar { background: #fff; }
            progress::-webkit-progress-value { background: #0063a6; }
        </style>
    </head>
    <body>

    <progress value="0" max="100"></progress>
    <script>

        (function(){

            var progress = document.querySelector('progress');
            var data = [
                {header : "/static/img/backgrounds/destruction.jpg"},
                {header : "/static/img/backgrounds/hd_background.jpg"},
                {header : "/static/img/backgrounds/maps.png"},
            ];

            function init()
            {
                p = new Preloader();
                p.load(data);
                p.onProgressChanged(function(value) {
                    TweenMax.to(progress, .3, {
                        value : value
                    });
                });
            }
            var Preloader = function () {
                this.data = null;
                this.items = 0;
                this.bytes = 0;
                this.progress = 0;
                this.bytesLoaded = 0;
                this.key = "header";
                this.loaders = [];
            };

            Preloader.prototype.load = function(array, key) {
                this.data = array;
                this.key = key || "header";

                _.each(array, this._checkFileSize, this);
            };

            Preloader.prototype._checkFileSize = function(obj) {
                var request = new XMLHttpRequest();
                    request.open("HEAD", obj[this.key], true);

                request.onload = this._loadCompleted.bind(this);
                request.onreadystatechange = function() {
                    if(request.readyState == request.DONE) {
                        if (request.status === 200) {
                            this.bytes += Number(request.getResponseHeader('content-length'));
                        }
                    }
                }.bind(this);

                request.send(null);
            };

            Preloader.prototype._loadCompleted = function(e) {
                this.items++;

                if(this.items == this.data.length) {
                    _.each(this.data, this._loadImages, this)
                }
            };

            Preloader.prototype._loadImages = function(obj) {
                var loader = new ImageLoader(obj[this.key]);
                    loader.onProgressChanged(this._updateLoadProgress.bind(this));

                this.loaders.push(loader);
            };

            Preloader.prototype._updateLoadProgress = function() {
                var value = 0;

                _.each(this.loaders, function(obj){
                    value += obj.bytesLoaded;
                });

                this.bytesLoaded = value;

                this.progress = (Math.floor((this.bytesLoaded / this.bytes) * 100));

                if(this._onChanged) this._onChanged(this.progress);
            };

            Preloader.prototype.onProgressChanged = function(callback) {
                this._onChanged = callback;
            };

            var ImageLoader = function(url) {
                this.progress = 0;
                this.bytesLoaded = 0;
                this.onChange = null;
                this.onCompleted = null;

                var request = new XMLHttpRequest();
                request.addEventListener("progress", this._handleProgress.bind(this));
                request.addEventListener("load", this._loadCompleted);
                request.open("GET", url, true);
                request.send(null);
            };

            ImageLoader.prototype._handleProgress = function(e) {
                if(e.lengthComputable) {
                    this.progress = e.loaded / e.total;
                    this.bytesLoaded = e.loaded;

                    if(this.onChange) this.onChange ({
                        progress : this.progress,
                        bytesLoaded : this.bytesLoaded,
                        totalBytes : e.total
                    });
                }
            };

            ImageLoader.prototype._loadCompleted = function(e) {
                this.progress = 1;
                this.bytesLoaded = e.total;

                if(this.onCompleted) this.onCompleted ({
                    progress : this.progress,
                    bytesLoaded : e.total,
                    totalBytes : e.total
                });
            };

            ImageLoader.prototype.onProgressChanged = function(callback) {
                this.onChange = callback;
            };

            ImageLoader.prototype.onLoadCompleted = function(callback) {
                this.onCompleted = callback;
            };

            init();
        })();
    </script>
    </body>
</html>