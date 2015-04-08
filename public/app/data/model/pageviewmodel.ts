// pagedviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
/// <reference path='../../../lib/typings/q/Q.d.ts' />
//
import Q = require('q');
import ko = require('knockout');
import InfoData = require('../../infodata');
import BaseViewModel = require('./baseviewmodel');
import userinfo = require('./userinfo');
//
declare var window;
//
class PagedViewModel extends BaseViewModel {
  //
  public items:KnockoutObservableArray<InfoData.IElementDesc>;
  public start_key:any;
  public next_key:any;
  public prev_key:any;
  public itemsPerPage:KnockoutObservable<number>;
  public modelItem:InfoData.IBaseItem;
  public canPrevPage:KnockoutObservable<boolean>;
  public canNextPage:KnockoutObservable<boolean>;
  public skip:number;
  //
  constructor(model:InfoData.IBaseItem, server?: InfoData.IDatabaseManager) {
    super(server);
    this.modelItem = model;
    this.items = ko.observableArray([]);
    this.start_key = null;
    this.next_key = null;
    this.prev_key = null;
    this.skip = 0;
    this.itemsPerPage = ko.observable(16);
    this.canPrevPage = ko.observable(false);
    this.canNextPage = ko.observable(false);
  }// constructor
  public create_start_key():any{
    return [];
  }
  public create_elem_item(src:any) : InfoData.IElementDesc {
    var xRet:InfoData.IElementDesc = {
      id : (src.id !== undefined) ? src.id : null,
      text: (src.text !== undefined) ? src.text : null,
      rev: (src.rev !== undefined) ? src.rev : null,
      key: (src.key !== undefined) ? src.key : null,
      value: (src.text !== undefined) ? src.value : null,
      avatarid: (src.avatarid !== undefined) ? src.avatarid : null,
      url:null
    };
    return xRet;
  }
  public convert_elems(rr:any[]) : InfoData.IElementDesc[] {
    var oRet:InfoData.IElementDesc[] = [];
    if ((rr !== undefined) && (rr !== null) && (rr.length > 0)){
      var n = rr.length;
      for (var i = 0; i < n; ++i){
        var src = rr[i];
        if ((src !== undefined) && (src !== null)){
          oRet.push(this.create_elem_item(src));
        }
      }// i
    }
    return oRet;
  }
  public retrieve_one_avatar(elem:InfoData.IElementDesc) : Q.IPromise<InfoData.IElementDesc>{
    if ((elem === undefined) || (elem === null)){
      return Q.resolve(null);
    }
    elem.url = null;
    var id = elem.id;
    var attachmentId = elem.avatarid;
    if ((id === null)|| (attachmentId === null)){
      return Q.resolve(elem);
    }
    return this.dataService.get_attachment(id.toString(),attachmentId.toString()).then((blob:Blob)=>{
      var xurl = window.URL.createObjectURL(blob);
      elem.url = xurl;
      return elem;
    },(err)=>{
      return elem;
    });
  }// retrieve_one_avatar
  public retrieve_avatars(elems:InfoData.IElementDesc[]) : any {
    var pp:any[] = [];
    var n = elems.length;
    for (var i = 0; i < n; ++i){
      pp.push(this.retrieve_one_avatar(elems[i]));
    }// i
    return Q.all(pp);
  }// retrieve_avatars
  public refreshAll() : any {
    this.prev_key = null;
    this.start_key = null;
    this.next_key = null;
    this.refresh();
  }
  public refresh(): any {
    var limit:number  = this.itemsPerPage();
    var skip:number = this.skip;
    var startKey = this.start_key;
    var first
    if (startKey === null){
      startKey = this.create_start_key();
    }
    var endKey = null;
    var descending = null;
    var bIncludeEnd = null;
    var bDoc = null;
    var bAttach = null;
    var model = this.modelItem;
    this.clear_error();
    this.dataService.get_items_range(model,startKey, endKey, skip,limit,
    descending,bIncludeEnd,bDoc,bAttach).then((rr)=>{
      var temp = this.convert_elems(rr);
      this.retrieve_avatars(temp).then((dd)=>{
        if ((dd !== undefined) && (dd !== null)){
          this.prev_key = startKey;
          var n = dd.length;
          if (n < limit){
            this.next_key = null;
            this.canNextPage(false);
          } else  if (n > 0) {
            this.skip = 0;
            var x = dd[ n - 1];
            this.next_key = x.key;
            this.canNextPage(true);
          }
          this.items(dd);
        }
      },(ex)=>{
        this.set_error(ex);
      });
    },(err)=>{
      this.set_error(err);limit
    });
  }// refresh
}// class PagedViewModel
export = PagedViewModel;
