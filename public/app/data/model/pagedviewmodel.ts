// pagedviewmodel.ts
//
//
/// <reference path='../../../lib/typings/knockout/knockout.d.ts'/>
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import BaseItem = require('../domain/baseitem');
import BaseViewModel = require('./baseviewmodel');
//
class PagedViewModel extends BaseViewModel {
  public modelItem: InfoData.IBaseItem;
  public pagesCount: KnockoutObservable<number>;
  public items: KnockoutObservableArray<InfoData.IBaseItem>;
  public pageStatus: KnockoutObservable<string>;
  //
  private _current_item: KnockoutObservable<InfoData.IBaseItem>;
  private _oldItem: InfoData.IBaseItem;

  private _itemsPerPage: KnockoutObservable<number>;
  private _currentPage: KnockoutObservable<number>;
  public add_mode: KnockoutObservable<boolean>;
  //
  public hasPageStatus: KnockoutComputed<boolean>;
  public current: KnockoutComputed<InfoData.IBaseItem>;
  public hasCurrent: KnockoutComputed<boolean>;
  public canAdd: KnockoutComputed<boolean>;
  public canCancel: KnockoutComputed<boolean>;
  public canRemove: KnockoutComputed<boolean>;
  public canSave: KnockoutComputed<boolean>;
  public currentPage: KnockoutComputed<number>;
  public itemsPerPage: KnockoutComputed<number>;
  public itemsCount: KnockoutObservable<number>;
  public hasItems: KnockoutComputed<boolean>;
  public canPrevPage: KnockoutComputed<boolean>;
  public canNextPage: KnockoutComputed<boolean>;
  public hasPages: KnockoutComputed<boolean>;

  //
  constructor(model: InfoData.IBaseItem) {
    super();
    this.modelItem = model;
    this.items = ko.observableArray([]);
    this.pagesCount = ko.observable(0);
    this.pageStatus = ko.observable(null);
    this._current_item = ko.observable(this.dataService.create_item({ type: model.type }));
    this._oldItem = null;
    this.itemsCount = ko.observable(0);
    this._itemsPerPage = ko.observable(16);
    this._currentPage = ko.observable(0);
    this.add_mode = ko.observable(false);
    //
    this.hasPageStatus = ko.computed(() => {
      return (this.pageStatus() != null);
    }, this);
    this.current = ko.computed({
      read: () => {
        return this._current_item();
      },
      write: (s:InfoData.IBaseItem) => {
        this.change_current(s);
      },
      owner: this
    });
    this.hasCurrent = ko.computed(() => {
      var v = this.current();
      return ((v !== undefined) && (v !== null) && (v.id !== undefined) && (v.id !== null));
    }, this);
    this.canAdd = ko.computed(() => {
      return (!this.add_mode());
    }, this);
    this.canCancel = ko.computed(() => {
      return this.add_mode();
    }, this);
    this.canRemove = ko.computed(() => {
      var v = this.current();
      return ((v !== undefined) && (v !== null) && (v.id !== undefined) && (v.id !== null));
    }, this);
    this.canSave = ko.computed(() => {
      var v = this.current();
      return ((v !== undefined) && (v !== null) && (v.is_storeable !== undefined) &&
      (v.is_storeable !== null));
    }, this);
    this.currentPage = ko.computed({
      read: () => {
        return this._currentPage();
      },
      write: (n : number) => {
        if ((n !== undefined) && (n !== null) && (n >= 0) && (n < this.pagesCount()) &&
          (this._currentPage() != n)) {
          this._currentPage(n);
          this.refresh();
        }
      },
      owner: this
    });
    this.itemsPerPage = ko.computed({
      read: () => {
        return this._itemsPerPage();
      },
      write: (n: number) => {
        if ((n !== undefined) && (n !== null) && (n > 0) && (n != this._itemsPerPage())) {
          this._itemsPerPage(n);
          this._internal_pages_setup();
        }
      },
      owner: this
    });
    this.hasItems = ko.computed(() => {
      return (this.itemsCount() > 0);
    }, this);
    this.canPrevPage = ko.computed(() => {
      return (this.currentPage() > 0);
    }, this);
    this.canNextPage = ko.computed(() => {
      var n = this.pagesCount() - 1;
      return (this.currentPage() < n);
    }, this);
    this.hasPages = ko.computed(() => {
      return (this.pagesCount() > 1);
    }, this);
  }// constructor
  //
   public create_item() : InfoData.IBaseItem {
     var p = this.dataService.create_item({ type: this.modelItem.type });
     return p;
   }// create_item
  //
  public change_current(s: InfoData.IBaseItem) {
    this._current_item(s);
    this.error(null);
    this.update_menu();
  }
  public select(s:InfoData.IBaseItem){
    this.change_current(s);
  }
  public remove(): void {
    var item = this.current();
    if ((item !== undefined) && (item !== null) && (item.id !== undefined) &&
    (item.id !== null)) {
      var message = "Voulez-vous vraiment supprimer?";
      if (this.ask_question(message)){
        this.perform_remove();
      }
    }
  }// remove
  public perform_remove(): void {
    var item = this.current();
    if ((item !== undefined) && (item !== null) && (item.id !== undefined) &&
    (item.id !== null)) {
      this.dataService.remove_one_item(item).then((r) => {
        this.refreshAll();
      }, (err) => {
          this.internal_set_error(err);
        });
    }// item
  }// remove
  public save(): void {
    var item = this.current();
    if ((item !== undefined) && (item !== null) && item.is_storeable) {
      this.error = null;
      this.dataService.maintains_one_item(item).then((r) => {
        this.refresh();
      }, (err) => {
          this.internal_set_error(err);
        });
    }// item
  }// save
  public addNew(): void {
    this.error(null);
    this.add_mode(true);
    this._oldItem = this.current();
    this.current(this.create_item());
  }
  public cancel(): void {
    this.add_mode(false);
    this.current(this._oldItem);
  }
  public refresh(): any {
    var count: number = this._itemsPerPage();
    if (count < 1) {
      count = 16;
    }
    var start: number = this._currentPage() * count;
    if (start < 0) {
      start = 0;
    }
    this.error(null);
    var old = this._oldItem;
    this.items([]);
    this._current_item(this.create_item());
    this.pageStatus(null);
    var service = this.dataService;
    var model = this.modelItem;
    return service.get_items(model,start,count).then((dd) => {
      this.add_mode(false);
      this.items(dd);
      if (this.pagesCount() > 0) {
        var n = this._currentPage() + 1;
        this.pageStatus('Page ' + n + ' sur ' + this.pagesCount());
      }
      if ((old !== undefined) && (old !== null) && (old.id !== undefined) &&
      (old.id !== null) && (dd !== undefined) && (dd !== null) && (dd.length > 0)) {
        var id = old.id;
        var pSel: InfoData.IBaseItem = null;
        for (var i = 0; i < dd.length; ++i) {
          var x = dd[i];
          if (x.id == id) {
            pSel = x;
            break;
          }
        }// i
        if (pSel !== null) {
          this._current_item(pSel);
        }
      }
      if (dd.length < 1){
        this.addNew();
      }
    }, (err) => {
        return this.internal_set_error(err);
      });
  }// refresh
  private _internal_pages_setup(): any {
    this.pagesCount(0);
    this._currentPage(0);
    var nt = this.itemsCount();
    if (nt < 1) {
      nt = 0;
    }
    var nc = this._itemsPerPage();
    if (nc < 1) {
      nc = 16;
    }
    var np = 0;
    if (nt > 0) {
      np = Math.floor(nt / nc);
      if ((nt % nc) > 0) {
        ++np;
      }
      this.pagesCount(np);
    }// nt
    if (np > 0) {
      return this.refresh();
    } else {
      this.items([]);
      this._current_item(this.create_item());
      this.pageStatus(null);
      return true;
    }
  }// _internal_pages_setup

  public refreshAll(): any {
    return this.dataService.get_items_count(this.modelItem).then((nt) => {
      if ((nt === undefined) || (nt === null)){
        nt = 0;
       }
       this.itemsCount(nt);
       return this._internal_pages_setup();
     });
  }// refreshAll

  public firstPage(): void {
    this.currentPage(0);
  }
  public prevPage(): void {
    this.currentPage(this.currentPage() - 1);
  }
  public nextPage(): void {
    this.currentPage(this.currentPage() + 1);
  }
  public lastPage(): void {
    this.currentPage(this.pagesCount() - 1);
  }
}// class PagetViewModel
export = PagedViewModel;
