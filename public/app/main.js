﻿
requirejs.config({
  paths: {
    'text': '../lib/require/text',
    'durandal': '../lib/durandal/js',
    'plugins': '../lib/durandal/js/plugins',
    'transitions': '../lib/durandal/js/transitions',
    'knockout': '../lib/knockout/knockout-3.1.0',
    'bootstrap': '../lib/bootstrap/js/bootstrap',
    'jquery': '../lib/jquery/jquery-1.9.1',
    'q': '../lib/q/q',
    'moment': '../lib/moment/moment',
    'domain':'./data/domain',
    'model':'./data/model',
    'services':'./data/domain',
    'test':'./data/test'
  },
  shim: {
    'bootstrap': {
      deps: ['jquery'],
      exports: 'jQuery'
    },
    'q': {
      exports: 'Q'
    }
  }
});

define(['q','durandal/system', 'durandal/app', 'durandal/viewLocator'], function(Q,system, app, viewLocator) {
  //>>excludeStart("build", true);
  system.debug(true);
  //>>excludeEnd("build");

  app.title = 'InfoApp';

  app.configurePlugins({
    observable: true,
    router: true,
    dialog: true
  });
  system.defer = function(action) {
    var deferred = Q.defer();
    action.call(deferred, deferred);
    var promise = deferred.promise;
    deferred.promise = function() {
      return promise;
    };
    return deferred;
  };
  app.start().then(function() {
    //Replace 'viewmodels' in the moduleId with 'views' to locate the view.
    //Look for partial views in a 'views' folder in the root.
    viewLocator.useConvention();

    //Show the app by setting the root view model for our application with a transition.
    app.setRoot('viewmodels/shell', 'entrance');
  });
});
