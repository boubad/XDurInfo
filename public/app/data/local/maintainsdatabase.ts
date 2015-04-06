// maintainsdatabase.ts
//
/// <reference path='../../../lib/typings/pouchdb/pouchdb.d.ts' />
//
import Q = require('q');
import PouchDB = require('pouchdb');
import InfoData = require('../../infodata');
import CouchDatabase = require('./couchlocaldatabase');
//
class MaintainsDatabase extends CouchDatabase {
    constructor(xname?: string){
      super(xname);
    }
    public create_design_docs(): Q.IPromise<any> {
      var pp = [];
      pp.push(this.create_persons_design_docs());
      pp.push(this.create_departements_design_docs());
      pp.push(this.create_groupes_design_docs());
      pp.push(this.create_unites_design_docs());
      pp.push(this.create_annees_design_docs());
      pp.push(this.create_semestres_design_docs());
      pp.push(this.create_matieres_design_docs());
      pp.push(this.create_etudiants_design_docs());
      pp.push(this.create_enseignants_design_docs());
      pp.push(this.create_operators_design_docs());
      pp.push(this.create_administrators_design_docs());
      pp.push(this.create_profaffectations_design_docs());
      pp.push(this.create_etudaffectations_design_docs());
      pp.push(this.create_groupeevents_design_docs());
      pp.push(this.create_etudevents_design_docs());
      return Q.all(pp);
    }//create_design_docs
    public create_persons_design_docs(): Q.IPromise<PouchUpdateResponse> {
      var ddoc = {
        _id: '_design/persons',
        views: {
          by_username: {
            map: function(doc) {
              if (doc.type !== undefined) {
                if ((doc.type == 'person') || (doc.type == 'profperson') ||
                  (doc.type == 'etudperson') || (doc.type == 'operperson') ||
                  (doc.type == 'adminperson')) {
                  if (doc.username !== undefined) {
                    var name = doc.lastname + ' ' + doc.firstname;
                    var avatarid = (doc.avatarid) ? doc.avatarid : null;
                    emit(doc.username,[name,avatarid]);
                  }
                }
              }
            }.toString()
          }
        }
      };
      return this._maintains_doc(ddoc);
    }//create_persons_design_docs
    public create_departements_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/departements',
            views: {
              by_sigle: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'departement')) {
                    if (doc.sigle !== undefined) {
                      var key = doc.sigle;
                      var val = (doc.name !== undefined) ? doc.name : key;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [val,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_departements_design_docs
    public create_unites_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/unites',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'unite')) {
                    if ((doc.departementid !== undefined) && (doc.sigle !== undefined)) {
                      var key = [doc.departementid,doc.sigle];
                      var val = (doc.name) ? doc.name : doc.sigle;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [val,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_unite_design_docs
    public create_groupes_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/groupes',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'groupe')) {
                    if ((doc.departementid !== undefined) && (doc.sigle !== undefined)) {
                      var key = [doc.departementid,doc.sigle];
                      var val = (doc.name) ? doc.name : doc.sigle;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [val,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_groupe_design_docs
    public create_annees_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/annees',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'annee')) {
                    if ((doc.departementid !== undefined) && (doc.sigle !== undefined)) {
                      var key = [doc.departementid,doc.sigle];
                      var val = (doc.name) ? doc.name : doc.sigle;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [val,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_annees_design_docs
    public create_semestres_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/semestres',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'semestre')) {
                    if ((doc.anneeid !== undefined) && (doc.sigle !== undefined)) {
                      var key = [doc.anneeid,doc.sigle];
                      var val = (doc.name) ? doc.name : doc.sigle;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [val,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_semestres_design_docs
    public create_matieres_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/matieres',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'matiere')) {
                    if ((doc.departementid !== undefined) && (doc.uniteid !== undefined) && (doc.sigle !== undefined)) {
                      var key = [doc.departementid, doc.uniteid, doc.sigle];
                      var val = (doc.name) ? doc.name : doc.sigle;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [val,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_matieres_design_docs
    public create_etudiants_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/etudiants',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'etudiant')) {
                    if ((doc.departementid !== undefined) && (doc.personid !== undefined)) {
                      var key = [doc.departementid, doc.personid];
                      var name = (doc.fullname) ? doc.fullname : null;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [name,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_etudiants_design_docs
    public create_enseignants_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/enseignants',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'etudiant')) {
                    if ((doc.departementid !== undefined) && (doc.personid !== undefined)) {
                      var key = [doc.departementid, doc.personid];
                      var name = (doc.fullname) ? doc.fullname : null;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [name,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_enseignants_design_docs
    public create_operators_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/operators',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'etudiant')) {
                    if ((doc.departementid !== undefined) && (doc.personid !== undefined)) {
                      var key = [doc.departementid, doc.personid];
                      var name = (doc.fullname) ? doc.fullname : null;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [name,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_operator_design_docs
    public create_administrators_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/administrators',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'etudiant')) {
                    if ((doc.departementid !== undefined) && (doc.personid !== undefined)) {
                      var key = [doc.departementid, doc.personid];
                      var name = (doc.fullname) ? doc.fullname : null;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit(key, [name,avatarid]);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_administrators_design_docs
    public create_profaffectations_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/profaffectations',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'profaffectation')) {
                    if ((doc.semestreid !== undefined) && (doc.matiereid !== undefined) &&
                    (doc.enseignantid !== undefined) && (doc.personid !== undefined) &&
                    (doc.groupeid !== undefined)) {
                      var name = (doc.fullname) ? doc.fullname : null;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      var val = [doc.personid,doc.enseignantid,name,avatarid];
                      emit([doc.semestreid,doc.matiereid,doc.groupeid],val);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_profaffectation_design_docs
    public create_etudaffectations_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/etudaffectations',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'etudaffectation')) {
                    if ((doc.semestreid !== undefined) && (doc.groupeid !== undefined) &&
                    (doc.etudiantid !== undefined) && (doc.personid !== undefined)) {
                      var name = (doc.fullname) ? doc.fullname : null;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      var val = [doc.personid,doc.etudiantid,name,avatarid];
                      emit([1,doc.semestreid,doc.groupeid,name],val);
                      emit([2,doc.personid,doc.etudiantid,name],val);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_etudaffectation_design_docs
    public create_groupeevents_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/groupeevents',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'groupeevent')) {
                    if ((doc.semestreid !== undefined) && (doc.matiereid !== undefined)
                     && (doc.profaffectationid !== undefined) && (doc.date !== undefined) &&
                    (doc.name !== undefined) && (doc.enseignantid !== undefined)) {
                      var name = doc.name;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      var val = [doc.date,doc.genre,doc.name,avatarid];
                      emit([1,doc.semestreid,doc.profaffectationid],val);
                      emit([2,doc.semestreid,doc.matiereid],val);
                      emit([3,doc.semestreid,doc.enseignantid],val);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_groupeevents_design_docs
    public create_etudevents_design_docs(): Q.IPromise<PouchUpdateResponse> {
          var ddoc = {
            _id: '_design/etudevents',
            views: {
              by_id: {
                map: function(doc) {
                  if ((doc.type !== undefined) && (doc.type == 'etudevent')) {
                    if ((doc.semestreid !== undefined) && (doc.etudiantid !== undefined) &&
                    (doc.groupeeventid !== undefined) && (doc.personid !== undefined) &&
                    (doc.genre !== undefined)) {
                      var val = [doc.personid,name,avatarid];
                      var name = (doc.fullname) ? doc.fullname : null;
                      var avatarid = (doc.avatarid) ? doc.avatarid : null;
                      emit([1,doc.groupeeventid,doc.genre],val);
                      emit([2,doc.etudiantid,doc.genre],val);
                      emit([3,doc.semestreid,doc.genre],val);
                    }
                  }
                }.toString()
              }
            }
          };
          return this._maintains_doc(ddoc);
    }//create_etudevents_design_docs
} // class MaintainsDatabase
export = MaintainsDatabase;
