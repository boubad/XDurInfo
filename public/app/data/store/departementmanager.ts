//departementmanager.ts
//
import Q = require('q');
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import BaseDBStore = require('././basedbstore');
//
class DepartementManager extends BaseDBStore {
  constructor() {
    super();
  }// constructor
  get_all_departements(): Q.IPromise<InfoData.IDepartement[]> {
    var item = new Departement();
    return this.get_items(item);
  }// get_all_departements
  find_departement_by_sigle(sigle: string): Q.IPromise<InfoData.IDepartement> {
    var ssigle = ((sigle !== undefined) && (sigle !== null) &&
      (sigle.trim().length > 0)) ? sigle.trim().toLowerCase() : null;
    if (ssigle == null) {
      return Q.reject(new Error("Invalid sigle"));
    }
    return this.find_item_by_index(new Departement(), "sigle", ssigle);
  }// find_departement_by_sigle
  find_departement_by_id(id: any): Q.IPromise<InfoData.IDepartement> {
    if ((id === undefined) || (id === null)) {
      return Q.reject(new Error("Invalid id"));
    }
    return this.get_one_item(new Departement(), id);
  }// find_departement_by_sigle
  insert_departement_if(item: InfoData.IDepartement): Q.IPromise<InfoData.IDepartement> {
    return Q.Promise((resolve, reject) => {
      if ((item === undefined) || (item === null)) {
        reject(new Error('Invalid input data'));
      } else if (!item.is_storeable) {
        reject(new Error('No storeable input data'));
      } else {
        this.find_departement_by_sigle(item.sigle).then((d) => {
          if ((d !== undefined) && (d !== null)) {
            resolve(d);
          } else {
            this.maintains_one_item(item).then((r) => {
              this.find_departement_by_sigle(item.sigle).then((dz) => {
                resolve(dz);
              });
            });
          }
        });
      }
    });
  }//insert_departement_if
  maintains_departement(item: InfoData.IDepartement): Q.IPromise<InfoData.IDepartement> {
    return Q.Promise((resolve, reject) => {
      if ((item === undefined) || (item === null)) {
        reject(new Error('Invalid input data'));
      } else if (!item.is_storeable) {
        reject(new Error('No storeable input data'));
      } else {
        var id = item.id;
        if ((id === undefined) || (id === null)) {
          this.insert_departement_if(item).then((r) => {
            resolve(r);
          });
        } else {
          this.maintains_one_item(item).then((r) => {
            this.find_departement_by_sigle(item.sigle).then((dz) => {
              resolve(dz);
            });
          });
        }
      }
    });
  }// maintains_departement

  remove_departement(item: InfoData.IDepartement): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = ((item !== undefined) && (item !== null)) ? item.id : null;
      if ((id === undefined) || (id === null)) {
        reject(new Error('Invalid input data'));
      } else {
        this.open().then((db) => {
          /*
          var transaction = db.transaction(['departements', 'annees', 'semestres',
            'unites','matieres', 'groupes', 'enseignants', 'etudiants', 'profaffectations',
            'etudaffectations', 'groupeevents', 'etudevents'], 'readwrite');
            */
            var transaction = db.transaction(['departements'],'readwrite');
          transaction.onabort = (evt) => {
            if ((transaction.error !== undefined) && (transaction.error !== null)) {
              reject(transaction.error);
            }
          };
          transaction.oncomplete = (evt) => {
            resolve(true);
          };
          /*
          this.perform_delete(transaction,'etudevents','departementid');
          this.perform_delete(transaction,'groupeevents','departementid');
          this.perform_delete(transaction,'etudaffectations','departementid');
          this.perform_delete(transaction,'profaffectations','departementid');
          this.perform_delete(transaction,'etudiants','departementid');
          this.perform_delete(transaction,'enseignants','departementid');
          this.perform_delete(transaction,'groupes','departementid');
          this.perform_delete(transaction,'semestres','departementid');
          this.perform_delete(transaction,'matieres','departementid');
          this.perform_delete(transaction,'unites','departementid');
          this.perform_delete(transaction,'annees','departementid');
          */
          var store = transaction.objectStore("departements");
          var singleKeyRange = IDBKeyRange.only(id.toString());
          var cc = store.openCursor(singleKeyRange);
          cc.onsuccess = (evt) => {
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)) {
              cursor.delete();
            }
          };
        });
      }
    });
  }// remove_departement
  //
}// class LocalDataManager
export = DepartementManager;
