// siglenameitem.ts
import InfoData = require('../../infodata');
//
import DescriptionItem = require('./descriptionitem');
//
class SigleNameItem extends DescriptionItem implements InfoData.ISigleNameItem{
  private _sigle: string;
  private _name: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._sigle = null;
    this._name = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.sigle !== undefined) {
        this.sigle = oMap.sigle;
      }
      if (oMap.name !== undefined) {
        this.name = oMap.name;
      }
    } // oMap
  } // constructor
  public create_id():  string{
    return this.search_prefix + '-' + this.sigle.toUpperCase();
  }// create_id
  public get sigle(): string {
    return this._sigle;
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
    return this._name;
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
      (this.sigle !== null);
  }
  to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.sigle = this.sigle;
      oMap.name = this.name;
  } // toInsertMap
  public sort_func(p1:InfoData.ISigleNameItem, p2:InfoData.ISigleNameItem): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.sigle !== undefined) && (p1.sigle !== null)) {
                if ((p2.sigle !== undefined) && (p2.sigle !== null)) {
                    var s1 = p1.sigle;
                    var s2 = p2.sigle;
                    vRet = s1.localeCompare(s2);
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
} // class SigleNameItemItem
export = SigleNameItem;
