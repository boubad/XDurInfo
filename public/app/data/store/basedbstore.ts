//basedbsrtore.ds
/// <reference path='../../../lib/typings/q/Q.d.ts' />
//
import Q = require('q');
//
import InfoData = require('../../infodata');
import ItemGenerator = require('../itemgenerator');
import ObjectId = require('./objectid');
import Person = require('../domain/person');
//
interface IStoreItem {
  name: string;
  index: string[];
  unique?: boolean;
}// interface IStoreItem
//
class BaseDBStore extends ItemGenerator {
  //
  private DBNAME: string = 'infodb';
  private VERSION: number = 3;
  private SCHEMA: IStoreItem[] = [
    { name: 'persons', index: ['username', 'lastname'], unique: true },
    { name: 'departements', index: ['sigle'], unique: true },
    { name: 'annees', index: ['departementid', 'sigle'], unique: false },
    { name: 'semestres', index: ['departementid', 'anneeid', 'sigle'], unique: false },
    { name: 'groupes', index: ['departementid', 'sigle'], unique: false },
    { name: 'unites', index: ['departementid', 'sigle'], unique: false },
    { name: 'enseignants', index: ['departementid', 'personid'], unique: false },
    { name: 'etudiants', index: ['departementid', 'personid'], unique: false },
    { name: 'profaffectations', index: ['departementid', 'anneeid', 'semestreid', 'enseignantid', 'uniteid', 'matiereid', 'personid', 'groupeid'], unique: false },
    { name: 'etudaffectations', index: ['departementid', 'anneeid', 'semestreid', 'enseignantid', 'personid', 'groupeid'], unique: false },
    { name: 'groupeevents', index: ['departementid', 'anneeid', 'semestreid', 'enseignantid', 'personid', 'groupeid', 'profaffectationid'], unique: false },
    { name: 'etudevents', index: ['departementid', 'anneeid', 'semestreid', 'etudiantid', 'personid', 'groupeid', 'groupeeventid'], unique: false },
    { name: 'attacheddocs', index: ['name'], unique: false }
  ];
  //
  private _db: IDBDatabase = null;
  //
  constructor() {
    super();
  }// constructor
  private _create_schema(db: IDBDatabase): void {
    var key = '_id';
    var n = this.SCHEMA.length;
    var i = 0;
    for (i = 0; i < n; ++i) {
      var p = this.SCHEMA[i];
      var colname = p.name;
      db.deleteObjectStore(colname);
    }// i
    var personStore = null;
    for (i = 0; i < n; ++i) {
      var p = this.SCHEMA[i];
      var colname = p.name;
      var store = db.createObjectStore(colname, { keyPath: key });
      if (colname == 'persons'){
        personStore = store;
      }
      var m = p.index.length;
      for (var j = 0; j < m; ++j) {
        var indexname = p.index[j];
        if ((m == 1) && (p.unique == true)) {
          store.createIndex(indexname, indexname, { unique: true });
        } else {
          store.createIndex(indexname, indexname);
        }
      }// j
    }// i
    if (personStore !== null){
      var pPers = new Person({username:'admin',
      firstname:'Administrator',lastname:'System',
               roles:['super','admin']});
       pPers.reset_password();
       var oMap = {};
       pPers.to_insert_map(oMap);
       var oo = new ObjectId();
       var id = oo.toString();
       oMap['_id'] = id;
       oMap['_rev'] = 1;
       personStore.add(oMap);
    }
  }// _create_schema
  public close(): void {
    if (this._db !== null) {
      this._db.close();
      this._db = null;
    }
  }// close
  public open(): Q.IPromise<IDBDatabase> {
    return Q.Promise((resolve, reject) => {
      if (this._db !== null) {
        resolve(this._db);
      } else {
        var request: IDBOpenDBRequest = window.indexedDB.open(this.DBNAME, this.VERSION);
        request.onerror = ((evt) => {
          if ((request.error !== undefined) && (request.error !== null)){
            reject(request.error);
          }
        });
        request.onupgradeneeded = (evt: IDBVersionChangeEvent) => {
          var dx = request.result;
          this._create_schema(dx);

        };
        request.onsuccess = (evt) => {
          this._db = request.result;
          resolve(this._db);
        };
      }// try open
    });
  }// open
  //
  get_one_item(item: InfoData.IBaseItem, id: any): Q.IPromise<InfoData.IBaseItem> {
    return Q.Promise((resolve, reject) => {
      if (id === null) {
        reject(new Error("Missing object id"));
      } else {
        var colname = item.collection_name;
        this.open().then((db) => {
          var transaction = db.transaction([colname]);
          var store = transaction.objectStore(colname);
          var singleKeyRange = IDBKeyRange.only(id.toString());
          var cc = store.openCursor(singleKeyRange);
          cc.onerror = (evt) => {
            if ((cc.error !== undefined) && (cc.error !== null)){
              reject(cc.error);
            }
          };
          cc.onsuccess = (evt) => {
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)) {
              var t = this.create_item(cursor);
              resolve(t);
            } else {
              resolve(null);
            }
          };
        });
      }
    });
  }//get_one_item
  //
  find_item_by_index(item: InfoData.IBaseItem, indexname: string, indexval: any):
    Q.IPromise<InfoData.IBaseItem[]> {
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        var colname = item.collection_name;
        var transaction = db.transaction([colname]);
        var store = transaction.objectStore(colname);
        var index = store.index(indexname);
        var cc = index.get(indexval);
        cc.onerror = (evt) => {
          if ((cc.error !== undefined) && (cc.error !== null)){
            reject(cc.error);
          }
        };
        cc.onsuccess = (evt) => {
          var oRet = null;
          var oMap = (cc.result !== undefined) ? cc.result : null;
          if (oMap !== null) {
            oRet = this.create_item(oMap);
          }
          resolve(oRet);
        };
      });
    });
  }//find_item_by_index
  //
  get_items(item: InfoData.IBaseItem, indexname?: string,
    skip?: number, limit?: number): Q.IPromise<InfoData.IBaseItem[]> {
    var offset = ((skip !== undefined) && (skip !== null) && (skip >= 0)) ?
      skip : 0;
    var count = ((limit !== undefined) && (limit !== null) && (limit > 0)) ?
      limit : 16;
    var colname = item.collection_name;
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        var res = [];
        var pos = 0;
        var transaction = db.transaction([colname]);
        var store = transaction.objectStore(colname);
        if ((indexname !== undefined) && (indexname !== null)) {
          var index = store.index(indexname);
          var cc = index.openCursor();
          cc.onerror = (evt) => {
            if ((cc.error !== undefined) && (cc.error !== null)){
              reject(cc.error);
            }
          };
          cc.onsuccess = (evt) => {
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)) {
              if (pos >= offset) {
                var x = this.create_item(cursor.value);
                if (x !== null) {
                  res.push(x);
                }
              }
              ++pos;
              if (res.length < count) {
                cursor.continue();
              } else {
                if ((res.length > 1) && (item.sort_func !== undefined)) {
                  res.sort(item.sort_func);
                }
                resolve(res);
              }
            } else {
              if ((res.length > 1) && (item.sort_func !== undefined)) {
                res.sort(item.sort_func);
              }
              resolve(res);
            }
          };
        } else {
          var cc = store.openCursor();
          cc.onerror = (evt) => {
            if ((cc.error !== undefined) && (cc.error !== null)){
              reject(cc.error);
            }
          };
          cc.onsuccess = (evt) => {
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)) {
              if (pos >= offset) {
                var x = this.create_item(cursor.value);
                if (x !== null) {
                  res.push(x);
                }
              }
              ++pos;
              if (res.length < count) {
                cursor.continue();
              } else {
                if ((res.length > 1) && (item.sort_func !== undefined)) {
                  res.sort(item.sort_func);
                }
                resolve(res);
              }
            } else {
              if ((res.length > 1) && (item.sort_func !== undefined)) {
                res.sort(item.sort_func);
              }
              resolve(res);
            }
          };
        }
      });
    });
  }//get_items
  //
  maintains_one_item(item: InfoData.IBaseItem, bRegister?: boolean): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        var oResult: any = null;
        var oMap = {};
        item.to_insert_map(oMap);
        var id = item.id;
        var colname = item.collection_name;
        var transaction = db.transaction([colname], 'readwrite');
        transaction.onabort = (evt) =>{
          if ((transaction.error !== undefined) &&
            (transaction.error !== null)) {
            reject(transaction.error);
          }
        };
        transaction.oncomplete = (evt) => {
          resolve(oResult);
        };
        var store = transaction.objectStore(colname);
        if (id === null) {
          var oo = new ObjectId();
          id = oo.toString();
          oMap['_id'] = id;
          oMap['_rev'] = 1;
          oMap['localmode'] = 'inserted';
          var request = store.add(oMap);
          request.onsuccess = (evt) => {
            oResult = request.result;
          };
        } else {
          oMap['_id'] = id;
          if ((bRegister === undefined) || (bRegister === null) || (bRegister == false)) {
            if ((item.rev !== null) && (item.rev > 0)) {
              oMap['_rev'] = item.rev + 1;
            } else {
              oMap['_rev'] = 1;
            }
          }
          var singleKeyRange = IDBKeyRange.only(id.toString());
          var cc = store.openCursor(singleKeyRange);
          cc.onsuccess = (evt) => {
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)) {
              cursor.update(oMap);
            } else {
              store.add(oMap);
            }
          };
        }
      });
    });
  }// maintains_one_item
  //
  maintains_items(model:InfoData.IBaseItem,items: InfoData.IBaseItem[], bRegister?: boolean): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        var oResult:any[] = [];
        var colname = model.collection_name;
        var transaction = db.transaction([colname], 'readwrite');
        transaction.onabort = (evt) =>{
          if ((transaction.error !== undefined) &&
            (transaction.error !== null)) {
            reject(transaction.error);
          }
        };
        transaction.oncomplete = (evt) => {
          resolve(oResult);
        };
        var store = transaction.objectStore(colname);
        var n = items.length;
        for (var i = 0; i < n; ++i){
            var item = items[i];
            var oMap = {};
            item.to_insert_map(oMap);
            var id = item.id;
            if (id === null){
              var oo = new ObjectId();
              id = oo.toString();
              oMap['_id'] = id;
              oMap['_rev'] = 1;
              oMap['localmode'] = 'inserted';
              var request = store.add(oMap);
              request.onsuccess = (evt) => {
                var r  = request.result;
                if ((r !== undefined) && (r !== null)){
                  oResult.push(r);
                }
              };
            } else {
              oMap['_id'] = id;
              if ((bRegister === undefined) || (bRegister === null) || (bRegister == false)) {
                if ((item.rev !== null) && (item.rev > 0)) {
                  oMap['_rev'] = item.rev + 1;
                } else {
                  oMap['_rev'] = 1;
                }
              }
              var singleKeyRange = IDBKeyRange.only(id.toString());
              var cc = store.openCursor(singleKeyRange);
              cc.onsuccess = (evt) => {
                var cursor = cc.result;
                if ((cursor !== undefined) && (cursor !== null)) {
                  var req = cursor.update(oMap);
                  req.onsuccess = (evt) => {
                    var r  = req.result;
                    if ((r !== undefined) && (r !== null)){
                      oResult.push(r);
                    }
                  };
                } else {
                  var request  = store.add(oMap);
                  request.onsuccess = (evt) => {
                    var r  = request.result;
                    if ((r !== undefined) && (r !== null)){
                      oResult.push(r);
                    }
                  };
                }
              };
            }
        }// i
      });
    });
  }// maintains_items
  //
  remove_one_item(item: InfoData.IBaseItem): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = item.id;
      if (id === null) {
        reject(new Error("Missing object id"));
      } else {
        var colname = item.collection_name;
        this.open().then((db) => {
          var transaction = db.transaction([colname], 'readwrite');
          transaction.onabort = (evt) =>{
            if ((transaction.error !== undefined) &&
              (transaction.error !== null)) {
              reject(transaction.error);
            }
          };
          transaction.oncomplete = (evt) => {
            resolve(true);
          };
          var store = transaction.objectStore(colname);
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
  }//remove_one_item
  //
  remove_items(model: InfoData.IBaseItem, ids:any[]): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var colname = model.collection_name;
      var oResult:any[] = [];
      var n = ids.length;
      this.open().then((db)=>{
        var transaction = db.transaction([colname], 'readwrite');
        transaction.onabort = (evt) =>{
          if ((transaction.error !== undefined) &&
            (transaction.error !== null)) {
            reject(transaction.error);
          }
        };
        transaction.oncomplete = (evt) => {
          resolve(oResult);
        };
        var store = transaction.objectStore(colname);
        for (var i = 0; i < n; ++i){
            var id = ids[i];
            if ((id !== undefined) && (id !== null)){
              var singleKeyRange = IDBKeyRange.only(id.toString());
              var cc = store.openCursor(singleKeyRange);
              cc.onsuccess = (evt) => {
                var cursor = cc.result;
                if ((cursor !== undefined) && (cursor !== null)) {
                    var request = cursor.delete();
                    request.onsuccess = (evt) =>{
                      var r = request.result;
                      if ((r !== undefined) && (r !== null)){
                        oResult.push(r);
                      }
                    };
                }
              };
            }// i
        }// i
      });
    });
  }//remove_items
  //
}// class BaseDBStore
export = BaseDBStore;
//
