(function() {
    NS('game.library.Class');

    var Class = function () {};

    Class.extend = function extend (props) {
        var fn = props.constructor;

        if (typeof fn !== 'function') {
            throw new ClassConstructorException();
        }

        fn.prototype = this.prototype;
        fn.prototype = Object.create(this.prototype);
        fn.extend = extend;

        for (var key in props) {
            if (props.hasOwnProperty(key)) {
                fn.prototype[key] = props[key];
            }
        }

        return fn;
    };

    var ClassConstructorException = function() {
        this.message = 'Invalid constructor provided. Constructor must be of type "function"';
        this.name = 'ClassConstructorException';
    };

    game.library.Class = Class;
})();