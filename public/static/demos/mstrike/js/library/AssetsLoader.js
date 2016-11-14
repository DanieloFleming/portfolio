(function() {
    NS('game.library.AssetsLoader');

    var AssetsLoader = (function(){
        var _assetsLoaded = 0;
        var _assetCount;
        var _onCompleted;
        var _spriteAssets;
        var _audioAssets;

        /**
         * Load Assets.
         *
         * @param spriteSheet
         * @param AudioBook
         * @param callback
         * @private
         */
        var _loadAssets = function (spriteSheet, AudioBook, callback) {
            _spriteAssets = spriteSheet;
            _audioAssets = AudioBook;

            _assetCount = Object.keys(_spriteAssets).length + Object.keys(_audioAssets).length;
            _onCompleted = callback;

            for (var key in _spriteAssets) {
                if (_spriteAssets.hasOwnProperty(key)) {
                    _loadAsset(_spriteAssets[key], key);
                }
            }

            for (var note in _audioAssets) {
                if (_audioAssets.hasOwnProperty(note)) {
                    _loadAudio(_audioAssets[note], note);
                }
            }
        }

        /**
         * Load sprites.
         *
         * @param value
         * @param key
         * @private
         */
        var _loadAsset = function (value, key) {
            var image = new Image();
                image.src = value.src;

            image.onload = function () {
                _saveAsset(key, image);
            }
        };

        /**
         * Load Audio.
         *
         * @param value
         * @param key
         * @private
         */
        var _loadAudio = function (value, key) {
            var audio = new Audio(value);
            
            audio.oncanplaythrough = function () {
                _audioAssets[key] = audio;
                _assetsLoaded++;

                audio.oncanplaythrough = null;
                _checkAssetsLoader();
            }
        }

        /**
         * Store imageData in SpiteAssetsArray.
         *
         * @param key
         * @param image
         * @private
         */
        var _saveAsset = function (key, image) {
            var asset = _spriteAssets[key];

            asset.image = image;
            asset.width = image.width / asset.frames;
            asset.height = image.height;

            _assetsLoaded++;

            _checkAssetsLoader();
        };

        /**
         * Check if all files are loaded
         *
         * @private
         */
        var _checkAssetsLoader = function () {
            if (_assetsLoaded == _assetCount) {
                _onCompleted(_spriteAssets);
            }
        }

        /**
         * Return all sprite assets.
         *
         * @returns {*}
         * @private
         */
        var _getAllSprites = function () {
            return _spriteAssets;
        }

        /**
         * Return all audio assets.
         *
         * @returns {*}
         * @private
         */
        var _getAllAudio = function () {
            return _audioAssets;
        }

        /**
         * publicly accessible methods.
         */
        return {
            load: _loadAssets,
            getSpriteData: _getAllSprites,
            getAudioData: _getAllAudio
        }
    })();

    game.library.AssetsLoader = AssetsLoader;

})();