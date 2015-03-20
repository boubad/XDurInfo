// intervalitem.ts
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
import SigleNameItem = require('./siglenameitem');
//
class IntervalItem extends SigleNameItem implements InfoData.IIntervalItem {
  private _start: Date;
  private _end: Date;
  //
  constructor(oMap?: any) {
    super(oMap);
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
    return (this._start != undefined) ? this._start : null;
  }
  public set startDate(d: Date) {
    this._start = BaseItem.check_date(d);
  }
  public get has_startDate(): boolean {
    return (this.startDate != null);
  }
  public get endDate(): Date {
    return (this._end != undefined) ? this._end : null;
  }
  public set endDate(d: Date) {
    this._end = BaseItem.check_date(d);
  }
  public get has_endDate(): boolean {
    return (this.endDate != null);
  }
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      this.has_departementid && this.has_sigle &&
      this.has_startDate && this.has_endDate &&
      (this.startDate.getTime() <= this.endDate.getTime());
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    if (this.has_startDate) {
      oMap.startDate = this.startDate;
    }
    if (this.has_endDate) {
      oMap.endDate = this.endDate;
    }
  } // to_insert_map
} // class IntervalItem
export = IntervalItem;
