//profilviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts'/>
//
import InfoData = require('../../infodata');
import BaseViewModel = require('./baseviewmodel');
import userinfo = require('./userinfo');
import MyCrypto = require('../domain/crypto');
//
var cc = new MyCrypto();
//
class ProfilViewModel extends BaseViewModel {
  //
  public lastname:KnockoutComputed<string>;
  public firstname:KnockoutComputed<string>;
  public email:KnockoutComputed<string>;
  public phone:KnockoutComputed<string>;
  //
  public oldPassword:KnockoutObservable<string>;
  public newPassword:KnockoutObservable<string>;
  public confirmPassword:KnockoutObservable<string>;
  public canChangePwd:KnockoutComputed<boolean>;
  //
  constructor(server?: InfoData.IDatabaseManager) {
    super(server);
    this.oldPassword = ko.observable(null);
    this.newPassword = ko.observable(null);
    this.confirmPassword = ko.observable(null);
    this.lastname = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.lastname : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.lastname = s;
          this._current_data(x);
        }
      },
      owner : this
    });
    this.firstname = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.firstname : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.firstname = s;
          this._current_data(x);
        }
      },
      owner : this
    });
    this.email = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.email : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.email = s;
          this._current_data(x);
        }
      },
      owner : this
    });
    this.phone = ko.computed({
      read: ()=>{
        var x = this._current_data();
        return (x !== null) ? x.phone : null;
      },
      write: (s: string) => {
        var x = this._current_data();
        if (x !== null){
          this._current_data(null);
          x.phone = s;
          this._current_data(x);
        }
      },
      owner : this
    });
    this.canSave = ko.computed(()=>{
      var x = this._current_data();
      return (x !== null) && x.is_storeable && (x.id !== null) && (x.rev !== null);
    },this);
    this.canChangePwd = ko.computed(()=>{
      var bRet:boolean = false;
      var x = this._current_data();
      var x1 = this.oldPassword();
      var x2 = this.newPassword();
      var x3 = this.confirmPassword();
      if ((x !== null) && (x.password !== null) && (x1 !== null) && (x2 !== null) && (x3 !== null)){
        if (x2 == x3){
           var xs = cc.md5(x1);
           bRet = (xs == x.password);
        }
      }
     return bRet;
    },this);
  }// constructor
  public changePwd(): any {
    var x = this._current_data();
    var x2 = this.newPassword();
    if ((x === null) || (x2 === null)){
      return;
    }
    this.oldPassword(null);
    this.newPassword(null);
    this.confirmPassword(null);
    this.info(null);
    this.clear_error();
    var old = x.password;
    x.change_password(x2);
    this.dataService.maintains_one_item(x).then((p)=>{
      this._current_data(null);
      this._current_data(x);
      this.info('Mot de passe modifié!');
    },(err:PouchError)=>{
      x.password = old;
      this.set_error(err);
    });
  }// changePwd
  public activate(): any {
    this._current_data(userinfo.person);
    this.info(null);
    this.error(null);
    return true;
  }
  public save() : any {
    var item = this._current_data();
    if ((item == undefined) || (item === null)){
      return;
    }
    if (!item.is_storeable){
      return;
    }
    this.clear_error();
    this.info(null);
    this.dataService.maintains_one_item(item).then((p)=>{
      this.info('Modifications enregistrées!');
    },(err)=>{
      this.set_error(err);
    });
  }// save
}// class ProfilViewModel
export = ProfilViewModel;
