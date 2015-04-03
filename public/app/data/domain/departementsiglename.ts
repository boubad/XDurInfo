// departementsiglename.ts
import InfoData = require('../../infodata');
//
import SigleNameItem = require('./siglenameitem');
//
class DepartementSigleNameItem extends SigleNameItem implements InfoData.ISigleNameItem{
  private _departementid: any;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._departementid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.departementid != undefined) {
        this.departementid = oMap.departementid;
      }
    }// oMap
  }// constructor
  public create_id():  string{
    return this.departementid + '-' + this.sigle;
  }// create_id
  public get departementid(): any {
    return this._departementid;
  }
  public set departementid(s: any) {
    if ((s != undefined) && (s != null) && (s.toString().trim().length > 0)) {
      this._departementid = s;
    } else {
      this._departementid = null;
    }
  }
  public get has_departementid(): boolean {
    return (this.departementid != null);
  }
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      (this.departementid !== null) && (this.sigle !== null);
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
    oMap.departementid = this.departementid;
  }// to_insert_map
} // class SigleNameItemItem
export = DepartementSigleNameItem;
