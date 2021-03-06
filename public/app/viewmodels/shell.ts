// shell.ts
/// <reference path='../../lib/typings/durandal/durandal.d.ts'/>
//
import router = require('plugins/router');
import app = require('durandal/app');
import BaseViewModel = require('data/model/baseviewmodel');
import dataService = require('./dataservice');
//
class ShellClass extends BaseViewModel {
  constructor(){
    super(dataService);
    this.router = router;
  }// constructor
  public activate(): any {
    router.map([
    /*  { route: '', title: 'Welcome', moduleId: 'viewmodels/welcome', nav: true }, */
      { route: '', moduleId: 'viewmodels/login', nav: true, title:'Accueil' },
      { route: 'home', moduleId: 'viewmodels/home', nav: true, title:''},
      { route: 'profil', moduleId: 'viewmodels/profil', nav: true, title:'' },
      { route: 'flickr', moduleId: 'viewmodels/flickr', nav: true }
    ]).buildNavigationModel();

    return router.activate();
  }// activate
  public search() : any {
    //It's really easy to show a message box.
    //You can add custom options too. Also, it returns a promise for the user's response.
    app.showMessage('Search not yet implemented...');
  }
}// class ShellClass
var shell = new ShellClass();
export = shell;
