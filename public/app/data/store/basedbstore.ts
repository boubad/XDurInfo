//basedbsrtore.ds
/// <reference path='../../../lib/typings/q/Q.d.ts' />
//
import Q = require('q');
//
import InfoData = require('../../infodata');
import ItemGenerator = require('../itemgenerator');
//
class BaseDBStore extends ItemGenerator {
  //
  private DBNAME: string = 'Infodb';
  private VERSION: number = 1;
  //
  private _db: IDBDatabase = null;
  //
  constructor() {
    super();
  }// constructor
  private _create_schema(db: IDBDatabase): void {
    var objectStore0 = db.createObjectStore("persons", { keyPath: "id" });
    objectStore0.createIndex("username", "username", { unique: true });
    var objectStore1 = db.createObjectStore("departements", { keyPath: "id" });
    objectStore1.createIndex("sigle", "sigle", { unique: true });
    var objectStore2 = db.createObjectStore("annees", { keyPath: "id" });
    objectStore2.createIndex("departementid", "departementid");
    var objectStore3 = db.createObjectStore("unites", { keyPath: "id" });
    objectStore3.createIndex("departementid", "departementid");
    var objectStore4 = db.createObjectStore("groupes", { keyPath: "id" });
    objectStore4.createIndex("departementid", "departementid");
    var objectStore5 = db.createObjectStore("etudiants", { keyPath: "id" });
    objectStore5.createIndex("departementid", "departementid");
    var objectStore6 = db.createObjectStore("enseignants", { keyPath: "id" });
    objectStore6.createIndex("departementid", "departementid");
    var objectStore7 = db.createObjectStore("matieres", { keyPath: "id" });
    objectStore7.createIndex("uniteid", "uniteid");
    var objectStore8 = db.createObjectStore("semestres", { keyPath: "id" });
    objectStore8.createIndex("anneeid", "anneeid");
    var objectStore9 = db.createObjectStore("profaffectations", { keyPath: "id" });
    objectStore9.createIndex("semestreid", "semestreid");
    var objectStore10 = db.createObjectStore("etudaffectations", { keyPath: "id" });
    objectStore10.createIndex("semestreid", "semestreid");
    var objectStore11 = db.createObjectStore("groupeevents", { keyPath: "id" });
    objectStore11.createIndex("profaffectationid", "profaffectationid");
    var objectStore11 = db.createObjectStore("etudevents", { keyPath: "id" });
    objectStore11.createIndex("groupeeventid", "groupeeventid");
    var objectStore12 = db.createObjectStore("attacheddocs", { keyPath: "id" });
    objectStore12.createIndex("name", "name");
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
          reject(new Error(evt.target.errCode));
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
  get_one_item(item: InfoData.IBaseItem, id:any): Q.IPromise<InfoData.IBaseItem> {
    return Q.Promise((resolve, reject) => {
      if (id === null) {
        reject(new Error("Missing object id"));
      } else {
        var colname = item.collection_name;
        this.open().then((db) => {
          var transaction = db.transaction([colname]);
          transaction.onerror = (evt) => {
            reject(new Error(transaction.error.name));
          };
          var store = transaction.objectStore(colname);
          var singleKeyRange = IDBKeyRange.only(id.toString());
          var cc = store.openCursor(singleKeyRange);
          cc.onsuccess = (evt)=>{
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)){
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
  get_items(item:InfoData.IBaseItem, indexname?:string,
  skip?:number, limit?:number): Q.IPromise<InfoData.IBaseItem[]> {
    var offset = ((skip !== undefined) && (skip !== null) && (skip >= 0)) ? 
    skip : 0;
    var count = ((limit !== undefined) && (limit !== null) && (limit > 0)) ?
    limit : 16;
    var colname = item.collection_name;
    return Q.Promise((resolve, reject) => {
      this.open().then((db)=>{
        var res = [];
        var pos = 0;
         var transaction = db.transaction([colname]);
          transaction.oncomplete = (evt)=>{
            resolve(res);
          };
          transaction.onerror = (evt) => {
            reject(new Error(transaction.error.name));
          };
          var store = transaction.objectStore(colname);
        if ((indexname !== undefined) && (indexname !== null)){
         var index = store.index(indexname);
         var cc = index.openCursor();
         cc.onsuccess = (evt) =>{
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)){
              if (pos >= offset){
                 var x = this.create_item(cursor);
                 if (x !== null){
                   res.push(x);
                 }
              }
              ++pos;
              if (res.length < count){
                cursor.continue();
              } 
            } 
         };
      }else {
        var cc = store.openCursor();
         cc.onsuccess = (evt) =>{
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)){
              if (pos >= offset){
                 var x = this.create_item(cursor);
                 if (x !== null){
                   res.push(x);
                 }
              }
              ++pos;
              if (res.length < count){
                cursor.continue();
              } 
            } 
         };
      }
      });
    });
  }//get_items
  //
  register_one_item(item: InfoData.IBaseItem): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = item.id;
      if (id === null) {
        reject(new Error("Missing object id"));
      } else {
        var colname = item.collection_name;
        this.open().then((db) => {
          var transaction = db.transaction([colname], 'readwrite');
          transaction.oncomplete = (evt) => {
            resolve(true);
          };
          transaction.onerror = (evt) => {
            reject(new Error(transaction.error.name));
          };
          var store = transaction.objectStore(colname);
          var singleKeyRange = IDBKeyRange.only(id.toString());
          var cc = store.openCursor(singleKeyRange);
          cc.onsuccess = (evt)=>{
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)){
                cursor.update(item);
            } else {
                store.add(item);
            }
          };
        });
      }
    });
  }//maintains_one_item
  //
  unregister_one_item(item: InfoData.IBaseItem): Q.IPromise<any> {
    return Q.Promise((resolve, reject) => {
      var id = item.id;
      if (id === null) {
        reject(new Error("Missing object id"));
      } else {
        var colname = item.collection_name;
        this.open().then((db) => {
          var transaction = db.transaction([colname], 'readwrite');
          transaction.oncomplete = (evt) => {
            resolve(true);
          };
          transaction.onerror = (evt) => {
            reject(new Error(transaction.error.name));
          };
          var store = transaction.objectStore(colname);
          var singleKeyRange = IDBKeyRange.only(id.toString());
          var cc = store.openCursor(singleKeyRange);
          cc.onsuccess = (evt)=>{
            var cursor = cc.result;
            if ((cursor !== undefined) && (cursor !== null)){
                cursor.delete();
            }
          };
        });
      }
    });
  }//maintains_one_item
  //
}// class BaseDBStore
export = BaseDBStore;
//
