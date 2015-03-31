//etudaffectation.ts
import InfoData = require('../../infodata');
//
import Affectation = require('./affectation');
//
class ProfAffectation extends Affectation implements InfoData.IProfAffectation {
  private _profid: any;
  private _uniteid: any;
  private _matiereid: any;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._profid = null;
    this._uniteid = null;
    this._matiereid = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.enseignantid != undefined) {
        this.enseignantid = oMap.enseignantid;
      }
      if (oMap.uniteid != undefined) {
        this.uniteid = oMap.uniteid;
      }
      if (oMap.matiereid != undefined) {
        this.matiereid = oMap.matiereid;
      }
    }// oMap
  }// constructor
  //
  public get matiereid(): any {
    return this._matiereid;
  }
  public set matiereid(s: any) {
    if ((s != undefined) && (s != null) && (s.toString().trim().length > 0)) {
      this._matiereid = s;
    } else {
      this._matiereid = null;
    }
  }
  public get has_matiereid(): boolean {
    return (this.matiereid != null);
  }
  //
  public get uniteid(): any {
    return this._uniteid;
  }
  public set uniteid(s: any) {
    if ((s != undefined) && (s != null) && (s.toString().trim().length > 0)) {
      this._uniteid = s;
    } else {
      this._uniteid = null;
    }
  }
  public get has_uniteid(): boolean {
    return (this.uniteid != null);
  }
  //
  public get enseignantid(): any {
    return this._profid;
  }
  public set enseignantid(s: any) {
    if ((s != undefined) && (s != null) && (s.toString().trim().length > 0)) {
      this._profid = s;
    } else {
      this._profid = null;
    }
  }
  public get has_enseignantid(): boolean {
    return (this.enseignantid != null);
  }
  //
  public get is_storeable(): boolean {
    if (this.has_startDate && this.has_endDate) {
      if (this.startDate.getTime() > this.endDate.getTime()) {
        return false;
      }
    } else if (this.has_startDate || this.has_endDate) {
      return false;
    }
    return (this.type != null) && (this.collection_name != null) &&
      this.has_departementid && this.has_anneeid && this.has_semestreid &&
      this.has_personid && this.has_groupeid && this.has_enseignantid &&
      this.has_uniteid && this.has_matiereid;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.enseignantid = this.enseignantid;
      oMap.uniteid = this.uniteid;
      oMap.matiereid = this.matiereid;
  }// to_insert_map
  public get type(): string {
    return 'profaffectation';
  }
  public get collection_name(): string {
    return 'profaffectations';
  }
}// class ProfAffectation
export = ProfAffectation;
