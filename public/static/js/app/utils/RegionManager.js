define([
    'jquery',
], function($){
   return (function($){
       var currentView;
       var applicationView = "#application";

       /**
        * Close or remove the view

        * @param {Backbone.View} view 
        */
       var closeView = function (view) {
           if(view && view.close) {
               view.close();
           }
       };

       /**
        * Append the rendered view to the Application view/Dom
        
        * @param {Backbone.View} view 
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
        * Swap current view with the new view.

        * @param {Backbone.View} view 
        */
        var show = function(view) {
           closeView(currentView);
           openView(view);

           currentView = view;
       };

       return {show : show};

   })($);
});