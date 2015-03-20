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
  public add_role(id: string): void {
  }
  public remove_role(id: string): void {
  }
  public get type(): string {
    return "etudperson";
  }
  //
  public get dossier(): string {
    return (this._dossier !== undefined) ? this._dossier : null;
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
    return (this._sexe !== undefined) ? this._sexe : null;
  }
  public set sexe(s) {
    this._sexe = ((s !== undefined) &&
    (s !== null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_sexe(): boolean {
    return (this.sexe !== null);
  }
  //
  public get birthDate(): Date {
    return (this._date !== undefined) ? this._date : null;
  }
  public set birthDate(s: Date) {
    this._date = BaseItem.check_date(s);
  }
  public get has_birthDate(): boolean {
    return (this.birthDate !== null);
  }
  //
  public get ville(): string {
    return (this._ville !== undefined) ? this._ville : null;
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
    return (this._etablissement !== undefined) ? this._etablissement : null;
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
    return (this._seriebac !== undefined) ? this._seriebac : null;
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
    return (this._optionbac !== undefined) ? this._optionbac : null;
  }
  public set optionBac(s: string) {
    this._optionbac = ((s !== undefined) &&
    (s != null) && (s.trim().length > 0)) ? s.trim().toLowerCase() : null;
  }
  public get has_optionBac(): boolean {
    return (this.optionBac !== null);
  }
  public get mentionBac(): string {
    return (this._mentionbac !== undefined) ? this._mentionbac : null;
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
    return (this._sup !== undefined) ? this._sup : null;
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
    if (this.has_dossier) {
      oMap.dossier = this.dossier;
    }
    if (this.has_sexe) {
      oMap.sexe = this.sexe;
    }
    if (this.has_birthDate) {
      oMap.birthDate = this.birthDate;
    }
    if (this.has_ville) {
      oMap.ville = this.ville;
    }
    if (this.has_etablissement) {
      oMap.etablissement = this.etablissement;
    }
    if (this.has_serieBac) {
      oMap.serieBac = this.serieBac;
    }
    if (this.has_optionBac) {
      oMap.optionBac = this.optionBac;
    }
    if (this.has_mentionBac) {
      oMap.mentionBac = this.mentionBac;
    }
    if (this.has_etudesSuperieures) {
      oMap.etudesSuperieures = this.etudesSuperieures;
    }
  } // to_insert_map
  public to_fetch_map(oMap:any) : void {
    super.to_fetch_map(oMap);
    if (this.has_dossier) {
      oMap.dossier = this.dossier;
    }
    if (this.has_sexe) {
      oMap.sexe = this.sexe;
    }
    if (this.has_birthDate) {
      oMap.birthDate = this.birthDate;
    }
    if (this.has_ville) {
      oMap.ville = this.ville;
    }
    if (this.has_etablissement) {
      oMap.etablissement = this.etablissement;
    }
    if (this.has_serieBac) {
      oMap.serieBac = this.serieBac;
    }
    if (this.has_optionBac) {
      oMap.optionBac = this.optionBac;
    }
    if (this.has_mentionBac) {
      oMap.mentionBac = this.mentionBac;
    }
    if (this.has_etudesSuperieures) {
      oMap.etudesSuperieures = this.etudesSuperieures;
    }
  }
} // class EtudiantPerson
export = EtudiantPerson;
