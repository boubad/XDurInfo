// pagedviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
/// <reference path='../../../lib/typings/q/Q.d.ts' />
/// <reference path='../../../lib/typings/pouchdb/pouchdb.d.ts'/>
//
import Q = require('q');
import ko = require('knockout');
import InfoData = require('../../infodata');
import BaseViewModel = require('./baseviewmodel');
import userinfo = require('./userinfo');
//
class PagedViewModel extends BaseViewModel {
  //
  private _oldElement:InfoData.IElementDesc;
  public items:KnockoutObservableArray<InfoData.IElementDesc>;
  public _current_element:KnockoutObservable<InfoData.IElementDesc>;
  public current:KnockoutComputed<InfoData.IElementDesc>;

  public current_person:KnockoutObservable<InfoData.IPerson>;
  public current_url:KnockoutObservable<string>;
  public start_key:any;
  public next_key:any;
  public prev_key:any;
  public itemsPerPage:KnockoutObservable<number>;
  public modelItem:InfoData.IBaseItem;
  public canPrevPage:KnockoutObservable<boolean>;
  public canNextPage:KnockoutObservable<boolean>;

  public skip:number;
  //

  //
  constructor(model:InfoData.IBaseItem, server?: InfoData.IDatabaseManager) {
    super(server);
    this.modelItem = model;
    this._oldElement = null;
    this.items = ko.observableArray([]);
    this._current_element = ko.observable(null);
    this.current_person = ko.observable(null);
    this.current_url = ko.observable(null);
    this.start_key = null;
    this.next_key = null;
    this.prev_key = null;
    this.skip = 0;
    this.itemsPerPage = ko.observable(16);
    this.canPrevPage = ko.observable(false);
    this.canNextPage = ko.observable(false);
    //
    this.current = ko.computed({
      read: ()=>{
        var x = this._current_element();
        return x;
      },
      write : (s:InfoData.IElementDesc) =>{
          this.add_mode(false);
          this._current_element(s);
          this.change_current(s);
      },
      owner: this
    });
  }// constructor
  public create_item(): InfoData.IBaseItem {
    return this.dataService.create_item({type: this.modelItem.type});
  }// create_item
  public addNew(): any {
    this._oldElement = this.current();
    this.current(null);
    super.addNew();
  }// addNew
  public cancel() : any {
    this.current(this._oldElement);
    super.cancel();
  }
  public change_current(s:InfoData.IElementDesc) : any {
    var id = (s !== null) ? s.id : null;
    if (s === null){
      this.current_url(null);
      this._current_data(null);
      this.current_person(null);
      this.update_menu();
      return Q.resolve(null);
    }
    this.current_url(s.url);
    var pRet = null;
    return this.dataService.get_item_by_id(id).then((p)=>{
      this._current_data(p);
      pRet = p;
      if (s.personid === null){
        return null;
      } else {
        return this.dataService.get_item_by_id(s.personid);
      }
    }).then((pPers:InfoData.IPerson)=>{
      this.current_person(pPers);
      return pRet;
    });
  }// change_current
  public create_start_key():any{
    return [];
  }
  public retrieve_avatars(elems:InfoData.IElementDesc[]) : any {
    if ((elems === undefined) || (elems === null)){
      return Q.resolve([]);
    }
    var pp:any[] = [];
    var n = elems.length;
    for (var i = 0; i < n; ++i){
      var elem = elems[i];
      elem.url = null;
      var id = elem.avatardocid;
      var attachmentId = elem.avatarid;
      pp.push(elem.check_url(this.dataService))
    }// i
    if (pp.length > 0){
      return Q.all(pp);
    } else {
      return Q.resolve([]);
    }
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
    var oldid = (this._current_data() !== null) ? this._current_data().id : null;
    this.dataService.find_elements_range(model.index_name,startKey, endKey, skip,limit,
    descending,bIncludeEnd,bDoc,bAttach).then((rr:InfoData.IElementDesc[])=>{
      return this.retrieve_avatars(rr);
    }).then((dd)=>{
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
        var pSel:InfoData.IElementDesc = null;
        if (oldid !== null){
          var n = dd.length;
          for (var i = 0; i < n; ++i){
            var x = dd[i];
            if (x.id == oldid){
              pSel = x;
              break;
            }
          }// i
        }// old
        this.current(pSel);
        if (dd.length < 1){
          this.addNew();
        }
      } else {
        this.items([]);
        this.addNew();
      }
    });
    //
  }// refresh
}// class PagedViewModel
export = PagedViewModel;
