// shell.ts
/// <reference path='../../lib/typings/durandal/durandal.d.ts'/>
//
import router = require('plugins/router');
import app = require('durandal/app');
var shell = {
  router: router,
  search: () => {
    //It's really easy to show a message box.
    //You can add custom options too. Also, it returns a promise for the user's response.
    app.showMessage('Search not yet implemented...');
  },
  activate: () => {
    router.map([
      { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: true },
      { route: 'admin', title: 'Admin', moduleId: 'viewmodels/departements', nav: true },
      { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true }
    ]).buildNavigationModel();

    return router.activate();
  }
};
export = shell;
