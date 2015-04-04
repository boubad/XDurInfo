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
                    emit(doc.username, name);
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
                      emit(key, val);
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
                    if (doc.sigle !== undefined) {
                      var key = doc.id;
                      var val = doc.sigle;
                      emit(key, val);
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
                    if (doc.sigle !== undefined) {
                      var key = doc.id;
                      var val = doc.sigle;
                      emit(key, val);
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
                    if (doc.sigle !== undefined) {
                      var key = doc.id;
                      var val = doc.sigle;
                      emit(key, val);
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
                    if (doc.sigle !== undefined) {
                      var key = doc.id;
                      var val = doc.sigle;
                      emit(key, val);
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
                    if (doc.sigle !== undefined) {
                      var key = doc.id;
                      var val = doc.sigle;
                      emit(key, val);
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
                    if (doc.personid !== undefined) {
                      var key = doc.id;
                      var val = doc.personid;
                      emit(key, val);
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
                  if ((doc.type !== undefined) && (doc.type == 'enseignant')) {
                    if (doc.personid !== undefined) {
                      var key = doc.id;
                      var val = doc.personid;
                      emit(key, val);
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
                  if ((doc.type !== undefined) && (doc.type == 'operator')) {
                    if (doc.personid !== undefined) {
                      var key = doc.id;
                      var val = doc.personid;
                      emit(key, val);
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
                  if ((doc.type !== undefined) && (doc.type == 'administrator')) {
                    if (doc.personid !== undefined) {
                      var key = doc.id;
                      var val = doc.personid;
                      emit(key, val);
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
                    if (doc.personid !== undefined) {
                      var key = doc.id;
                      var val = doc.personid;
                      emit(key, val);
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
                    if (doc.personid !== undefined) {
                      var key = doc.id;
                      var val = doc.personid;
                      emit(key, val);
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
                    if (doc.name !== undefined) {
                      var key = doc.id;
                      var val = doc.name;
                      emit(key, val);
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
                    if (doc.personid !== undefined) {
                      var key = doc.id;
                      var val = doc.personid;
                      emit(key, val);
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
