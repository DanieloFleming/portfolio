define([
    'app/views/HomePageView',
    'app/views/AboutPageView',
    'app/views/ProjectsPageView',
    'app/views/ProjectInfoPageView',
    'app/views/ContactPageView',
    'app/views/Page404'
], function(HomePage, AboutPage, ProjectPage, ProjectInfoPage, ContactPage, Page404){
    //TODO : We should remove this. Really... this idea... needs to be reviewd
    return (function(){
        var views =  [
            HomePage,
            AboutPage,
            ProjectPage,
            ProjectInfoPage,
            ContactPage,
            Page404
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
            VIEW_404        : 5,
        };
    })();
});