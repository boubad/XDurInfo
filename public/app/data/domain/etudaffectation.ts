//etudaffectation.ts
import InfoData = require('../../infodata');
//
import Affectation = require('./affectation');
//
class EtudAffectation extends Affectation implements InfoData.IEtudAffectation {
  private _etudiantid: any;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._etudiantid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.etudiantid != undefined) {
        this.etudiantid = oMap.etudiantid;
      }
    }// oMap
  }// constructor
  public get base_prefix():string {
    return 'ETF';
  }
  public create_id():  string{
    var d:Date = (this.has_startDate) ? this.startDate : new Date();
    var s = (d.toISOString()).substr(0,10);
    return this.semestreid + '-'  +
    '-' + this.etudiantid + '-' + this.groupeid + '-' + s;
  }// create_id
  //
  public get etudiantid(): any {
    return this._etudiantid;
  }
  public set etudiantid(s: any) {
    if ((s != undefined) && (s != null) && (s.toString().trim().length > 0)) {
      this._etudiantid = s;
    } else {
      this._etudiantid = null;
    }
  }
  public get has_etudiantid(): boolean {
    return (this.etudiantid != null);
  }
  //
  public get is_storeable(): boolean {
    var bRet:boolean = (this.type !== null) && (this.collection_name !== null) &&
      (this.departementid !== null) && (this.anneeid !== null) &&
       (this.semestreid !== null) &&
      (this.groupeid !== null) && (this.personid !== null) && (this.etudiantid !== null) &&
      (this.firstname !== null) &&
      (this.lastname !== null);
      if (!bRet){
        return false;
      }
    if (this.has_startDate && this.has_endDate) {
      if (this.startDate.getTime() > this.endDate.getTime()) {
        return false;
      }
    } else if (this.has_startDate || this.has_endDate) {
      return false;
    }
    return true;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    if (this.has_etudiantid) {
      oMap.etudiantid = this.etudiantid;
    }
  }// to_insert_map
  public get type(): string {
    return 'etudaffectation';
  }
  public get collection_name(): string {
    return 'etudaffectations';
  }
}// class EtudAffectation
export = EtudAffectation;
