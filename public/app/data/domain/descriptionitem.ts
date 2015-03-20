// descriptionitem.ts
//
import InfoData = require('../../infodata');
import BaseItem = require('./baseitem');
//
class DescriptionItem extends BaseItem  implements InfoData.IDescriptionItem {
  private _desc: string;
  private _avatarid: any;
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.remarks !== undefined) {
        this.remarks = oMap.remarks;
      }
      if (oMap.avatarid !== undefined) {
        this.avatarid = oMap.avatarid;
      }
    } // oMap
  } // constructor
  public get avatarid(): any {
    return (this._avatarid !== undefined) ? this._avatarid : null;
  } // id
  public set avatarid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._avatarid = s;
    } else {
      this._avatarid = null;
    }
  } // id
  public get has_avatarid(): boolean {
    return (this.avatarid !== null);
  }
  public get remarks(): string {
    return (this._desc !== undefined) ? this._desc : null;
  } // description
  public set remarks(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._desc = s.trim();
    } else {
      this._desc = null;
    }
  } // description
  public get has_remarks(): boolean {
    return (this.remarks !== null);
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
    if (this.has_remarks) {
      oMap.remarks = this.remarks;
    }
    if (this.has_avatarid) {
      oMap.avatarid = this.avatarid;
    }
  } // toInsertMap
}// class DescriptionItem
export = DescriptionItem;
