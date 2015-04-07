//baseviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import UserInfo = require('./userinfo');
//
class BaseViewModel {
  //
  public userInfo:KnockoutObservable<UserInfo>;
  //
  public dataService: InfoData.IDatabaseManager;
  public title: KnockoutObservable<string>;
  public error: KnockoutObservable<string>;
  public info: KnockoutObservable<string>;
  public menu: KnockoutObservableArray<InfoData.IMenuDesc>;
  //
  public person:KnockoutComputed<InfoData.IPerson>;
  public userFullName: KnockoutComputed<string>;
  public userPhotoUrl: KnockoutComputed<string>;
  public isConnected: KnockoutComputed<boolean>;
  public isAdmin: KnockoutComputed<boolean>;
  public isProf: KnockoutComputed<boolean>;
  public isSuper: KnockoutComputed<boolean>;
  public isOper: KnockoutComputed<boolean>;
  public hasPhotoUrl: KnockoutComputed<boolean>;
  //
  constructor(userinfo?: UserInfo, server?: InfoData.IDatabaseManager) {
    //
    this.title = ko.observable(null);
    this.error = ko.observable(null);
    this.info = ko.observable(null);
    this.menu = ko.observableArray([]);
    //
    this.userInfo = ko.observable(((userinfo !== undefined) && (userinfo !== null)) ?
    userinfo : new UserInfo(server));
    this.dataService = this.userInfo().dataService;
    //
    this.person = ko.computed({
      read: ()=>{
        var vRet:InfoData.IPerson = this.userInfo().person;
        return vRet;
      },
      write: (s:InfoData.IPerson) => {
        this.userInfo().person = s;
      },
      owner: this
    });
    this.userFullName = ko.computed(()=>{
      var sRet:string = null;
      var p = this.person();
      sRet = (p !== null) ? p.fullname : null;
      return sRet;
    },this);
    this.userPhotoUrl = ko.computed(()=>{
      var sRet:string = null;
      var p = this.person();
      sRet = (p !== null) ? p.avatarurl : null;
      return sRet;
    },this);
    this.hasPhotoUrl = ko.computed(()=>{
      var p = this.userPhotoUrl();
      return (p !== null);
    },this);
    this.isConnected = ko.computed(()=>{
      var p = this.person();
      return (p !== null) && (p.id !== null);
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
  }// constructor
  //

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
