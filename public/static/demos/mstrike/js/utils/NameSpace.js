(function() {
    game = window.game || {};


    var _namespaceMaker = function (namespace, fn) {

        var names = namespace.split('.'),
            base = game,
            maxIndex = names.length - 1, i = 0;

        if (names[0] == 'game') {
            names = names.slice(1);
        }


        for (i; i < maxIndex; i++) {
            if (typeof base[names[i]] == 'undefined') {
                base[names[i]] = {};
            }

            base = base[names[i]];
        }

    };

    NS = window.NS || _namespaceMaker;
})();