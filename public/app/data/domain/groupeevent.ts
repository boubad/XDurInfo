//groupeevent.ts
//
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
import BaseEvent = require('./baseevent');
//
class GroupeEvent extends BaseEvent implements InfoData.IGroupeEvent {
  //
  private _profaff: any;
  private _prof: any;
  private _name: string;
  private _location: string;
  private _start: Date;
  private _end: Date;
  private _coef: number;
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.profaffectationid !== undefined) {
        this.profaffectationid = oMap.profaffectationid;
      }
      if (oMap.enseignantid !== undefined) {
        this.enseignantid = oMap.enseignantid;
      }
      if (oMap.name !== undefined) {
        this.name = oMap.name;
      }
      if (oMap.location !== undefined) {
        this.location = oMap.location;
      }
      if (oMap.startTime !== undefined) {
        this.startTime = oMap.startTime;
      }
      if (oMap.endTime !== undefined) {
        this.endTime = oMap.endTime;
      }
      if (oMap.coefficient !== undefined) {
        this.coefficient = oMap.coefficient;
      }
    }// oMap
  }// constructor
  public get type(): string {
    return 'groupeevent';
  }
  public get collection_name(): string {
    return 'groupeevents';
  }
  //
  public get profaffectationid(): any {
    return (this._profaff !== undefined) ? this._profaff : null;
  }
  public set profaffectationid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._profaff = s;
    } else {
      this._profaff = null;
    }
  }
  public get has_profaffectationid(): boolean {
    return (this.profaffectationid !== null);
  }
  public get name(): string {
    return (this._name !== undefined) ? this._name : null;
  }
  public set name(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._name = s.trim().toLowerCase();
    } else {
      this._name = null;
    }
  }
  public get has_name(): boolean {
    return (this.name !== null);
  }
  //
  public get location(): string {
    return (this._location !== undefined) ? this._location : null;
  }
  public set location(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._location = s.trim().toLowerCase();
    } else {
      this._location = null;
    }
  }
  public get has_location(): boolean {
    return (this.location !== null);
  }
  //
  public get startTime(): Date {
    return (this._start !== undefined) ? this._start : null;
  }
  public set startTime(d: Date) {
    this._start = BaseItem.check_date(d);
  }
  public get has_startTime(): boolean {
    return (this.startTime !== null);
  }
  //
  public get endTime(): Date {
    return (this._end !== undefined) ? this._end : null;
  }
  public set endTime(d: Date) {
    this._end = BaseItem.check_date(d);
  }
  public get has_endTime(): boolean {
    return (this.endTime !== null);
  }
  //
  public get enseignantid(): any {
    return (this._prof !== undefined) ? this._prof : null;
  }
  public set enseignantid(s: any) {
    if ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) {
      this._prof = s;
    } else {
      this._prof = null;
    }
  }
  public get has_enseignantid(): boolean {
    return (this.enseignantid !== null);
  }
  //
  public get coefficient(): number {
    return (this._coef !== undefined) ? this._coef : null;
  }
  public set coefficient(s: number) {
    if ((s !== undefined) && (s !== null) && (s > 0)) {
      this._coef = s;
    } else {
      this._coef = null;
    }
  }
  public get has_coefficient(): boolean {
    return (this.coefficient !== null);
  }
  //
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null) &&
      this.has_departementid && this.has_anneeid && this.has_semestreid &&
      this.has_uniteid && this.has_matiereid && this.has_groupeid &&
      this.has_genre && this.has_date && this.has_profaffectationid &&
      this.has_name;
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    if (this.has_profaffectationid) {
      oMap.profaffectationid = this.profaffectationid;
    }
    if (this.has_enseignantid) {
      oMap.enseignantid = this.enseignantid;
    }
    if (this.has_name) {
      oMap.name = this.name;
    }
    if (this.has_location) {
      oMap.location = this.location;
    }
    if (this.has_coefficient) {
      oMap.coefficient = this.coefficient;
    }
    if (this.has_startTime) {
      oMap.startTime = this.startTime;
    }
    if (this.has_endTime) {
      oMap.endTime = this.endTime;
    }
  }// to_insert_map

}// class GroupeEvent
export = GroupeEvent;
