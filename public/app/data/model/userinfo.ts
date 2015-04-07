// userinfo.ts
declare var window;
//
import InfoData = require('../../infodata');
import Q = require('q');
import UserSessionStore = require('./usersessionstore');
//
import CouchDatabase  = require('../local/couchlocaldatabase');
//import Person = require('../domain/person');
//
class UserInfo extends UserSessionStore {
  //
  public dataService:InfoData.IDatabaseManager;
  private _pers: InfoData.IPerson;
  public avatarUrl:string;
  public _departement:InfoData.IDepartement;
  public _annee:InfoData.IAnnee;
  public _semestre:InfoData.ISemestre;
  public _unite:InfoData.IUnite;
  public _matiere:InfoData.IMatiere;
  public _groupe:InfoData.IGroupe;
  public _enseignant:InfoData.IEnseignant;
  public _etudiant:InfoData.IEtudiant;
  public _profaffectation:InfoData.IProfAffectation;
  public _groupeevent:InfoData.IGroupeEvent;
  //
  constructor(server?:InfoData.IDatabaseManager) {
    super();
    this.dataService = ((server !== undefined) && (server !== null)) ?
    server : new CouchDatabase();
    this._pers = null;
    this.avatarUrl = null;
    this._departement = null;
    this._annee = null;
    this._semestre = null;
    this._unite = null;
    this._matiere = null;
    this._groupe = null;
    this._enseignant = null;
    this._etudiant = null;
    this._profaffectation = null;
    this._groupeevent = null;
  }// constructor
  //
  public get groupeevent(): InfoData.IGroupeEvent {
    if ((this._groupeevent !== undefined) && (this._groupeevent !== null)) {
      return this._groupeevent;
    }
    this._groupeevent = this.get_value('groupeevent');
    return this._groupeevent;
  }
  public set groupeevent(p: InfoData.IGroupeEvent) {
    this._groupeevent = null;
    this.store_value('groupeevent', p);
    this._groupeevent = this.get_value('groupeevent');
  }
  //
  public get profaffectation(): InfoData.IProfAffectation {
    if ((this._profaffectation !== undefined) && (this._profaffectation !== null)) {
      return this._profaffectation;
    }
    this._profaffectation = this.get_value('profaffectation');
    return this._profaffectation;
  }
  public set profaffectation(p: InfoData.IProfAffectation) {
    this._profaffectation = null;
    this.store_value('profaffectation', p);
    this._profaffectation = this.get_value('profaffectation');
  }
  //
  public get etudiant(): InfoData.IEtudiant {
    if ((this._etudiant !== undefined) && (this._etudiant !== null)) {
      return this._etudiant;
    }
    this._etudiant = this.get_value('etudiant');
    return this._etudiant;
  }
  public set etudiant(p: InfoData.IEtudiant) {
    this._etudiant = null;
    this.store_value('etudiant', p);
    this._etudiant = this.get_value('etudiant');
  }
  //
  public get enseignant(): InfoData.IEnseignant {
    if ((this._enseignant !== undefined) && (this._enseignant !== null)) {
      return this._enseignant;
    }
    this._enseignant = this.get_value('enseignant');
    return this._enseignant;
  }
  public set enseignant(p: InfoData.IEnseignant) {
    this._enseignant = null;
    this.store_value('enseignant', p);
    this._enseignant = this.get_value('enseignant');
  }
  //
  public get groupe(): InfoData.IGroupe {
    if ((this._groupe !== undefined) && (this._groupe !== null)) {
      return this._groupe;
    }
    this._groupe = this.get_value('groupe');
    return this._groupe;
  }
  public set groupe(p: InfoData.IGroupe) {
    this._groupe = null;
    this.store_value('groupe', p);
    this._groupe = this.get_value('groupe');
  }
  //
  public get matiere(): InfoData.IMatiere {
    if ((this._matiere !== undefined) && (this._matiere !== null)) {
      return this._matiere;
    }
    this._matiere = this.get_value('matiere');
    return this._matiere;
  }
  public set matiere(p: InfoData.IMatiere) {
    this._matiere = null;
    this.store_value('matiere', p);
    this._matiere = this.get_value('matiere');
  }
  //
  public get unite(): InfoData.IUnite {
    if ((this._unite !== undefined) && (this._unite !== null)) {
      return this._unite;
    }
    this._unite = this.get_value('unite');
    return this._unite;
  }
  public set unite(p: InfoData.IUnite) {
    this._unite = null;
    this.store_value('unite', p);
    this._unite = this.get_value('unite');
  }
  //
  public get semestre(): InfoData.ISemestre {
    if ((this._semestre !== undefined) && (this._semestre !== null)) {
      return this._semestre;
    }
    this._semestre = this.get_value('semestre');
    return this._semestre;
  }
  public set semestre(p: InfoData.ISemestre) {
    this._semestre = null;
    this.store_value('semestre', p);
    this._semestre = this.get_value('semestre');
  }
  //
  public get annee(): InfoData.IAnnee {
    if ((this._annee !== undefined) && (this._annee !== null)) {
      return this._annee;
    }
    this._annee = this.get_value('annee');
    return this._annee;
  }
  public set annee(p: InfoData.IAnnee) {
    this._annee = null;
    this.store_value('annee', p);
    this._annee = this.get_value('annee');
  }
  //
  public get departement(): InfoData.IDepartement {
    if ((this._departement !== undefined) && (this._departement !== null)) {
      return this._departement;
    }
    this._departement = this.get_value('departement');
    return this._departement;
  }
  public set departement(p: InfoData.IDepartement) {
    this._departement = null;
    this.store_value('departement', p);
    this._departement = this.get_value('departement');
  }
  //
  public get person(): InfoData.IPerson {
    if ((this._pers !== undefined) && (this._pers !== null)) {
      return this._pers;
    }
    this._pers = this.get_value('person');
    return this._pers;
  }
  public set person(p: InfoData.IPerson) {
    this._pers = null;
    this.store_value('person', p);
    this._pers = this.get_value('person');
  }
  //

  public connect(username:string,password:string):Q.IPromise<InfoData.IPerson> {
    return Q.Promise((resolve,reject)=>{
      var vRet:InfoData.IPerson = null;
      this.person = null;
      this.avatarUrl = null;
      this.dataService.find_person_by_username(username).then((p:InfoData.IPerson)=>{
        if ((p === undefined) || (p === null)){
          resolve(vRet);
        } else {
          if (!p.check_password(password)){
            resolve(vRet);
          } else {
            vRet = p;
            this.person = p;
            var avatar = p.avatarid;
            if (avatar !== null){
               this.dataService.get_attachment(p,avatar).then((data)=>{
                 if ((data !== undefined) && (data !== null)){
                    this.avatarUrl = window.URL.createObjectURL(data);
                 }
                 resolve(vRet);
               },(ex)=>{
                 resolve(vRet);
               });
            } else {
              resolve(vRet);
            }
          }
        }
      },(err)=>{
        reject(err);
      });
    });
  }// connect
  public disconnect(): void {
    this.person = null;
    this.avatarUrl = null;
    this.departement = null;
    this.annee = null;
    this.semestre = null;
    this.unite = null;
    this.matiere = null;
    this.groupe = null;
    this.enseignant = null;
    this.etudiant = null;
    this.profaffectation = null;
    this.groupeevent = null;
  }
  public get hasPhoto():boolean {
    return (this.avatarUrl !== undefined) && (this.avatarUrl !== null);
  }
  public get isConnected():boolean {
    return (this.person !== null) && (this.person.id !== null);
  }
  public get isProf():boolean {
    return (this.person !== null) && this.person.is_prof;
  }
  public get isSuper():boolean{
    return (this.person !== null) && this.person.is_super;
  }
  public get isOper():boolean {
    if (this.person !== null){
      return (this.person.is_admin || this.person.is_super || this.person.is_oper);
    } else {
      return false;
    }
  }
  public get isAdmin():boolean {
    if (this.person !== null){
      return (this.person.is_admin || this.person.is_super);
    } else {
      return false;
    }
  }
}// class UserInfo
//
export = UserInfo;
