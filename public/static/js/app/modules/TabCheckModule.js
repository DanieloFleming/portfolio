define([], function(){

    (function(){

        var prefix = typeof document.hidden == "undefined" ? "ms" : '',
            visibilityChangeEvent = prefix + 'visibilitychange',
            hiddenEvent = prefix + "hidden",
            messageActive = "welcome back @ danielo.nl",
            messageInactive = ":( come back ";

        /**
         * Add eventlistener to dom
         * 
         */
        function initialize() {
            document.addEventListener(visibilityChangeEvent, handleDocumentTitleChange);
        }

        /**
         * Change the title depending on the activity of the tab/window 
         * the site is currently running in.
         * 
         */
        function handleDocumentTitleChange() {
            var hidden = prefix + "hidden";
            
            if(document[hidden]) {
                document.title = messageInactive;
            } else {
                document.title = messageActive;
            }
        }

        initialize();
    })()

});