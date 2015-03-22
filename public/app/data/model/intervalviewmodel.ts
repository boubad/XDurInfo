// intervalviewmodel.ts
//
//
import InfoData = require('../../infodata');
import DepartementSigleNameViewModel = require('./departementsiglenameviewmodel');
import ItemDataManager = require('../services/itemdatamanager');
//
class IntervalViewModel extends DepartementSigleNameViewModel {
  //
  private _start:string;
  private _end:string;
  //
  constructor(model: InfoData.IIntervalItem ) {
    super(model);
    this._start = null;
    this._end = null;
  }
  public get startDate():string {
    return (this._start !== undefined) ? this._start : null;
  }
  public set startDate(s:string){
    this._start = s;
  }
  public get endDate():string {
    return (this._end !== undefined) ? this._end : null;
  }
  public set endDate(s:string){
    this._end = s;
  }
  public change_current(s: InfoData.IBaseItem) {
    super.change_current(s);
    var d1:string = null;
    var d2:string = null;
    var item = this.current;
    if ((item !== undefined) && (item !== null)){
      d1 = this.date_to_string(item.startDate);
      d2 = this.date_to_string(item.endDate);
    }
    this.startDate = d1;
    this.endDate = d2;
  }
  public get canSave():boolean {
    var item = this.current;
    if ((item === undefined)|| (item === null)){
      return false;
    }
    var d1:Date = this.string_to_date(this.startDate);
    var d2:Date = this.string_to_date(this.endDate);
    if ((d1 === null) || (d2 === null)){
      return false;
    }
    if (d1.getTime() > d2.getTime()){
      return false;
    }
    return (this.departementid !== null) && item.has_sigle;
  }// canSave
  public save():void{
    var item = this.current;
    if ((item === undefined)|| (item === null)){
      return;
    }
    var d1:Date = this.string_to_date(this.startDate);
    var d2:Date = this.string_to_date(this.endDate);
    if ((d1 === null) || (d2 === null)){
      return;
    }
    if (d1.getTime() > d2.getTime()){
      return;
    }
    if ((this.departementid === null) || (!item.has_sigle)){
      return;
    }
    item.departementid = this.departementid;
    item.startDate = d1;
    item.endDate = d2;
    super.save();
  }// save
}// class DepartementNameViewModel
export = IntervalViewModel;
