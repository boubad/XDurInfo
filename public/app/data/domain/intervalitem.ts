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
  public create_id():  string{
    var s = (this.startDate.toISOString()).substr(0,10);
    return this.base_prefix + '-' + this.departementid + s + '-' + this.sigle.toUpperCase();
  }// create_id
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
  public sort_func(p1:InfoData.IIntervalItem, p2:InfoData.IIntervalItem): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.startDate !== undefined) && (p1.startDate !== null)) {
                if ((p2.startDate !== undefined) && (p2.startDate !== null)) {
                    var s1 = Date.parse(p1.startDate.toString());
                    var s2 = Date.parse(p2.startDate.toString());
                    if (s1 < s2){
                      vRet = 1;
                    } else if (s1 > s2){
                      vRet = -1;
                    } else {
                      vRet = 0;
                    }
                } else {
                    vRet = 1;
                }
            } else {
                vRet = 1;
            }
        } else if ((p1 === undefined) || (p1 === null)) {
            vRet = 1;
        }
        return vRet;
    } // sort_func
} // class IntervalItem
export = IntervalItem;
