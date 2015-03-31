// userinfo.ts
//
import ko = require('knockout');
//
import InfoData = require('../../infodata');
import BaseItem = require('../domain/baseitem');
import Person = require('../domain/person');
import Departement = require('../domain/departement');
import Annee = require('../domain/annee');
import Unite = require('../domain/unite');
import Groupe = require('../domain/groupe');
import Matiere = require('../domain/matiere');
import Semestre = require('../domain/semestre');
import Enseignant = require('../domain/enseignant');
import Etudiant = require('../domain/etudiant');
//
import ItemDataManager = require('../services/itemdatamanager');
//
class UserInfo {
  dataService: InfoData.IDataManager;
  _person: KnockoutObservable<InfoData.IPerson>;
  _departement: KnockoutObservable<InfoData.IDepartement>;
  annees: KnockoutObservableArray<InfoData.IAnnee>;
  _annee: KnockoutObservable<InfoData.IAnnee>;
  semestres: KnockoutObservableArray<InfoData.ISemestre>;
  departements: KnockoutObservableArray<InfoData.IDepartement>;
  groupes: KnockoutObservableArray<InfoData.IGroupe>;
  unites: KnockoutObservableArray<InfoData.IUnite>;
  _unite: KnockoutObservable<InfoData.IUnite>;
  matieres: KnockoutObservableArray<InfoData.IMatiere>;
  //
  matiere: KnockoutObservable<InfoData.IMatiere>;
  enseignant: KnockoutObservable<InfoData.IEnseignant>;
  etudiant: KnockoutObservable<InfoData.IEtudiant>;
  semestre: KnockoutObservable<InfoData.IDepartement>;
  groupe: KnockoutObservable<InfoData.IGroupe>;
  //
  person: KnockoutComputed<InfoData.IPerson>;
  departement: KnockoutComputed<InfoData.IDepartement>;
  annee: KnockoutComputed<InfoData.IAnnee>;
  unite: KnockoutComputed<InfoData.IUnite>;
  //
  isConnected: KnockoutComputed<boolean>;
  isAdmin: KnockoutComputed<boolean>;
  //
  _matieres: InfoData.IMatiere[];
  _annees: InfoData.IAnnee[];
  _semestres: InfoData.ISemestre[];
  _unites: InfoData.IUnite[];
  _groupes: InfoData.IGroupe[];
  //
  constructor(service?:InfoData.IDataManager) {
    this.dataService = ((service !== undefined) && (service !== null)) ? service : new ItemDataManager();
    this._person = ko.observable(null);
    this._departement = ko.observable(null);
    this._annee = ko.observable(null);
    this._unite = ko.observable(null);
    this.matiere = ko.observable(null);
    this.enseignant = ko.observable(null);
    this.etudiant = ko.observable(null);
    this.semestre = ko.observable(null);
    this.groupe = ko.observable(null);
    this._person = ko.observable(null);
    //
    this.departements = ko.observableArray([]);
    this.annees = ko.observableArray([]);
    this.unites = ko.observableArray([]);
    this.matieres = ko.observableArray([]);
    this.groupes = ko.observableArray([]);
    this.semestres = ko.observableArray([]);
    //
    this._annees = null;
    this._semestres = null;
    this._matieres = null;
    this._unites = null;
    this._groupes = null;
    //
    this.isConnected = ko.computed(() => {
      var p = this._person();
      return (p !== null) && (p.id !== null);
    }, this);
    this.isAdmin = ko.computed(() => {
      var p = this._person();
      return (p !== null) && (p.id !== null) && p.is_admin;
    }, this);
    //
    this.unite = ko.computed({
      read: () => {
        return this._unite();
      },
      write: (s: InfoData.IUnite) => {
        this._unite(s);
        this.matieres([]);
        this.matiere(null);
        if ((s !== undefined) && (s !== null) && (s.id !== null)) {
          var id = s.id;
          if (this.isAdmin()) {
            this.dataService.get_items(new Matiere({ uniteid: id })).then((mm: InfoData.IMatiere[]) => {
              this.matieres(mm);
              if ((mm !== null) && (mm.length > 0)) {
                this.matiere(mm[0]);
              }
            });
          } else {
            var pp = this._matieres;
            if ((pp !== null) && (pp.length > 0)) {
              var mm = [];
              for (var i = 0; i < pp.length; ++i) {
                var x = pp[i];
                if (x.uniteid == id) {
                  mm.push(x);
                }
              }// i
              this.matieres(mm);
              if (mm.length > 0) {
                this.matiere(mm[0]);
              }
            }
          }
        }
      },
      owner: this
    });
    this.annee = ko.computed({
      read: () => {
        return this._annee();
      },
      write: (s: InfoData.IAnnee) => {
        this._annee(s);
        this.semestres([]);
        this.semestre(null);
        if ((s !== undefined) && (s !== null) && (s.id !== null)) {
          var id = s.id;
          if (this.isAdmin()) {
            this.dataService.get_items(new Semestre({ anneeid: id })).then((mm: InfoData.ISemestre[]) => {
              this.semestres(mm);
              if ((mm !== null) && (mm.length > 0)) {
                this.semestre(mm[0]);
              }
            });
          } else {
            var pp = this._semestres;
            if ((pp !== null) && (pp.length > 0)) {
              var mm = [];
              for (var i = 0; i < pp.length; ++i) {
                var x = pp[i];
                if (x.anneeid == id) {
                  mm.push(x);
                }
              }// i
              this.semestres(mm);
              if (mm.length > 0) {
                this.semestre(mm[0]);
              }
            }
          }
        }
      },
      owner: this
    });
    this.departement = ko.computed({
      read: () => {
        return this._departement();
      },
      write: (s: InfoData.IDepartement) => {
        this._departement(s);
        this.groupes([]);
        this.groupe(null);
        this.annees([]);
        this.annee(null);
        this.unites([]);
        this.unite(null);
        if ((s !== undefined) && (s !== null) && (s.id !== null)) {
          var id = s.id;
          if (this.isAdmin()) {
            this.dataService.get_items(new Groupe({ departementid: id })).then((mm: InfoData.IGroupe[]) => {
              this.groupes(mm);
              if ((mm !== null) && (mm.length > 0)) {
                this.groupe(mm[0]);
              }
            });
            this.dataService.get_items(new Unite({ departementid: id })).then((mm: InfoData.IUnite[]) => {
              this.unites(mm);
              if ((mm !== null) && (mm.length > 0)) {
                this.unite(mm[0]);
              }
            });
            this.dataService.get_items(new Annee({ departementid: id })).then((mm: InfoData.IAnnee[]) => {
              this.annees(mm);
              if ((mm !== null) && (mm.length > 0)) {
                this.annee(mm[0]);
              }
            });
          } else {
            var pp = this._annees;
            if ((pp !== null) && (pp.length > 0)) {
              var mm = [];
              for (var i = 0; i < pp.length; ++i) {
                var x = pp[i];
                if (x.departementid == id) {
                  mm.push(x);
                }
              }// i
              this.annees(mm);
              if (mm.length > 0) {
                this.annee(mm[0]);
              }
            }
            var pu = this._unites;
            if ((pp !== null) && (pp.length > 0)) {
              var mm = [];
              for (var i = 0; i < pp.length; ++i) {
                var x = pp[i];
                if (x.departementid == id) {
                  mm.push(x);
                }
              }// i
              this.unites(mm);
              if (mm.length > 0) {
                this.unite(mm[0]);
              }
            }
            var pg = this._groupes;
            if ((pp !== null) && (pp.length > 0)) {
              var mm = [];
              for (var i = 0; i < pp.length; ++i) {
                var x = pp[i];
                if (x.departementid == id) {
                  mm.push(x);
                }
              }// i
              this.groupes(mm);
              if (mm.length > 0) {
                this.groupe(mm[0]);
              }
            }

          }
        }
      },
      owner: this
    });
    this.person = ko.computed({
      read: () => {
        return this._person();
      },
      write: (s: InfoData.IPerson) => {
        this._person(s);
        this.departements([]);
        this._departement(null);
        this._annee(null);
        this._unite(null);
        this.matiere(null);
        this.enseignant(null)
        this.etudiant(null);
        this.semestre(null);
        this.groupe(null);
        this.annees([]);
        this.unites([]);
        this.matieres([]);
        this.groupes([]);
        this._annees = null;
        this._semestres = null;
        this._matieres = null;
        this._unites = null;
        this._groupes = null;
      },
      owner: this
    });
  }// constructor
  private _post_login(p: InfoData.IPerson): Q.IPromise<boolean> {
    this.person(p);
    var bRet: boolean = true;
    var service = this.dataService;
    return Q.Promise((resolve, reject) => {
      if (p.is_admin) {
        service.get_items(new Departement()).then((dd: InfoData.IDepartement[]) => {
          this.departements(dd);
          if ((dd !== undefined) && (dd !== null) && (dd.length > 0)) {
            this.departement(dd[0]);
          }
          resolve(bRet);
        }, (err) => {
            resolve(bRet);
          });
      } else {
        service.get_items_array(new Groupe(), p.groupeids).then((gg: InfoData.IGroupe[]) => {
          this._groupes = gg;
          service.get_items_array(new Matiere(), p.matiereids).then((mm: InfoData.IMatiere[]) => {
            this._matieres = mm;
            service.get_items_array(new Semestre(), p.semestreids).then((ss: InfoData.ISemestre[]) => {
              this._semestres = ss;
              service.get_items_array(new Annee(), p.anneeids).then((aa: InfoData.IAnnee[]) => {
                this._annees = aa;
                service.get_items_array(new Unite(), p.uniteids).then((uu: InfoData.IUnite[]) => {
                  this._unites = uu;
                  service.get_items_array(new Departement(), p.departementids).then((dd: InfoData.IDepartement[]) => {
                    this.departements(dd);
                    if ((dd !== undefined) && (dd !== null) && (dd.length > 0)) {
                      this.departement(dd[0]);
                    }
                    resolve(bRet);
                  });
                });
              });
            });
          });
        });
      }
    });
  }// _post_login
  public disconnect():void {
    this.person(null);
  }
  public connect(username: string, password: string): Q.IPromise<boolean> {
    return Q.Promise((resolve, reject) => {
      var suser = ((username !== undefined) && (username !== null) &&
        (username.trim().length > 0)) ?
        username.trim().toLowerCase() : null;
      var spass = ((password !== undefined) && (password !== null) &&
        (password.trim().length > 0)) ?
        password.trim() : null;
      if (suser === null) {
        resolve(false);
      } else {
        var model = new Person({ username: suser });
        this.dataService.get_one_item(model).then((p: InfoData.IPerson) => {
          if ((p !== undefined) && (p !== null) && (p.id !== null)) {
            var bOk = true;
            if (p.password !== null) {
              if (spass === null) {
                bOk = false;
              } else {
                bOk = p.check_password(spass);
              }
            }
            if (!bOk) {
              resolve(false);
            } else {
              this._post_login(p).then((bRet: boolean) => {
                resolve(bRet);
              });
            }
          } else {
            resolve(false);
          }
        }, (err) => {
            reject(err);
          });
      }
    });
  }// connect
}// class UserInfo
var pv = new UserInfo();
export = pv;
