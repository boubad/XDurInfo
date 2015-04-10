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
  public firstname: string;
  public lastname: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._aff = null;
    this._evt = null;
    this._note = null;
    this._etud = null;
    this.firstname = null;
    this.lastname = null;
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
      if (oMap.firstname !== undefined){
        this.firstname = oMap.firstname;
      }
      if (oMap.lastname !== undefined){
        this.lastname = oMap.lastname;
      }
    }// oMap
  }// constructor
  public get base_prefix():string {
    return 'EVT';
  }
  public create_id():  string{
    return this.base_prefix + '-' + this.groupeeventid + '-' + this.etudiantid;
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
  //
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      this.has_departementid && this.has_anneeid && this.has_semestreid &&
      this.has_uniteid && this.has_matiereid && this.has_groupeid &&
      this.has_genre && this.has_date && this.has_etudaffectationid &&
      this.has_groupeeventid && this.has_etudiantid && this.has_firstname &&
      this.has_lastname;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.etudaffectationid = this.etudaffectationid;
      oMap.groupeeventid = this.groupeeventid;
      oMap.etudiantid = this.etudiantid;
      oMap.note = this.note;
      oMap.firstname = this.firstname;
      oMap.lastname = this.lastname;
  }// to_insert_map
}// class EtudEvent
export = EtudEvent;
