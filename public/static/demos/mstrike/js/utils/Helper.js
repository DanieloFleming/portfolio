(function(){
    var _o = (function() {
        var _each = function (value, callback, scope) {

            if (_isArray(value)) {
                _eachArray(value, callback, scope);
            } else {
                _eachObject(value, callback, scope);
            }
        };

        var _eachArray = function (arr, callback, scope) {
            for (var i = 0; i < arr.length; i++) {
                _doCallBack(arr[i], i, callback, scope);
            }
        };

        var _eachObject = function (obj, callback, scope) {
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    _doCallBack(obj[key], key, callback, scope);
                }
            }
        };

        var _doCallBack = function (value, index, callback, scope) {
            if (typeof callback === 'function') {
                if (scope) callback.call(scope, value, index);
               else  callback(value, index);
            }
        };

        var _isArray = function(value) {
            return value instanceof Array || (value.length);
        };

        return {
            each : _each,
            isArray : _isArray
        }
    })();

    _ = window._ || _o;

})();