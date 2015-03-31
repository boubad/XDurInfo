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
    this._desc = null;
    this._avatarid = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.description !== undefined) {
        this.description = oMap.description;
      }
      if (oMap.avatarid !== undefined) {
        this.avatarid = oMap.avatarid;
      }
    } // oMap
  } // constructor
  public get avatarid(): any {
    return this._avatarid;
  } // id
  public set avatarid(s: any) {
    this._avatarid = ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) ?
    s : null;
  } // id
  public get has_avatarid(): boolean {
    return (this.avatarid !== null);
  }
  public get description(): string {
    return this._desc;
  } // description
  public set description(s: string) {
    this._desc = ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) ?
    s : null;
  } // description
  public get has_description(): boolean {
    return (this.description !== null);
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
      oMap.description = this.description;
      oMap.avatarid = this.avatarid;
  } // toInsertMap
}// class DescriptionItem
export = DescriptionItem;
