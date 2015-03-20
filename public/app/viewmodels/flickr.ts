// flicker.ts
/// <reference path='../../lib/typings/durandal/durandal.d.ts'/>
/// <reference path='../../lib/typings/knockout/knockout.d.ts'/>
//
import http = require('plugins/http');
import app = require('durandal/app');
import ko = require('knockout');
//
class Flicker {
  public displayName: string;
  public images: KnockoutObservableArray<any>;
  public activate: () => any;
  public select: (item: any) => any;
  public canDeactivate: () => any;
  //
  constructor() {
    this.displayName = 'Flickr';
    this.images = ko.observableArray([]);
    this.activate = () => {
      //the router's activator calls this function and waits for it to complete before proceeding
      if (this.images().length > 0) {
        return;
      }
      var that = this;
      return http.jsonp('http://api.flickr.com/services/feeds/photos_public.gne', { tags: 'mount ranier', tagmode: 'any', format: 'json' }, 'jsoncallback').then(function(response) {
        that.images(response.items);
      });
    };
    this.select = (item) => {
      //the app model allows easy display of modal dialogs by passing a view model
      //views are usually located by convention, but you an specify it as well with viewUrl
      item.viewUrl = 'views/detail';
      app.showDialog(item);
    };
    this.canDeactivate = () => {
      //the router's activator calls this function to see if it can leave the screen
      return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
    };
  }// constructor
}// class Flickers
//
var flicker = new Flicker();
//
export = flicker;
