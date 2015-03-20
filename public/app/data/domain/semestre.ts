//semestre.ts
import InfoData = require('../../infodata');
import IntervalItem = require('./intervalitem');
//
class Semestre extends IntervalItem implements InfoData.ISemestre {
  private _anneeid: any;
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.anneeid != undefined) {
        this.anneeid = oMap.anneeid;
      }
    }// oMap
  } // constructor
  public get anneeid(): any {
    return (this._anneeid != undefined) ? this._anneeid : null;
  }
  public set anneeid(s: any) {
    if ((s != undefined) && (s != null) && (s.toString().trim().length > 0)) {
      this._anneeid = s;
    } else {
      this._anneeid = null;
    }
  }
  public get has_anneeid(): boolean {
    return (this.anneeid != null);
  }
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      this.has_departementid && this.has_sigle && this.has_anneeid &&
      this.has_startDate && this.has_endDate &&
      (this.startDate.getTime() <= this.endDate.getTime());
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    if (this.has_anneeid) {
      oMap.anneeid = this.anneeid;
    }
  }// to_insert_map
  public get type(): string {
    return 'semestre';
  }
  public get collection_name(): string {
    return 'semestres';
  }
} // class Annee
export = Semestre;
