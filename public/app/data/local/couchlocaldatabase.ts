//couchlocaldatabase.ts
//
/// <reference path='../../../lib/typings/pouchdb/pouchdb.d.ts' />
//
import Q = require('q');
import PouchDB = require('pouchdb');
import InfoData = require('../../infodata');
import ItemGenerator = require('../itemgenerator');
//
//var x = PouchDBFind;
//PouchDB.plugin(x);
//
var LOCALDATABASE_NAME: string = 'geninfo';
//
class CouchDatabase extends ItemGenerator
  implements InfoData.IDatabaseManager {
  //
  public name: string;
  public isLocal: boolean;
  //
  private _db: PouchDB;
  //
  constructor(xname?: string) {
    super();
    this._db = null;
    this.name = ((xname !== undefined) && (xname !== null)) ? xname :
    LOCALDATABASE_NAME;
    var ss = this.name.toLowerCase();
    this.isLocal = (ss.indexOf('http') < 0);
  }// constructor
  //
  public open(): Q.IPromise<PouchDB> {
    return Q.Promise((resolve, reject) => {
      if ((this._db !== undefined) && (this._db !== null)) {
        resolve(this._db);
      } else {
        if (this.isLocal) {
          var xdb = new PouchDB(this.name, { auto_compaction: true }, (err, res) => {
            if ((err !== undefined) && (err !== null)) {
              reject(err);
            } else {
              if ((res !== undefined) && (res !== null)) {
                this._db = res;
                resolve(this._db);
              } else {
                reject({
                  status: 1000,
                  error: 'PouchDB null reference',
                  reason: 'Create PouchDB error'
                });
              }
            }
          });
        } else {
          var xdb = new PouchDB(this.name, (err, res) => {
            if ((err !== undefined) && (err !== null)) {
              reject(err);
            } else {
              if ((res !== undefined) && (res !== null)) {
                this._db = res;
                resolve(this._db);
              } else {
                reject({
                  status: 1000,
                  error: 'PouchDB null reference',
                  reason: 'Create PouchDB error'
                });
              }
            }
          });
        }
      }
    });
  }// open
  public create_design_docs(): Q.IPromise<boolean> {
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        var rev = null;
        db.get('_design/persons').then((r)=>{
          if ((r !== null) && (r !== null)){
            resolve(true);
          } else {
            this.create_persons_design_docs(rev).then((x)=>{
              resolve(true);
            },(e)=>{
              reject(e);
            });
          }
        },(ex)=>{
          this.create_persons_design_docs().then((x)=>{
            resolve(true);
          },(e)=>{
            reject(e);
          });
        });
      }, (err) => {
          reject(err);
        });
    });
  }//create_design_docs
  public create_persons_design_docs(rev?:string): Q.IPromise<boolean> {
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        var ddoc = {
          _id: '_design/persons',
          views:{
            by_username:{
              map: function(doc) {
                if (doc.type !== undefined){
                  if ((doc.type == 'person') || (doc.type == 'profperson') ||
                  (doc.type == 'etudperson') || (doc.type == 'operperson') ||
                  (doc.type == 'adminperson')){
                    if (doc.username !== undefined){
                       var name = doc.lastname + ' ' + doc.firstname;
                      emit(doc.username, name);
                    }
                  }
                }
              }.toString()
            }
          }
        };
        if ((rev !== undefined) && (rev !== null)){
          ddoc['_rev'] = rev;
        }
        db.put(ddoc).then((r)=>{
          db.query('persons/by_username',{limit:0}).then((r)=>{
            resolve(true);
          },(ex)=>{
            reject(ex);
          });
        },(e)=>{
          if (e.status == '409'){
            db.query('persons/by_username',{limit:0}).then((r)=>{
              resolve(true);
            },(ex)=>{
              reject(ex);
            });
          } else {
            reject(e);
          }
        });
      }, (err) => {
          reject(err);
        });
    });
  }//create_persons_design_docs
  public isConnected(): Q.IPromise<boolean> {
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        db.info().then((xinfo) => {
          resolve(true);
        }, (e) => {
            reject(e);
          });
      }, (err) => {
          reject(err);
        });
    });
  }// isConnected
  //
  public get_items_range(startKey:string, endKey:string, limit?:number,
    descending?:boolean) : Q.IPromise<InfoData.IBaseItem[]> {
      return Q.Promise((resolve, reject) => {
        var count = ((limit !== undefined) && (limit !== null) &&
        (limit > 0)) ? limit : 16;
        var bSort = ((descending !== undefined) && (descending !== null)) ?
        descending : false;
        var options = {startkey:startKey, endkey:endKey,
         include_docs:true, limit: count, attachments:true};
         if (bSort){
           options['descending'] = true;
         }
         var oRet:InfoData.IBaseItem[] = [];
         this.open().then((db) => {
           db.allDocs(options).then((rr) => {
             if ((rr !== undefined) && (rr !== null)) {
               var oMaps:any[] = [];
               var data = rr.rows;
               if ((data !== undefined) && (data !== null)) {
                 var n = data.length;
                 for (var i = 0; i < n; ++i) {
                   var r = data[i];
                   var val = r.value;
                   if ((val !== undefined) && (val !== null)) {
                     if ((val.deleted === undefined) && (val.error === undefined)) {
                       var oMap = this.create_item(r.doc);
                       if (oMap !== null) {
                         oMaps.push(oMap);
                       }
                     }
                   }
                 }// i
               }// data
             }// rr
             oRet = this.convert_items(oMaps);
             resolve(oRet);
           }, (e) => {
               reject(e);
             });
         }, (err) => {
             reject(err);
           });
      });
  }//get_items_range
  //
  public get_items_count(startKey:string, endKey:string) : Q.IPromise<number> {
      return Q.Promise((resolve, reject) => {
        var options = {startkey:startKey, endkey:endKey};
         var oRet:number = 0;
         this.open().then((db) => {
           db.allDocs(options).then((rr) => {
             if ((rr !== undefined) && (rr !== null)) {
               var oMaps:any[] = [];
               var data = rr.rows;
               if ((data !== undefined) && (data !== null)) {
                  oRet = data.length;
               }// data
             }// rr
             resolve(oRet);
           }, (e) => {
               reject(e);
             });
         }, (err) => {
             reject(err);
           });
      });
  }//get_items_count
  public find_person_by_username(username:string) : Q.IPromise<InfoData.IBaseItem> {
    var suser = ((username !== undefined) && (username !== null)) ?
    username.trim().toLowerCase(): null;
    return Q.Promise((resolve, reject) => {
      if (suser=== null) {
        resolve(null);
      } else {
        this.open().then((db) => {
          db.query("persons/by_username",
          { include_docs:true, key: suser,
             attachments: true }).then((r) => {
            if ((r !== undefined) && (r !== null) &&
            (r.rows !== undefined) && (r.rows !== null) &&
            (r.rows.length > 0)){
              var v = r.rows[0];
              var x = this.create_item(v.doc);
              resolve(x);
            } else {
              resolve(null);
            }
          }, (e) => {
              resolve(null);
            });
        }, (err) => {
            reject(err);
          });
      }
    });
  }// find_person_by_username
  //
  public get_item_by_id(id: string): Q.IPromise<InfoData.IBaseItem> {
    return Q.Promise((resolve, reject) => {
      if ((id === undefined) || (id === null)) {
        resolve(null);
      } else {
        this.open().then((db) => {
          db.get(id, { attachments: true }).then((r) => {
            var oResult = this.create_item(r);
            resolve(oResult);
          }, (e) => {
              resolve(null);
            });
        }, (err) => {
            reject(err);
          });
      }
    });
  }//get_item_by_id
  //
  public get_items_array(ids: string[]): Q.IPromise<InfoData.IBaseItem[]> {
    var oRet: InfoData.IBaseItem[] = [];
    return Q.Promise((resolve, reject) => {
      if ((ids === undefined) || (ids === null)) {
        resolve(oRet);
      } else {
        this.open().then((db) => {
          db.allDocs({ keys: ids, include_doc: true, attachments: true }).then((rr) => {
            if ((rr !== undefined) && (rr !== null)) {
              var oMaps:any[] = [];
              var data = rr.rows;
              if ((data !== undefined) && (data !== null)) {
                var n = data.length;
                for (var i = 0; i < n; ++i) {
                  var r = data[i];
                  var val = r.value;
                  if ((val !== undefined) && (val !== null)) {
                    if ((val.deleted === undefined) && (val.error === undefined)) {
                      var oMap = this.create_item(r.doc);
                      if (oMap !== null) {
                        oMaps.push(oMap);
                      }
                    }
                  }
                }// i
              }// data
            }// rr
            oRet = this.convert_items(oMaps);
            resolve(oRet);
          }, (e) => {
              reject(e);
            });
        }, (err) => {
            reject(err);
          });
      }
    });
  }//get_items_array
  //
  public maintains_one_item(item: InfoData.IBaseItem):
    Q.IPromise<InfoData.IBaseItem> {
    return Q.Promise((resolve, reject) => {
      if ((item === undefined) || (item === null)) {
        reject({
          status: 2000,
          error: 'Invalid input argument',
          reason: 'CouchDatabase maintains_one_item error'
        });
      } else if (!item.is_storeable) {
        reject({
          status: 2001,
          error: 'Item not storeable: ' + item.toString(),
          reason: 'CouchDatabase maintains_one_item error'
        });
      } else {
        var oMap = {};
        item.to_insert_map(oMap);
        this.open().then((db) => {
          var id = item.id;
          if (id === null) {
            oMap['_id'] = item.create_id();
          } else {
            oMap['_id'] = id;
            oMap['_rev'] = item.rev;
          }
          db.put(oMap).then((r) => {
            if ((r !== undefined) && (r !== null) &&
              (r.ok !== undefined) && (r.id !== undefined) &&
              (r.rev !== undefined) && (r.ok == true)) {
              item.id = r.id;
              item.rev = r.rev;
              resolve(item);
            } else {
              reject({
                status: 2002,
                error: 'Bad response ',
                reason: 'CouchDatabase maintains_one_item error'
              });
            }
          }, (e) => {
              if (e.status == '409') {
                resolve(item);
              } else {
                reject(e);
              }
            });
        }, (err) => {
            reject(err);
          });
      }
    });
  }// maintains_one_item
  public maintains_items(items: InfoData.IBaseItem[]):
    Q.IPromise<InfoData.IBaseItem[]> {
    return Q.Promise((resolve, reject) => {
      var oMaps: any[] = [];
      if ((items !== undefined) && (items !== null) &&
        (items.length > 0)) {
        var n = items.length;
        for (var i = 0; i < n; ++i) {
          var item = items[i];
          if ((item !== undefined) && (item !== null) &&
            item.is_storeable) {
            var id = item.id;
            var oMap = {};
            item.to_insert_map(oMap);
            if (id === null) {
              oMap['_id'] = item.create_id();
            } else {
              oMap['_id'] = id;
              oMap['_rev'] = item.rev;
            }
            oMaps.push(oMap);
          }// item
        }// i
      }// items
      if (oMaps.length < 1) {
        resolve([]);
      } else {
        this.open().then((db) => {
          db.bulkDocs({ docs: oMaps }).then((rr) => {
            var oResult: InfoData.IBaseItem[] = [];
            if ((rr !== undefined) && (rr !== null)) {
              var nx = rr.length;
              var m = items.length;
              for (var i = 0; i < nx; ++i) {
                var rsp = rr[i];
                if ((rsp !== undefined) && (rsp !== null) &&
                  (rsp.ok !== undefined) && (rsp.ok == true) &&
                  (rsp.id !== undefined) && (rsp.id !== null) &&
                  (rsp.rev !== undefined) && (rsp.rev !== null)) {
                  var vid = rsp.id;
                  for (var j = 0; j < m; ++j) {
                    var item = items[j];
                    if ((item !== undefined) && (item !== null) &&
                      item.is_storeable) {
                      var id = (item.id !== null) ? item.id : item.create_id();
                      if (id == vid) {
                        item.id = id;
                        item.rev = rsp.rev;
                        oResult.push(item);
                      }
                    }// item
                  }// j
                }// rsp
              }// i
            }// rr
            resolve(oResult);
          }, (e) => {
              reject(e);
            });
        }, (err) => {
            reject(err);
          });
      }
    });
  }// maintains_items
  public remove_items(items: InfoData.IBaseItem[]):
    Q.IPromise<boolean> {
    return Q.Promise((resolve, reject) => {
      var oMaps: any[] = [];
      if ((items !== undefined) && (items !== null) &&
        (items.length > 0)) {
        var n = items.length;
        for (var i = 0; i < n; ++i) {
          var item = items[i];
          if ((item !== undefined) && (item !== null) &&
            item.has_id && item.has_rev) {
            var oMap = { _id: item.id, _rev: item.rev, _deleted: true };
            oMaps.push(oMap);
          }// item
        }// i
      }// items
      if (oMaps.length < 1) {
        resolve([]);
      } else {
        this.open().then((db) => {
          db.bulkDocs({ docs: oMaps }).then((rr) => {
            resolve(true);
          }, (e) => {
              reject(e);
            });
        }, (err) => {
            reject(err);
          });
      }
    });
  }// remove_items
  public remove_one_item(item: InfoData.IBaseItem):
    Q.IPromise<boolean> {
    return Q.Promise((resolve, reject) => {
      if ((item === undefined) || (item === null)) {
        reject({
          status: 4000,
          error: 'Invalid input argument',
          reason: 'CouchDatabase remove_one_item error'
        });
      } else if ((!item.has_id) || (!item.has_rev)) {
        reject({
          status: 4001,
          error: 'Item not removeable: ' + item.toString(),
          reason: 'CouchDatabase remove_one_item error'
        });
      } else {
        this.open().then((db) => {
          var oMap = { _id: item.id, _rev: item.rev };
          db.remove(oMap).then((r) => {
            if ((r !== undefined) && (r !== null) &&
              (r.ok !== undefined) && (r.id !== undefined) &&
              (r.rev !== undefined) && (r.ok == true)) {
              resolve(true);
            } else {
              reject({
                status: 4002,
                error: 'Bad response ',
                reason: 'CouchDatabase remove_one_item error'
              });
            }
          }, (e) => {
              reject(e);
            });
        }, (err) => {
            reject(err);
          });
      }
    });
  }// maintains_one_item
}// class LocalCouchDatabase
export = CouchDatabase;
