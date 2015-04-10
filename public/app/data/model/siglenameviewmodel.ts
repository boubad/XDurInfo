//siglenameviewmodel.ts

/// <reference path='../../../lib/typings/knockout/knockout.d.ts'/>
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import PageViewModel = require('./pageviewmodel');
//
class SigleNameViewModel extends PageViewModel {
  //
  public sigle:KnockoutComputed<string>;
  public name:KnockoutComputed<string>;
  //
  constructor(model:InfoData.IBaseItem, server?: InfoData.IDatabaseManager) {
    super(model,server);
    this.sigle = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.sigle : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.sigle = s;
          this._current_data(x);
        }
      },
      owner : this
    });
    this.name = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.name : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.name = s;
          this._current_data(x);
        }
      },
      owner : this
    });
  }// constructor
}// class PagedViewModel
export = SigleNameViewModel;
