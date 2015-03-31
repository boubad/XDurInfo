// intervalviewmodel.ts
//
/// <reference path='../../../lib/typings/knockout/knockout.d.ts'/>
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import DepartementSigleNameViewModel = require('./departementsiglenameviewmodel');
import ItemDataManager = require('../services/itemdatamanager');
//
class IntervalViewModel extends DepartementSigleNameViewModel {
  //
  public startDate: KnockoutComputed<Date>;
  public endDate: KnockoutComputed<Date>;
  //
  constructor(model: InfoData.IIntervalItem) {
    super(model);
    this.startDate = ko.computed({
      read: () => {
        var v = this.current();
        return (v !== null) ? v.startDate : null;
      },
      write : (s:Date)=>{
        var v = this.current();
        if (v != null){
          v.startDate = s;
        }
      },
      owner: this
    });
    this.endDate = ko.computed({
      read: () => {
        var v = this.current();
        return (v !== null) ? v.endDate : null;
      },
      write : (s:Date)=>{
        var v = this.current();
        if (v != null){
          v.endDate = s;
        }
      },
      owner: this
    });
    this.canSave = ko.computed(() => {
      var item = this.current();
      if ((item === undefined) || (item === null)) {
        return false;
      }
      var d1: Date = this.startDate();
      var d2: Date = this.endDate();
      if ((d1 === null) || (d2 === null)) {
        return false;
      }
      if (d1.getTime() > d2.getTime()) {
        return false;
      }
      return (this.departementid !== null) && (item.sigle !== null);
    }, this);
  }// constructor
}// class DepartementNameViewModel
export = IntervalViewModel;
