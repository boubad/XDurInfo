//baseevent.ts
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
import DepartementChild = require('./departementchild');
//
class BaseEvent extends DepartementChild implements InfoData.IBaseEvent {
  //
  private _anneeid: any;
  private _semestreid: any;
  private _groupeid: any;
  private _personid: any;
  private _date: Date;
  private _uniteid: any;
  private _matiereid: any;
  private _genre: string;
  private _docs: any[];
  private _status: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._anneeid = null;
    this._semestreid = null;
    this._groupeid = null;
    this._personid = null;
    this._date = null;
    this._uniteid = null;
    this._matiereid = null;
    this._genre = null;
    this._docs = [];
    this._status = null;
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
      if (oMap.uniteid !== undefined) {
        this.uniteid = oMap.uniteid;
      }
      if (oMap.matiereid !== undefined) {
        this.matiereid = oMap.matiereid;
      }
      if (oMap.genre !== undefined) {
        this.genre = oMap.genre;
      }
      if (oMap.status !== undefined) {
        this.status = oMap.status;
      }
      if (oMap.documentids !== undefined) {
        this.documentids = oMap.documentids;
      }
      if (oMap.date !== undefined) {
        this.date = oMap.date;
      }

    }// oMap
  }// constructor
  //
  public get documentids(): any[] {
    return ((this._docs !== undefined) && (this._docs !== null)) ?
     this._docs : [];
  }
  public set documentids(s: any[]) {
    if ((s !== undefined) && (s !== null) && (s.length > 0)) {
      this._docs = s;
    } else {
      this._docs = null;
    }
  }
  public get has_documentids(): boolean {
    return ((this.documentids !== null) && (this.documentids.length > 0));
  }
  public add_documentid(id: any): void {
    if ((id !== undefined) && (id !== null) &&
      (id.toString().trim().length > 0)) {
      if ((this._docs === undefined) || (this._docs === null)) {
        this._docs = [];
      }
      BaseItem.array_add(this._docs, id);
    }
  }
  public remove_documentid(id: any): void {
    if ((id !== undefined) && (id !== null) &&
      (id.toString().trim().length > 0)) {
      if ((this._docs !== undefined) && (this._docs !== null) &&
        (this._docs.length > 0)) {
        BaseItem.array_remove(this._docs, id);
      }
    }
  }
  //
  public get status(): string {
    return this._status;
  }
  public set status(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._status = s.trim().toLowerCase();
    } else {
      this._status = null;
    }
  }
  public get has_status(): boolean {
    return (this.status !== null);
  }
  //
  public get genre(): string {
    return this._genre;
  }
  public set genre(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._genre = s.trim().toLowerCase();
    } else {
      this._genre = null;
    }
  }
  public get has_genre(): boolean {
    return (this.genre !== null);
  }
  //
  public get date(): Date {
    return this._date;
  }
  public set date(d: Date) {
    this._date = BaseItem.check_date(d);
  }
  public get has_date(): boolean {
    return (this.date !== null);
  }
  //
  public get matiereid(): any {
    return this._matiereid;
  }
  public set matiereid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._matiereid = s;
    } else {
      this._matiereid = null;
    }
  }
  public get has_matiereid(): boolean {
    return (this.uniteid !== null);
  }
  //
  public get uniteid(): any {
    return this._uniteid;
  }
  public set uniteid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._uniteid = s;
    } else {
      this._uniteid = null;
    }
  }
  public get has_uniteid(): boolean {
    return (this.uniteid !== null);
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
      this.has_departementid && this.has_anneeid && this.has_semestreid &&
      this.has_uniteid && this.has_matiereid && this.has_groupeid &&
      this.has_genre && this.has_date;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.anneeid = this.anneeid;
      oMap.semestreid = this.semestreid;
      oMap.groupeid = this.groupeid;
      oMap.personid = this.personid;
      oMap.date = this.date;
      oMap.genre = this.genre;
      oMap.uniteid = this.uniteid;
      oMap.matiereid = this.matiereid;
      oMap.status = this.status;
      oMap.documentids = this.documentids;
  }// to_insert_map
  public to_fetch_map(oMap: any) : void {
    super.to_fetch_map(oMap);
    if (oMap.documentids !== undefined){
      oMap.documentids = null;
    }
  }
}// class Affectation
export = BaseEvent;
