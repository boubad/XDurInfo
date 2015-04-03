//matiere.ts
import InfoData = require('../../infodata');
//
import DepartementSigleNameItem = require('./departementsiglename');
//
class Matiere extends DepartementSigleNameItem implements InfoData.IMatiere {
  _uniteid: any;
  _coef: number;
  _ecs: number;
  _genre: string;
  _module: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._uniteid = null;
    this._coef = null;
    this._ecs = null;
    this._genre = null;
    this._module = null;
    if ((oMap != undefined) && (oMap != null)) {
      if (oMap.uniteid != undefined) {
        this.uniteid = oMap.uniteid;
      }
      if (oMap.coefficient != undefined) {
        this.coefficient = oMap.coefficient;
      }
      if (oMap.ecs != undefined) {
        this.ecs = oMap.ecs;
      }
      if (oMap.genre != undefined) {
        this.genre = oMap.genre;
      }
      if (oMap.mat_module != undefined) {
        this.mat_module = oMap.mat_module;
      }
    }// oMap
  } // constructor
  public create_id():  string{
    return 'MAT-' + this.uniteid + '-' + this.sigle.toUpperCase();
  }// create_id
  public get type(): string {
    return 'matiere';
  }
  public get collection_name(): string {
    return 'matieres';
  }
  public get mat_module(): string {
    return this._module;
  }
  public set mat_module(v: string) {
    if ((v != undefined) && (v != null) && (v.trim().length > 0)) {
      this._module = v.trim().toLowerCase();
    } else {
      this._module = null;
    }
  }
  public get has_mat_module(): boolean {
    return (this.mat_module != null);
  }
  public get genre(): string {
    return this._genre;
  }
  public set genre(v: string) {
    if ((v != undefined) && (v != null) && (v.trim().length > 0)) {
      this._genre = v.trim().toLowerCase();
    } else {
      this._genre = null;
    }
  }
  public get has_genre(): boolean {
    return (this.genre != null);
  }
  public get ecs(): number {
    return this._ecs;
  }
  public set ecs(v: number) {
    if ((v != undefined) && (v != null) && (v > 0)) {
      this._ecs = v;
    } else {
      this._ecs = null;
    }
  }
  public get has_ecs(): boolean {
    return (this.ecs != null);
  }
  public get coefficient(): number {
    return this._coef;
  }
  public set coefficient(v: number) {
    if ((v != undefined) && (v != null) && (v > 0)) {
      this._coef = v;
    } else {
      this._coef = null;
    }
  }
  public get has_coefficient(): boolean {
    return (this.coefficient != null);
  }
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
  public get is_storeable(): boolean {
    return (this.type != null) && (this.collection_name != null) &&
      (this.departementid !== null) && (this.uniteid !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.uniteid = this.uniteid;
      oMap.genre = this.genre;
      oMap.mat_module = this.mat_module;
      oMap.coefficient = this.coefficient;
      oMap.ecs = this.ecs;
  }// to_insert_map
} // class Matiere
export = Matiere;
