// userinfo.ts
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
  public dataService:CouchDatabase;
  private _pers: InfoData.IPerson;
  //
  constructor() {
    super();
    this.dataService = new CouchDatabase();
    this._pers = null;
  }
  public get person(): InfoData.IPerson {
    if ((this._pers !== undefined) && (this._pers !== null)) {
      return this._pers;
    }
    this._pers = this.get_value('person');
    return this._pers;
  }
  public set person(p: InfoData.IPerson) {
    this.store_value('person', p);
    this._pers = this.get_value('person');
  }
  public connect(username:string,password:string):Q.IPromise<boolean> {
    return Q.Promise((resolve,reject)=>{
      this.person = null;
      this.dataService.find_person_by_username(username).then((p:InfoData.IPerson)=>{
        if ((p === undefined) || (p === null)){
          resolve(false);
        } else {
          if (!p.check_password(password)){
            resolve(false);
          } else {
            this.person = p;
            resolve(true);
          }
        }
      },(err)=>{
        reject(err);
      });
    });
  }// connect
  public disconnect(): void {
    this.person = null;
  }
  public get isConnected():boolean {
    return (this.person !== null) && (this.person.id !== null);
  }
}// class UserInfo
//
var pv = new UserInfo();
//
export = pv;
