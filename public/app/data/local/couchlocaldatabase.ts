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
  public _maintains_doc(ddoc: any): Q.IPromise<PouchUpdateResponse> {
    return Q.Promise((resolve, reject) => {
      this.open().then((db) => {
        var id = ddoc._id;
        db.get(id).then((r) => {
          ddoc._rev = r._rev;
          db.put(ddoc).then((rx) => {
            resolve(rx);
          }, (ex) => {
              if (ex.status == 409) {
                resolve({ id: id, ok: false, rev: null });
              } else {
                reject(ex);
              }
            });
        }, (e1) => {
            if (e1.status == 404) {
              db.put(ddoc).then((rx) => {
                resolve(rx);
              }, (ex) => {
                  if (ex.status == 409) {
                    resolve({ id: id, ok: false, rev: null });
                  } else {
                    reject(ex);
                  }
                });
            } else {
              reject(e1);
            }
          });
      }, (err) => {
          reject(err);
        });
    });
  }// __maintains_doc

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
  public get_items_range(item: InfoData.IBaseItem, startKey?: any, endKey?: any,
    skip?: number, limit?: number,
    descending?: boolean, bIncludeEnd?: boolean, bDoc?: boolean,bAttach?:boolean):
    Q.IPromise<any[]> {
    return Q.Promise((resolve, reject) => {
      var indexName = item.index_name;
      var options: PouchAllDocsOptions = {};
      var bGetData: boolean = false;
      if ((startKey !== undefined) && (startKey !== null)) {
        options.startkey = startKey;
      }
      if ((endKey != undefined) && (endKey !== null)) {
        options.endkey = endKey;
      }
      if ((bIncludeEnd !== undefined) && (bIncludeEnd !== null)) {
        options.inclusive_end = bIncludeEnd;
      }
      if ((skip !== undefined) && (skip !== null) && (skip > 0)) {
        options.skip = skip;
      }
      if ((limit !== undefined) && (limit !== null) &&
        (limit > 0)) {
        options.limit = limit;
      }
      if ((descending !== undefined) && (descending !== null)) {
        options.descending = descending;
      }
      if ((bDoc !== undefined) && (bDoc !== null)) {
        options.include_docs = bDoc;
        bGetData = true;
      }
      if ((bAttach !== undefined) && (bAttach !== null)) {
        options.attachments = bAttach;
      }
      var oRet: any[] = [];
      this.open().then((db) => {
      db.query(indexName, options).then((rr) => {
      //  db.allDocs(options).then((rr) => {
          var oMaps: any[] = [];
          if ((rr !== undefined) && (rr !== null)) {
            var data = rr.rows;
            if ((data !== undefined) && (data !== null)) {
              var n = data.length;
              for (var i = 0; i < n; ++i) {
                var r = data[i];
                if ((r.value !== undefined) && (r.value !== null)) {
                  if (r.error || r.deleted) {
                    continue;
                  }
                }
                if (!bGetData) {
                  oRet.push(r);
                } else {
                  var oMap = r.doc;
                  if ((oMap !== undefined) && (oMap !== null)) {
                    oMaps.push(oMap);
                  }// oMap
                }
              }// i
            }// data
            if (bGetData) {
              oRet = this.convert_items(oMaps);
            }
          }// rr
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
  public get_items_count(item: InfoData.IBaseItem, startKey?: string, endKey?: string): Q.IPromise<number> {
    return Q.Promise((resolve, reject) => {
      var indexName = item.index_name;
      var options: PouchAllDocsOptions = {
      };
      if ((startKey !== null) && (startKey !== null)) {
        options.startkey = startKey;
      }
      if ((endKey !== undefined) && (endKey !== null)) {
        options.endkey = endKey;
      }
      var oRet: number = 0;
      this.open().then((db) => {
        db.query(indexName, options).then((rr) => {
          if ((rr !== undefined) && (rr !== null)) {
            var oMaps: any[] = [];
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
  public find_person_by_username(username: string): Q.IPromise<InfoData.IBaseItem> {
    var suser = ((username !== undefined) && (username !== null)) ?
      username.trim().toLowerCase() : null;
      if (suser === null){
        return Q.resolve(null);
      } else {
        return this.get_item_by_id('PER-' + suser);
      }
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
              if (e.status == 404){
                resolve(null);
              } else {
                reject(e);
              }
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
              var oMaps: any[] = [];
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
    if ((item === undefined) || (item === null)) {
      return Q.reject({
        status: 2000,
        error: 'Invalid input argument',
        reason: 'CouchDatabase maintains_one_item error'
      });
    } else if (!item.is_storeable) {
      return Q.reject({
        status: 2001,
        error: 'Item not storeable: ' + item.toString(),
        reason: 'CouchDatabase maintains_one_item error'
      });
    }
    var oMap = {};
    item.to_insert_map(oMap);
    var id = item.id;
    if ((id !== null) && (item.rev === null)) {
      return Q.reject({
        status: 2009,
        error: 'Missing rev number: ' + item.toString(),
        reason: 'CouchDatabase maintains_one_item error'
      });
    }
    if (id === null) {
      id = item.create_id();
      oMap['_id'] = id;
    }
    return Q.Promise((resolve, reject) => {
      this._maintains_doc(oMap).then((r) => {
        this.get_item_by_id(id).then((rr) => {
          resolve(rr);
        }, (ex) => {
            reject(ex);
          });
      }, (err) => {
          reject(err);
        });
    });
  }//maintains_one_item
  //
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
              oMaps.push(oMap);
            } else {
              if (item.rev !== null) {
                oMap['_id'] = id;
                oMap['_rev'] = item.rev;
                oMaps.push(oMap);
              }
            }
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
  }// remove_one_item
  //
  public get_attachment(item:InfoData.IBaseItem, attachmentId:string) : Q.IPromise<Blob>{
    var id = ((item !== undefined) && (item !== null)) ? item.id : null;
    var sId = ((attachmentId !== undefined) && (attachmentId !== null)) ?
    attachmentId : null;
    if ((id === null)  || (sId === null)){
      return Q.reject({
        status: 7202,
        error: 'Invalid input data ',
        reason: 'CouchDatabase maintains_attachment error'
      });
    }
   return Q.Promise((resolve,reject) =>{
     this.open().then((db)=>{
       db.getAttachment(id,sId).then((r)=>{
         resolve(r);
       },(ex)=>{
         if (ex.status == 404){
           resolve(null);
         } else {
           reject(ex);
         }
       });
     },(err)=>{
       reject(err);
     });
   });
  }// get_attachment
  //
  public maintains_attachment(item:InfoData.IBaseItem,attachmentId:string,
    attachment:Blob,type:string) : Q.IPromise<boolean>{
     var id = ((item !== undefined) && (item !== null)) ? item.id : null;
     var rev = ((item !== undefined) && (item !== null)) ? item.rev : null;
     var sId = ((attachmentId !== undefined) && (attachmentId !== null)) ?
     attachmentId : null;
     var stype = ((type !== undefined) && (type !== null) && (type.trim().length > 0)) ?
     type.trim(): null;
     var bData = (attachment !== undefined) ? attachment : null;
     if ((id === null) || (rev === null) || (sId === null) || (bData === null)
     || (stype === null)){
       return Q.reject({
         status: 7002,
         error: 'Invalid input data ',
         reason: 'CouchDatabase maintains_attachment error'
       });
     }
    return Q.Promise((resolve,reject) =>{
      this.open().then((db)=>{
        db.putAttachment(id,sId,rev,bData,stype).then((r)=>{
          item.rev = r.rev;
          resolve(true);
        },(ex)=>{
          reject(ex);
        });
      },(err)=>{
        reject(err);
      });
    });
  }// maintains_attachment
  //
  public remove_attachment(item:InfoData.IBaseItem, attachmentId:string) :
   Q.IPromise<boolean>{
     var id = ((item !== undefined) && (item !== null)) ? item.id : null;
     var rev = ((item !== undefined) && (item !== null)) ? item.rev : null;
     var sId = ((attachmentId !== undefined) && (attachmentId !== null)) ?
     attachmentId : null;
     if ((id === null) || (rev === null) || (sId === null)){
       return Q.reject({
         status: 7102,
         error: 'Invalid input data ',
         reason: 'CouchDatabase remove_attachment error'
       });
     }
    return Q.Promise((resolve,reject) =>{
      var bRet:boolean = false;
      this.open().then((db)=>{
        db.removeAttachment(id,sId,rev).then((r)=>{
          item.rev = r.rev;
          resolve(true);
        },(ex)=>{
          reject(ex);
        });
      },(err)=>{
        reject(err);
      });
    });
  }//  remove_attachment
}// class LocalCouchDatabase
export = CouchDatabase;
