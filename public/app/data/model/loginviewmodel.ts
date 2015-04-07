//loginviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import UserInfo = require('./userinfo');
import BaseViewModel = require('././baseviewmodel');
//
class LoginViewModel extends BaseViewModel {
  //
  public username:KnockoutObservable<string>;
  public password:KnockoutObservable<string>;
  //
  public canConnect:KnockoutComputed<boolean>;
  //
  constructor(userinfo?: UserInfo, server?: InfoData.IDatabaseManager) {
    super(userinfo,server);
    this.username = ko.observable(null);
    this.password = ko.observable(null);
    this.canConnect = ko.computed(()=>{
      var s1 = (this.username() !== null) ? this.username().trim() : null;
      var s2 = (this.password() !== null) ? this.password() : null;
      return (s1 !== null) && (s1.length > 0) && (s2 !== null) && (s2.length > 0);
    },this);
  }// constructor
  public connect(): void {
    var pinfo = this.userInfo();
    var s1 = this.username();
    var s2 = this.password();
    this.clear_error();
    pinfo.connect(s1,s2).then((pPers)=>{
      this.userInfo(null);
      this.userInfo(pinfo);
    },(err)=>{
      this.set_error(err);
    });
  }// connect
}// class LoginViewModel
export = LoginViewModel;
