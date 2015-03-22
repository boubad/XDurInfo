//baseviewmodel.ts
//
declare var window;
//
/// <reference path='../../../lib/typings/knockout/knockout.d.ts'/>
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import BaseItem = require('../domain/baseitem');
import ItemDataManager = require('../services/itemdatamanager');
//
class BaseViewModel {
    public dataService:InfoData.IDataManager;
    public title:KnockoutObservable<string>;
    public error:KnockoutObservable<string>;
    public info:KnockoutObservable<string>;
    public menu:KnockoutObservableArray<InfoData.IMenuDesc>;
    //
    constructor() {
      this.dataService = new ItemDataManager();
      this.title = ko.observable(null);
      this.error = ko.observable(null);
      this.info = ko.observable(null);
      this.menu = ko.observableArray([]);
    }// constructor
    //
    public hasError():boolean {
      return ((this.error() !== null) &&
      this.error().trim().length > 0);
    }
    public hasInfo():boolean {
      return ((this.info() !== null) &&
      this.info().trim().length > 0);
    }
    //
    public update_menu():void {
      this.menu = ko.observableArray([]);
    }
    public update_title(): void {
    }// update_title
    public ask_question(prompt:string):boolean{
      return window.confirm(prompt);
    }
    public perform_conditionally(message:string, oper:()=>any) {

    }
    //
    public check_date(d:Date) : Date {
      return BaseItem.check_date(d);
    }
    public date_to_string(d:Date):string {
      return BaseItem.date_to_string(d);
    }
    public string_to_date(s:string){
      return BaseItem.string_to_date(s);
    }
    public string_to_number(s:string) : number {
      var vRet:number  = null;
      if ((s !== undefined) && (s !== null)){
        try {
          var x = parseFloat(s);
          if ((x !== undefined) && (x !== null) && (!isNaN(x))){
            vRet = x;
          }
        }catch(e){}
      }
      return vRet;
    }// string_to_number
    public internal_set_error(err:any) : void {
      var ss:string = null;
      if ((err !== undefined) && (err !== null)){
         if ((err.msg !== undefined) && (err.msg !== null)){
           ss = err.msg;
         } else if ((err.message !== undefined) && (err.message !== null)){
           ss = err.message;
         } else {
           ss = err.toString();
         }
      }// err
      this.error(ss);
    }// internal_set_error
}// class BaseViewModel
export = BaseViewModel;
