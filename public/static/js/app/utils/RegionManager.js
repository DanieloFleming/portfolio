define([
    'jquery',
    'backbone'
], function($, Backbone){
   return (function($){
       var currentView;
       var applicationView = "#application";
       var region = {};

       /**
        * fire close method on view.
        *
        * @param {BaseView} view 
        */
       var closeView = function (view) {
           if(view && view.close) {
               view.close();
           }
       };

       /**
        * Attach the view to the dom and show it
        *
        * @param {BaseView} view 
        */
       var openView = function(view) {
           view.render();

           $(applicationView).html(view.el);

           $('.project-overlay').remove();

           if(view.onShow) {
               view.onShow();
           }
       };

       /**
        * Handle the view swap.
        *
        * @param {BaseView} view 
        */
       region.show = function(view) {
           closeView(currentView);
           openView(view);

           currentView = view;
       };

       return region;

   })($, Backbone);
});