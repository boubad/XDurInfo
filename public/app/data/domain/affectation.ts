//affectation.ts
import InfoData = require('../../infodata');
//
import DescriptionItem = require('./descriptionitem');
//
class Affectation extends DescriptionItem implements InfoData.IAffectation {
  private _departementid: any;
  private _anneeid:any;
  private _semestreid: any;
  private _groupeid: any;
  private _personid: any;
  private _start: Date;
  private _end: Date;
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.departementid !== undefined) {
        this.departementid = oMap.departementid;
      }
      if (oMap.anneeid !== undefined) {
        this.anneeid = oMap.anneeid;
      }
      if (oMap.semestreid !== undefined) {
        this.semestreid = oMap.semestreid;
      }
      if (oMap.groupeid !== undefined) {
        this.groupeid = oMap.groupeid;
      }
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
      if (oMap.startDate !== undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate !== undefined) {
        this.endDate = oMap.endDate;
      }
    }// oMap
  }// constructor
  //
  public get startDate(): Date {
    return (this._start !== undefined) ? this._start : null;
  }
  public set startDate(d: Date) {
    this._start = (d !== undefined) ? d : null;
  }
  public get has_startDate(): boolean {
    return (this.startDate !== null);
  }
  public get endDate(): Date {
    return (this._end !== undefined) ? this._end : null;
  }
  public set endDate(d: Date) {
    this._end = (d !== undefined) ? d : null;
  }
  public get has_endDate(): boolean {
    return (this.endDate !== null);
  }
  //
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
  //
  //
  public get groupeid(): any {
    return (this._groupeid !== undefined) ? this._groupeid : null;
  }
  public set groupeid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._groupeid = s;
    } else {
      this._groupeid = null;
    }
  }
  public get has_groupeid(): boolean {
    return (this.groupeid !== null);
  }
  //
  //
  public get anneeid(): any {
    return (this._anneeid !== undefined) ? this._anneeid : null;
  }
  public set anneeid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._anneeid = s;
    } else {
      this._anneeid = null;
    }
  }
  public get has_anneeid(): boolean {
    return (this.anneeid !== null);
  }
  //
  //
  public get semestreid(): any {
    return (this._semestreid !== undefined) ? this._semestreid : null;
  }
  public set semestreid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._semestreid = s;
    } else {
      this._semestreid = null;
    }
  }
  public get has_semestreid(): boolean {
    return (this.semestreid !== null);
  }
  //
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
  //
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      this.has_departementid;
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
    if (this.has_departementid) {
      oMap.departementid = this.departementid;
    }
    if (this.has_anneeid) {
      oMap.anneeid = this.anneeid;
    }
    if (this.has_semestreid) {
      oMap.semestreid = this.semestreid;
    }
    if (this.has_groupeid) {
      oMap.groupeid = this.groupeid;
    }
    if (this.has_personid) {
      oMap.personid = this.personid;
    }
    if (this.has_startDate) {
      oMap.startDate = this.startDate;
    }
    if (this.has_endDate) {
      oMap.endDate = this.endDate;
    }
  }// to_insert_map
}// class Affectation
export = Affectation;
