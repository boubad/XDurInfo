// intervalitem.ts
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
import DepartementSigleNameItem = require('./departementsiglename');
//
class IntervalItem extends DepartementSigleNameItem implements InfoData.IIntervalItem {
  private _start: Date;
  private _end: Date;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._start = null;
    this._end = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.startDate != undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate != undefined) {
        this.endDate = oMap.endDate;
      }
    }
  }
  public get startDate(): Date {
    return this._start;
  }
  public set startDate(d: Date) {
    this._start = BaseItem.check_date(d);
  }
  public get has_startDate(): boolean {
    return (this.startDate != null);
  }
  public get endDate(): Date {
    return this._end;
  }
  public set endDate(d: Date) {
    this._end = BaseItem.check_date(d);
  }
  public get has_endDate(): boolean {
    return (this.endDate != null);
  }
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      (this.departementid  !== null) && (this.sigle !== null) &&
      (this.startDate !== null) && (this.endDate !== null) &&
      (this.startDate.getTime() <= this.endDate.getTime());
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.startDate = this.startDate;
      oMap.endDate = this.endDate;
  } // to_insert_map
} // class IntervalItem
export = IntervalItem;
