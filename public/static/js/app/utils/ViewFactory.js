define([
    'app/views/HomePageView',
    'app/views/AboutPageView',
    'app/views/ProjectsPageView',
    'app/views/ProjectInfoPageView',
    'app/views/ContactPageView'
], function(HomePage, AboutPage, ProjectPage, ProjectInfoPage, ContactPage){
    return (function(){
        var views =  [
            HomePage,
            AboutPage,
            ProjectPage,
            ProjectInfoPage,
            ContactPage
        ];

        var getView = function get(viewCode, options) {
            var options = options || {};

            if( views[viewCode] ) {
                return new views[viewCode](options);
            }
        };

        return {
            get : getView,

            VIEW_HOME       : 0,
            VIEW_ABOUT      : 1,
            VIEW_PORTFOLIO  : 2,
            VIEW_PROJECT    : 3,
            VIEW_CONTACT    : 4,
        };
    })();
});