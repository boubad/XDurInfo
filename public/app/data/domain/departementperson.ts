//departementperson.ts
import InfoData = require('../../infodata');
//
import DepartementChild = require('./departementchild');
//
class DepartementPerson extends DepartementChild implements InfoData.IDepartementPerson {
  private _personid: any;
  private _fullname: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._personid = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
      if (oMap.fullname !== undefined){
        this.fullname = oMap.fullname;
      }
    }// oMap
  }// constructor
  public get fullname(): string {
    return this._fullname;
  }
  public set fullname(s:string){
      this._fullname = ((s !== undefined) && (s !== null) &&
      (s.trim().length > 0)) ? s.trim() : null;
  }
  public get has_fullname():boolean {
    return (this.fullname !== null);
  }
  public get personid(): any {
    return this._personid;
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
      (this.departementid !== null) && (this.personid !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.personid = this.personid;
  }// to_insert_map
  public sort_func(p1:InfoData.IDepartementPerson, p2:InfoData.IDepartementPerson): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.fullname !== undefined) && (p1.fullname !== null)) {
                if ((p2.fullname !== undefined) && (p2.fullname !== null)) {
                    var s1 = p1.fullname;
                    var s2 = p2.fullname;
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
}// class DepartementPerson
export = DepartementPerson;
