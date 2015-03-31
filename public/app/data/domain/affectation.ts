//affectation.ts
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
import DepartementChild = require('./departementchild');
//
class Affectation extends DepartementChild implements InfoData.IAffectation {
  private _anneeid:any;
  private _semestreid: any;
  private _groupeid: any;
  private _personid: any;
  private _start: Date;
  private _end: Date;
  private _fullname: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._anneeid = null;
    this._semestreid = null;
    this._groupeid = null;
    this._personid = null;
    this._start = null;
    this._end = null;
    if ((oMap !== undefined) && (oMap !== null)) {
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
  //
  public get startDate(): Date {
    return this._start;
  }
  public set startDate(d: Date) {
    this._start = BaseItem.check_date(d);
  }
  public get has_startDate(): boolean {
    return (this.startDate !== null);
  }
  public get endDate(): Date {
    return this._end;
  }
  public set endDate(d: Date) {
    this._end = BaseItem.check_date(d);
  }
  public get has_endDate(): boolean {
    return (this.endDate !== null);
  }
  //
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
  //
  //
  public get groupeid(): any {
    return this._groupeid;
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
    return this._anneeid;
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
    return this._semestreid;
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
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      (this.departementid !== null);
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
      oMap.departementid = this.departementid;
      oMap.anneeid = this.anneeid;
      oMap.semestreid = this.semestreid;
      oMap.groupeid = this.groupeid;
      oMap.personid = this.personid;
      oMap.startDate = this.startDate;
      oMap.endDate = this.endDate;
      oMap.fullname = this.fullname;
  }// to_insert_map
}// class Affectation
export = Affectation;
