//baseviewmodel.ts
/// <reference path='../../../lib/typings/durandal/durandal.d.ts'/>
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
/// <reference path='../../../lib/typings/pouchdb/pouchdb.d.ts'/>
/// <reference path='../../../lib/typings/q/Q.d.ts'/>
//
declare var window:any;
//
import Q = require('q');
import ko = require('knockout');
import InfoData = require('../../infodata');
import userinfo = require('./userinfo');
import CouchDatabase = require('../local/couchlocaldatabase');
//
class BaseViewModel {
  //
  public router:DurandalRouter;
  //
  public username:KnockoutObservable<string>;
  public password:KnockoutObservable<string>;
  //
  public dataService: InfoData.IDatabaseManager;
  public title: KnockoutObservable<string>;
  public error: KnockoutObservable<string>;
  public info: KnockoutObservable<string>;
  public isConnected: KnockoutObservable<boolean>;
  public menu: KnockoutObservableArray<InfoData.IMenuDesc>;
  //
  public person:KnockoutObservable<InfoData.IPerson>;
  public userFullName: KnockoutObservable<string>;
  public userPhotoUrl: KnockoutObservable<string>;

  public isNotConnected: KnockoutComputed<boolean>;
  public isAdmin: KnockoutComputed<boolean>;
  public isProf: KnockoutComputed<boolean>;
  public isSuper: KnockoutComputed<boolean>;
  public isOper: KnockoutComputed<boolean>;
  public hasPhotoUrl: KnockoutComputed<boolean>;
  public hasError: KnockoutComputed<boolean>;
  public hasInfo: KnockoutComputed<boolean>;
  //
  public canConnect:KnockoutComputed<boolean>;
  //
  public _current_data:KnockoutObservable<InfoData.IBaseItem>;
  public description:KnockoutComputed<string>;
  public canSave:KnockoutComputed<boolean>;
  public canRemove:KnockoutComputed<boolean>;
  public canAdd:KnockoutComputed<boolean>;
  public canCancel:KnockoutComputed<boolean>;
  public add_mode:KnockoutObservable<boolean>;
  //
  constructor(server?: InfoData.IDatabaseManager) {
    this.dataService = ((server !== undefined) && (server !== null)) ? server :
     new CouchDatabase();
    //
    this.router = null;
    this._current_data = ko.observable(null);
    this.add_mode = ko.observable(false);
    this.username = ko.observable(null);
    this.password = ko.observable(null);
    this.title = ko.observable(null);
    this.error = ko.observable(null);
    this.info = ko.observable(null);
    this.menu = ko.observableArray([]);
    this.isConnected = ko.observable(false);
    this.person = ko.observable(null);
    this.userFullName = ko.observable(null);
    this.userPhotoUrl = ko.observable(null);
    //
    this.canConnect = ko.computed(()=>{
      var s1 = (this.username() !== null) ? this.username().trim() : null;
      var s2 = (this.password() !== null) ? this.password() : null;
      return (s1 !== null) && (s1.length > 0) && (s2 !== null) && (s2.length > 0);
    },this);
    //
    this.hasError = ko.computed(()=>{
      var s = this.error();
      return ((s !== null) && (s.length > 0));
    },this);
    this.hasInfo = ko.computed(()=>{
      var s = this.info();
      return ((s !== null) && (s.length > 0));
    },this);
    this.hasPhotoUrl = ko.computed(()=>{
      var p = this.userPhotoUrl();
      return (p !== null);
    },this);
    this.isNotConnected = ko.computed(()=>{
      var p = this.isConnected();
      return (!p);
    },this);
    this.isSuper = ko.computed(()=>{
        var p = this.person();
        return (p !== null) && p.is_super;
    },this);
    this.isAdmin = ko.computed(()=>{
        var p = this.person();
        return (p !== null) && (p.is_admin || p.is_super);
    },this);
    this.isOper = ko.computed(()=>{
        var p = this.person();
        return (p !== null) && (p.is_admin || p.is_super || p.is_oper);
    },this);
    this.isProf = ko.computed(()=>{
        var p = this.person();
        return (p !== null) && p.is_prof;
    },this);
    this.canSave = ko.computed(()=>{
      var x = this._current_data();
      return (x !== null) && x.is_storeable;
    },this);
    this.canRemove = ko.computed(()=>{
      var x = this._current_data();
      return (x !== null) && (x.id !== null) && (x.rev !== null);
    },this);
    this.canAdd = ko.computed(()=>{
      var x = this.add_mode();
      return (!x);
    },this);
    this.canCancel = ko.computed(()=>{
      var x = this.add_mode();
      return x;
    },this);
    this.description = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.description : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.description = s;
          this._current_data(x);
        }
      },
      owner : this
    });
  }// constructor
  //
  public create_item(): InfoData.IBaseItem {
    return null;
  }// create_item
  public addNew(): any {
    var x = this.create_item();
    if (x !== null){
      this._current_data(x);
      this.add_mode(true);
    }

  }// addNew
  public cancel() : any {
    this.add_mode(false);
  }
  public refresh(): any {

  }
  public refreshAll(): any {

  }
  public save() : any {
    var item = this._current_data();
    if ((item == undefined) || (item === null)){
      return;
    }
    if (!item.is_storeable){
      return;
    }
    var bOld = (item.rev !== null);
    this.clear_error();
    this.dataService.maintains_one_item(item).then((p)=>{
      if (!bOld){
        this.refreshAll();
      } else {
        this.refresh();
      }
    },(err)=>{
      this.set_error(err);
    });
  }// save
  public remove(){
    var item = this._current_data();
    if ((item == undefined) || (item === null)){
      return;
    }
    if ((item.id === null) || (item.rev === null)){
      return;
    }
    var message = 'Voulez-vous vraiment supprimer cet element: ' + item.id + ' ?';
    if (!this.confirm(message)){
      return;
    }
    this.clear_error();
    this.dataService.remove_one_item(item).then((p)=>{
        this.refreshAll();
    },(err)=>{
      this.set_error(err);
    });
  }// remove
  //
  public confirm(message:string) : boolean {
    return window.confirm(message);
  }
  //
  public get_avatar_url(docId:any,avatarId:string) : Q.IPromise<string> {
    return Q.Promise((resolve,reject)=>{
      this.dataService.get_docid_attachment(docId,avatarId).then((blob)=>{
        if ((blob === undefined) || (blob === null)){
          resolve(null);
        } else {
          var xurl = window.URL.createObjectURL(blob);
          resolve(xurl);
        }
      },(err:PouchError)=>{
        resolve(null);
      });
    });
  }//get_avatar_url
  //
  public connect() : void {
    var suser = this.username();
    var spass = this.password();
    this.clear_error();
    this.person(null);
    this.userFullName(null);
    this.userPhotoUrl(null);
    this.isConnected(false);
    var service = this.dataService;
    if (service === null){
      service = new CouchDatabase();
      this.dataService = service;
    }
    service.find_person_by_username(suser).then((p:InfoData.IPerson)=>{
      if ((p !== undefined) && (p !== null)){
         if (p.check_password(spass)){
            this.username(null);
            this.password(null);
            this.person(p);
            userinfo.person = p;
            var s = p.fullname;
            this.userFullName(s);
            this.isConnected(true);
            var id = p.avatarid;
            if ((id !== undefined) && (id !== null)){
               this.get_avatar_url(p.id,id).then((xurl:string)=>{
                 this.userPhotoUrl(xurl);
                 this.update_title();
                 this.update_menu();
                 navigate('#home');
               });
            } else {
              this.update_title();
              this.update_menu();
              navigate('#home');
            }
         }// ok
      }// p
    },(err:PouchError)=>{
      this.set_error(err);
    });
  }// connect
  public navigate(url:string) : any {
    if (this.router !== null){
      this.router.navigate(url);
    }
  }
  //
  public disconnect():void {
    this.person(null);
    this.userFullName(null);
    this.userPhotoUrl(null);
    this.username(null);
    this.password(null);
    this.isConnected(false);
    userinfo.person = null;
    navigate('#login');
  }
  //
  public update_title(): void {

  }
  public update_menu(): void {

  }
  public clear_error(): void {
    this.error(null);
  }
  public set_error(err?: any) {
    if ((err !== undefined) && (err !== null)) {
      var s: string = null;
      if ((err.reason !== undefined) && (err.reason !== null)) {
        s = err.reason;
      } else if ((err.message !== undefined) && (err.message !== null)) {
        s = err.message;
      }
      else if ((err.msg !== undefined) && (err.msg !== null)) {
        s = err.msg;
      }
      else if ((err.statusText !== undefined) && (err.statusText !== null)) {
        s = err.statusText;
      }
      else {
        s = JSON.stringify(err);
      }
      this.error(s);
    } else {
      this.error(null);
    }
  }// set_error
}// class BaseViewModel
export = BaseViewModel;
