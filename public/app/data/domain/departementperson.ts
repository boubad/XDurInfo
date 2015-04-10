//departementperson.ts
import InfoData = require('../../infodata');
//
import DepartementChild = require('./departementchild');
//
class DepartementPerson extends DepartementChild implements InfoData.IDepartementPerson {
  private _personid: any;
  public firstname: string;
  public lastname: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._personid = null;
    this.firstname = null;
    this.lastname = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
      if (oMap.firstname !== undefined){
        this.firstname = oMap.firstname;
      }
      if (oMap.lastname !== undefined){
        this.lastname = oMap.lastname;
      }
    }// oMap
  }// constructor

  public get has_firstname():boolean {
    return (this.firstname !== null);
  }
  public get has_lastname():boolean {
    return (this.lastname !== null);
  }
  public get fullname(): string {
    var s = '';
    if (this.has_lastname) {
      s = this.lastname;
    }
    if (this.has_firstname) {
      s = s + ' ' + this.firstname;
    }
    s = s.trim();
    return (s.length > 0) ? s : null;
  } // fullname
  public get has_fullname(): boolean {
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
      (this.departementid !== null) && (this.personid !== null) &&
      (this.lastname !== null) && (this.firstname !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.personid = this.personid;
      oMap.firstname = this.firstname;
      oMap.lastname = this.lastname;
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
