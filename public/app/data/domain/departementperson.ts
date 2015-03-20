//departementperson.ts
import InfoData = require('../../infodata');
//
import DescriptionItem = require('./descriptionitem');
//
class DepartementPerson extends DescriptionItem implements InfoData.IDepartementPerson {
  private _departementid: any;
  private _personid: any;
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.departementid !== undefined) {
        this.departementid = oMap.departementid;
      }
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
    }// oMap
  }// constructor
  public get departementid(): any {
    return (this._departementid !== undefined) ? this._departementid : null;
  }
  public set departementid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._departementid = s;
    } else {
      this._departementid = null;
    }
  }
  public get has_departementid(): boolean {
    return (this.departementid !== null);
  }
  public get personid(): any {
    return (this._personid !== undefined) ? this._personid : null;
  }
  public set personid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._personid = s;
    } else {
      this._personid = null;
    }
  }
  public get has_personid(): boolean {
    return (this.personid !== null);
  }
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      this.has_departementid && this.has_personid;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    if (this.has_departementid) {
      oMap.departementid = this.departementid;
    }
    if (this.has_personid) {
      oMap.personid = this.personid;
    }
  }// to_insert_map
}// class DepartementPerson
export = DepartementPerson;
