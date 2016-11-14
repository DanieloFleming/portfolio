define([
    'jquery',
    'backbone'
], function($, Backbone){
   return (function($, Backbone){
       var currentView;
       var applicationView = "#application";
       var region = {};

       var closeView = function (view) {
           if(view && view.close) {
               view.close();
           }
       };

       var openView = function(view) {
           view.render();

           $(applicationView).html(view.el);

           $('.project-overlay').remove();

           if(view.onShow) {
               view.onShow();
           }
       };

       region.show = function(view) {
           closeView(currentView);
           openView(view);

           currentView = view;
       };

       return region;

   })($, Backbone);
});