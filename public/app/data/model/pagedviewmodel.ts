// pagedviewmodel.ts
//
import InfoData = require('../../infodata');
import BaseItem = require('../domain/baseitem');
import BaseViewModel = require('./baseviewmodel');
//
class PagedViewModel extends BaseViewModel {
  public modelItem: InfoData.IBaseItem;
  public pagesCount: number;
  public items: InfoData.IBaseItem[];
  public pageStatus: string;
  //
  private _currentItem: InfoData.IBaseItem;
  private _oldItem: InfoData.IBaseItem;
  private _itemsCount: number;
  private _itemsPerPage: number;
  private _currentPage: number;
  private _add_mode: boolean;

  //
  constructor(server: InfoData.IDataManager, model: InfoData.IBaseItem) {
    super(server);
    this.modelItem = model;
    this.items = [];
    this.pagesCount = 0;
    this.pageStatus = null;
    this._currentItem = this.dataService.create_item({ type: model.type });
    this._oldItem = null;
    this._itemsCount = 0;
    this._itemsPerPage = 16;
    this._currentPage = 0;
    this._add_mode = false;
  }// constructor
  //
  public change_current(s: InfoData.IBaseItem) {
    this._currentItem = s;
    this.update_menu();
  }
  public get current(): InfoData.IBaseItem {
    return this._currentItem;
  }
  public set current(s: InfoData.IBaseItem) {
    this.change_current(s);
  }
  public get add_mode(): boolean {
    return this._add_mode;
  }
  public set add_mode(b: boolean) {
    this._add_mode = b;
  }
  public get canAdd(): boolean {
    return (!this.add_mode);
  }
  public get canCancel(): boolean {
    return this.add_mode;
  }
  public get canRemove(): boolean {
    return ((this.current !== null) && this.current.has_id);
  }
  public get canSave(): boolean {
    return (this.current !== null) && this.current.is_storeable;
  }
  public addNew(): void {
    this.add_mode = true;
    this._oldItem = this.current;
    this.current = this.dataService.create_item({ type: this.modelItem.type });
  }
  public cancel(): void {
    this.add_mode = false;
    this.current = this._oldItem;
  }
  public refresh(): any {
    var count: number = this._itemsPerPage;
    if (count < 1) {
      count = 16;
    }
    var start: number = this._currentPage * count;
    if (start < 0) {
      start = 0;
    }
    this.error = null;
    var old = this._oldItem;
    this.items = [];
    this._currentItem = this.dataService.create_item({ type: model.type });
    this.pageStatus = null;
    var service = this.dataService;
    var model = this.modelItem;
    return service.get_items(model).then((dd) => {
      this._add_mode = false;
      this.items = dd;
      if (this.pagesCount > 0) {
        var n = this._currentPage + 1;
        this.pageStatus = 'Page ' + n + ' sur ' + this.pagesCount;
      }
      if ((old !== null) && old.has_id && (dd !== undefined) && (dd !== null) && (dd.length > 0)) {
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
          this.current = pSel;
        }
      }
    }, (err) => {
        return this.internal_set_error(err);
      });
  }// refresh
  public get currentPage(): number {
    return this._currentPage;
  }
  public set currentPage(n: number) {
    if ((n !== undefined) && (n !== null) && (n >= 0) && (n < this.pagesCount) &&
      (this._currentPage != n)) {
      this._currentPage = n;
      this.refresh();
    }
  }
  private _internal_pages_setup(): any {
    this.pagesCount = 0;
    this._currentPage = 0;
    var nt = this._itemsCount;
    if (nt < 1) {
      nt = 0;
      this._itemsCount = nt;
    }
    var nc = this._itemsPerPage;
    if (nc < 1) {
      nc = 16;
      this._itemsPerPage = nc;
    }
    if (nt > 0) {
      var np = Math.floor(nt / nc);
      if ((nt % nc) > 0) {
        ++np;
      }
      this.pagesCount = np;
    }// nt
    if (np > 0) {
      return this.refresh();
    } else {
      this.items = [];
      this._currentItem = this.dataService.create_item({ type: this.modelItem.type });
      this.pageStatus = null;
      return true;
    }
  }// _internal_pages_setup
  public get itemsPerPage(): number {
    return this._itemsPerPage;
  }
  public set itemsPerPage(n: number) {
    if ((n !== undefined) && (n !== null) && (n > 0) && (n != this._itemsPerPage)) {
      this._itemsPerPage = n;
      this._internal_pages_setup();
    }
  }
  public refreshAll(): any {
    return this.dataService.get_items_count(this.modelItem).then((n) => {
      this._itemsCount = n;
      this._internal_pages_setup();
    }, (err) => {
        this.internal_set_error(err);
        this._itemsCount = 0;
        this._internal_pages_setup();
      });
  }// refreshAll
  public get itemsCount(): number {
    return this._itemsCount;
  }
  public get hasItems(): boolean {
    return (this.itemsCount > 0);
  }
  public get hasPages(): boolean {
    return (this.pagesCount > 1);
  }
  public get canPrevPage(): boolean {
    return (this.currentPage > 0);
  }
  public get canNextPage(): boolean {
    var n = this.pagesCount - 1;
    return (this.currentPage < n);
  }
  public firstPage(): void {
    this.currentPage = 0;
  }
  public prevPage(): void {
    this.currentPage = this.currentPage - 1;
  }
  public nextPage(): void {
    this.currentPage = this.currentPage + 1;
  }
  public lastage(): void {
    this.currentPage = this.pagesCount - 1;
  }
}// class PagetViewModel
export = PagedViewModel;
