//etudevent.ts
//
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
import BaseEvent = require('./baseevent');
//
class EtudEvent extends BaseEvent implements InfoData.IEtudEvent {
  //
  private _aff: any;
  private _evt: any;
  private _note: number;
  private _etud: any;
  private _fullname;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._aff = null;
    this._evt = null;
    this._note = null;
    this._etud = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.etudaffectationid !== undefined) {
        this.etudaffectationid = oMap.etudaffectationid;
      }
      if (oMap.etudiantid !== undefined) {
        this.etudiantid = oMap.etudiantid;
      }
      if (oMap.groupeeventid !== undefined) {
        this.groupeeventid = oMap.groupeeventid;
      }
      if (oMap.note !== undefined) {
        this.note = oMap.note;
      }
      if (oMap.fullname !== undefined){
        this.fullname = oMap.fullname;
      }
    }// oMap
  }// constructor
  public get base_prefix():string {
    return 'EVT';
  }
  public get search_prefix(): string {
    return this.base_prefix + '-' + this.groupeeventid;
  }
  public create_id():  string{
    return this.search_prefix + '-' + this.personid;
  }// create_id
  public get type(): string {
    return 'etudevent';
  }
  public get collection_name(): string {
    return 'etudevents';
  }
  //
  public get etudaffectationid(): any {
    return this._aff;
  }
  public set etudaffectationid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._aff = s;
    } else {
      this._aff = null;
    }
  }
  public get has_etudaffectationid(): boolean {
    return (this.etudaffectationid !== null);
  }
  //
  public get groupeeventid(): any {
    return this._evt;
  }
  public set groupeeventid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._evt = s;
    } else {
      this._evt = null;
    }
  }
  public get has_groupeeventid(): boolean {
    return (this.groupeeventid !== null);
  }
  //
  public get etudiantid(): any {
    return this._etud;
  }
  public set etudiantid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._etud = s;
    } else {
      this._etud = null;
    }
  }
  public get has_etudiantid(): boolean {
    return (this.etudiantid !== null);
  }
  //
  public get note(): number {
    return this._note;
  }
  public set note(s: number) {
    if ((s !== undefined) && (s !== null)) {
      this._note = s;
    } else {
      this._note = null;
    }
  }
  public get has_note(): boolean {
    return (this.note !== null);
  }
  public get fullname():string {
    return this._fullname;
  }
  public set fullname(s:string){
    this._fullname = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
    s.trim() : null;
  }
  public get has_fullname():boolean {
    return (this.fullname !== null);
  }
  //
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      this.has_departementid && this.has_anneeid && this.has_semestreid &&
      this.has_uniteid && this.has_matiereid && this.has_groupeid &&
      this.has_genre && this.has_date && this.has_etudaffectationid &&
      this.has_groupeeventid && this.has_etudiantid && this.has_fullname;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.etudaffectationid = this.etudaffectationid;
      oMap.groupeeventid = this.groupeeventid;
      oMap.etudiantid = this.etudiantid;
      oMap.note = this.note;
      oMap.fullname = this.fullname;
  }// to_insert_map
}// class EtudEvent
export = EtudEvent;
