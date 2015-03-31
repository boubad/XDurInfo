// person.ts
//
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
import Person = require('./person');
import moment = require('moment');
//
class EtudiantPerson extends Person implements InfoData.IEtudiantPerson {
  private _dossier: string;
  private _sexe: string;
  private _date: Date;
  private _ville: string;
  private _etablissement: string;
  private _seriebac: string;
  private _optionbac: string;
  private _mentionbac: string;
  private _sup: string;
  //
  constructor(oMap?: any) {
    super(oMap);
    this._dossier = null;
    this._sexe = null;
    this._date = null;
    this._ville = null;
    this._etablissement = null;
    this._seriebac = null;
    this._optionbac = null;
    this._mentionbac = null;
    this._sup = null;
    this.roles=['etud'];
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.dossier !== undefined) {
        this.dossier = oMap.dossier;
      }
      if (oMap.sexe !== undefined) {
        this.sexe = oMap.sexe;
      }
      if (oMap.birthDate !== undefined) {
        this.birthDate = oMap.birthDate;
      }
      if (oMap.etablissement !== undefined) {
        this.etablissement = oMap.etablissement;
      }
      if (oMap.ville !== undefined) {
        this.ville = oMap.ville;
      }
      if (oMap.serieBac !== undefined) {
        this.serieBac = oMap.serieBac;
      }
      if (oMap.optionBac !== undefined) {
        this.optionBac = oMap.optionBac;
      }
      if (oMap.mentionBac != undefined) {
        this.mentionBac = oMap.mentionBac;
      }
      if (oMap.etudesSuperieures !== undefined) {
        this.etudesSuperieures = oMap.etudesSuperieures;
      }
    } // oMap
  } // constructor
  public get type(): string {
    return "etudperson";
  }
  //
  public get dossier(): string {
    return this._dossier;
  }
  public set dossier(s: string) {
    this._dossier = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_dossier(): boolean {
    return (this.dossier !== null);
  }
  //
  public get sexe(): string {
    return this._sexe;
  }
  public set sexe(s) {
    this._sexe = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_sexe(): boolean {
    return (this.sexe !== null);
  }
  public get isMale():boolean {
    return ((this.sexe !== null) && (this.sexe == 'masculin'));
  }
  public set isMale(b:boolean){
    if ((b !== undefined) && (b !== null)){
      this._sexe = (b == true) ? 'masculin' : 'feminin';
    }
  }
  public get isFeminin():boolean {
    return ((this.sexe !== null) && (this.sexe == 'feminin'));
  }
  public set isFeminin(b:boolean){
    if ((b !== undefined) && (b !== null)){
      this._sexe = (b == true) ? 'feminin' : 'masculin';
    }
  }
  //
  public get birthDate(): Date {
    return this._date;
  }
  public set birthDate(s: Date) {
    this._date = BaseItem.check_date(s);
  }
  public get has_birthDate(): boolean {
    return (this.birthDate !== null);
  }
  //
  public get ville(): string {
    return this._ville;
  }
  public set ville(s: string) {
    this._ville = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
  }
  public get has_ville(): boolean {
    return (this.ville !== null);
  }
  //
  public get etablissement(): string {
    return this._etablissement;
  }
  public set etablissement(s: string) {
    this._etablissement = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim() : null;
  }
  public get has_etablissement(): boolean {
    return (this.etablissement !== null);
  }
  //
  public get serieBac(): string {
    return this._seriebac;
  }
  public set serieBac(s: string) {
    this._seriebac = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_serieBac(): boolean {
    return (this.serieBac !== null);
  }
  //
  public get optionBac(): string {
    return this._optionbac;
  }
  public set optionBac(s: string) {
    this._optionbac = ((s !== undefined) &&
    (s != null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_optionBac(): boolean {
    return (this.optionBac !== null);
  }
  public get mentionBac(): string {
    return this._mentionbac;
  }
  public set mentionBac(s: string) {
    this._mentionbac = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_mentionBac(): boolean {
    return (this.mentionBac !== null);
  }
  //
  public get etudesSuperieures(): string {
    return this._sup;
  }
  public set etudesSuperieures(s: string) {
    this._sup = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_etudesSuperieures(): boolean {
    return (this.etudesSuperieures !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
      oMap.dossier = this.dossier;
      oMap.sexe = this.sexe;
      oMap.birthDate = this.birthDate;
      oMap.ville = this.ville;
      oMap.etablissement = this.etablissement;
      oMap.serieBac = this.serieBac;
      oMap.optionBac = this.optionBac;
      oMap.mentionBac = this.mentionBac;
      oMap.etudesSuperieures = this.etudesSuperieures;
  } // to_insert_map
  public to_fetch_map(oMap:any) : void {
    super.to_fetch_map(oMap);
      oMap.dossier = this.dossier;
      oMap.sexe = this.sexe;
      oMap.birthDate = this.birthDate;
      oMap.ville = this.ville;
      oMap.etablissement = this.etablissement;
      oMap.serieBac = this.serieBac;
      oMap.optionBac = this.optionBac;
      oMap.mentionBac = this.mentionBac;
      oMap.etudesSuperieures = this.etudesSuperieures;
  }
} // class EtudiantPerson
export = EtudiantPerson;
