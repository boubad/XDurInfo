// siglenameitem.ts
import InfoData = require('../../infodata');
//
import DepartementChildItem = require('./departementchild');
//
class SigleNameItem extends DepartementChildItem implements InfoData.ISigleNameItem{
  private _sigle: string;
  private _name: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.sigle !== undefined) {
        this.sigle = oMap.sigle;
      }
      if (oMap.name !== undefined) {
        this.name = oMap.name;
      }
    } // oMap
  } // constructor
  public get sigle(): string {
    return (this._sigle != undefined) ? this._sigle : null;
  }
  public set sigle(s: string) {
    if ((s != undefined) && (s != null) && (s.trim().length > 0)) {
      this._sigle = s.trim().toLowerCase();
    } else {
      this._sigle = null;
    }
  }
  public get has_sigle(): boolean {
    return (this.sigle != null);
  }
  public get name(): string {
    return (this._name != undefined) ? this._name : null;
  }
  public set name(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._name = s.trim();
    } else {
      this._name = null;
    }
  }
  public get has_name(): boolean {
    return (this.name !== null);
  }
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      this.has_departementid && this.has_sigle;
  }
  to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    if (this.has_sigle) {
      oMap.sigle = this.sigle;
    }
    if (this.has_name) {
      oMap.name = this.name;
    }
  } // toInsertMap
} // class SigleNameItemItem
export = SigleNameItem;
