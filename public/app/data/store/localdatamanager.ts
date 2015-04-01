//localdatamanager.ts
//
import Q = require('q');
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import BaseDBStore = require('././basedbstore');
//
class LocalDataManager extends BaseDBStore {
  constructor() {
    super();
  }// constructor
  get_all_departements(): Q.IPromise<Departement[]> {
    var item = new Departement();
    return this.get_items(item);
  }// get_all_departements
  //
  remove_etudevent(item: InfoData.IBaseItem, transaction: IDBTransaction): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = item.id.toString();
      var store2 = transaction.objectStore("etudevents");
      var singleKeyRange = IDBKeyRange.only(id);
      var cc2 = store2.openCursor(singleKeyRange);
      cc2.onerror = (evt) => {
        if ((cc2.error !== undefined) && (cc2.error !== null)) {
          reject(new Error(cc2.error.name));
        }
      };
      cc2.onsuccess = (evt) => {
        var cursor2 = cc2.result;
        if ((cursor2 !== undefined) && (cursor2 !== null)) {
          cursor2.delete();
        }
        resolve(true);
      };
    });
  }// remove_etudEvent
  //
  remove_groupeevent(item: InfoData.IBaseItem, transaction: IDBTransaction): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = item.id.toString();
      var store1 = transaction.objectStore("etudevents");
      var index1 = store1.index("groupeeventid");
      var cc1 = index1.openCursor();
      cc1.onerror = (evt) => {
        if ((cc1.error !== undefined) && (cc1.error !== null)) {
          reject(new Error(cc1.error.name));
        }
      };
      cc1.onsuccess = (evt) => {
        var cursor1 = cc1.result;
        if ((cursor1 !== undefined) && (cursor1 !== null)) {
          cursor1.delete();
        }// cursor1
        var store2 = transaction.objectStore("groupeevents");
        var singleKeyRange = IDBKeyRange.only(id);
        var cc2 = store2.openCursor(singleKeyRange);
        cc2.onerror = (evt) => {
          if ((cc2.error !== undefined) && (cc2.error !== null)) {
            reject(new Error(cc2.error.name));
          }
        };
        cc2.onsuccess = (evt) => {
          var cursor2 = cc2.result;
          if ((cursor2 !== undefined) && (cursor2 !== null)) {
            cursor2.delete();
          }
          resolve(true);
        };
      };// cc1
    });
  }// remove_groupeEvent
  remove_profaffectation(item: InfoData.IProfAffectation, transaction: IDBTransaction): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = item.id.toString();
      var store1 = transaction.objectStore("groupeevents");
      var index1 = store1.index("profaffectationid");
      var cc1 = index1.openCursor();
      cc1.onerror = (evt) => {
        if ((cc1.error !== undefined) && (cc1.error !== null)) {
          reject(new Error(cc1.error.name));
        }
      };
      var pp = [];
      cc1.onsuccess = (evt) => {
        var cursor1 = cc1.result;
        if ((cursor1 !== undefined) && (cursor1 !== null)) {
          var obj = cursor1.value;
          if ((obj !== undefined) && (obj !== null)) {
            if ((obj['_id'] !== undefined) && (obj['_id'] !== null)) {
              var px = this.create_item(obj);
              pp.push(this.remove_groupeevent(px, transaction));
            }
          }
          cursor1.continue();
        } else {
          if (pp.length > 0) {
            Q.all(pp).then((x) => {
              var store2 = transaction.objectStore("profaffectations");
              var singleKeyRange = IDBKeyRange.only(id);
              var cc2 = store2.openCursor(singleKeyRange);
              cc2.onerror = (evt) => {
                if ((cc2.error !== undefined) && (cc2.error !== null)) {
                  reject(new Error(cc2.error.name));
                }
              };
              cc2.onsuccess = (evt) => {
                var cursor2 = cc2.result;
                if ((cursor2 !== undefined) && (cursor2 !== null)) {
                  cursor2.delete();
                }
                resolve(true);
              };
            });
          } else {
            var store2 = transaction.objectStore("profaffectations");
            var singleKeyRange = IDBKeyRange.only(id);
            var cc2 = store2.openCursor(singleKeyRange);
            cc2.onerror = (evt) => {
              if ((cc2.error !== undefined) && (cc2.error !== null)) {
                reject(new Error(cc2.error.name));
              }
            };
            cc2.onsuccess = (evt) => {
              var cursor2 = cc2.result;
              if ((cursor2 !== undefined) && (cursor2 !== null)) {
                cursor2.delete();
              }
              resolve(true);
            };
          }
        }
      };// cc1
    });
  }// remove_profaffectation
  remove_etudaffectation(item: InfoData.IEtudAffectation, transaction: IDBTransaction): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = item.id.toString();
      var store1 = transaction.objectStore("etudevents");
      var index1 = store1.index("etudaffectationid");
      var cc1 = index1.openCursor();
      cc1.onerror = (evt) => {
        if ((cc1.error !== undefined) && (cc1.error !== null)) {
          reject(new Error(cc1.error.name));
        }
      };
      var pp = [];
      cc1.onsuccess = (evt) => {
        var cursor1 = cc1.result;
        if ((cursor1 !== undefined) && (cursor1 !== null)) {
          var obj = cursor1.value;
          if ((obj !== undefined) && (obj !== null)) {
            if ((obj['_id'] !== undefined) && (obj['_id'] !== null)) {
              var px = this.create_item(obj);
              pp.push(this.remove_etudevent(px, transaction));
            }
          }
          cursor1.continue();
        } else {
          if (pp.length > 0) {
            Q.all(pp).then((x) => {
              var store2 = transaction.objectStore("etudaffectations");
              var singleKeyRange = IDBKeyRange.only(id);
              var cc2 = store2.openCursor(singleKeyRange);
              cc2.onerror = (evt) => {
                if ((cc2.error !== undefined) && (cc2.error !== null)) {
                  reject(new Error(cc2.error.name));
                }
              };
              cc2.onsuccess = (evt) => {
                var cursor2 = cc2.result;
                if ((cursor2 !== undefined) && (cursor2 !== null)) {
                  cursor2.delete();
                }
                resolve(true);
              };
            });
          } else {
            var store2 = transaction.objectStore("etudaffectations");
            var singleKeyRange = IDBKeyRange.only(id);
            var cc2 = store2.openCursor(singleKeyRange);
            cc2.onerror = (evt) => {
              if ((cc2.error !== undefined) && (cc2.error !== null)) {
                reject(new Error(cc2.error.name));
              }
            };
            cc2.onsuccess = (evt) => {
              var cursor2 = cc2.result;
              if ((cursor2 !== undefined) && (cursor2 !== null)) {
                cursor2.delete();
              }
              resolve(true);
            };
          }
        }
      };// cc1
    });
  }// remove_profaffectation
}// class LocalDataManager
export = LocalDataManager;
