//itemdatamabager.ts
//
import http = require('plugins/http');
import Q = require('q');
//
import InfoData = require('../../infodata');
import ItemGenerator = require('../itemgenerator');
//
class ItemDataManager extends ItemGenerator implements InfoData.IDataManager {
  //
  constructor() {
    super();
  }// constructor
  //
  public static  form_url(prefix?: string, params?: string[], query?: any): string {
    var sRet = '/api/';
    if ((prefix != undefined) && (prefix != null)) {
      sRet = sRet + prefix;
    }
    if ((params != undefined) && (params != null)) {
      var n = params.length;
      for (var i = 0; i < n; ++i) {
        sRet = sRet + '/' + encodeURIComponent(params[i]);
      } // i
    }
    if ((query != undefined) && (query != null)) {
      var bFirst = true;
      for (var key in query) {
        var v = query[key];
        if (v != null) {
          if (bFirst) {
            bFirst = false;
            sRet = sRet + '?';
          } else {
            sRet = sRet + '&';
          }
          sRet = sRet + key + '=' + encodeURIComponent(v);
        } // v
      } // key
    } // query
    return sRet;
  } // form_url
  //
  private _perform_get(prefix: string, oMap: any,
    bCount?: boolean, start?: number, count?: number): Q.IPromise<any> {
    if ((bCount != undefined) && (bCount != null) && (bCount == true)) {
      oMap['$count'] = 1;
    } else {
      if ((start != undefined) && (start != null) && (start > 0)) {
        oMap['$skip'] = start;
      }
      if ((count != undefined) && (count != null) && (count > 0)) {
        oMap['$limit'] = count;
      }
    }
    var url = ItemDataManager.form_url(prefix, null, oMap);
    return http.get(url);
  }// _perform_get
  //
  private _perform_post(item: InfoData.IBaseItem): Q.IPromise<any> {
    var oMap = {};
    item.to_insert_map(oMap);
    if (oMap['localmode'] !== undefined){
      oMap['localmode']= null;
    }
    var url = ItemDataManager.form_url(item.collection_name);
    return http.post(url, oMap);
  }// _perform_post
  //
  private _perform_put(item: InfoData.IBaseItem): Q.IPromise<any> {
    var oMap = {};
    item.to_insert_map(oMap);
    if (oMap['localmode'] !== undefined){
      oMap['localmode']= null;
    }
    var url =  ItemDataManager.form_url(item.collection_name, [item.id.toString()]);
    return http.put(url, oMap);
  }// _perform_put
  //
  private _perform_delete(item: InfoData.IBaseItem): Q.IPromise<any> {
    var oMap = {};
    item.to_insert_map(oMap);
    var url =  ItemDataManager.form_url(item.collection_name, [item.id.toString()]);
    return http.remove(url);
  }// _perform_delete
  //
  public get_items_count(item: InfoData.IBaseItem): Q.IPromise<number> {
    var oMap = {};
    item.to_fetch_map(oMap);
    return this._perform_get(item.collection_name, oMap, true).then((r) => {
      return r['count'];
    });
  }// get_items_count
  public get_items(item: InfoData.IBaseItem, skip?: number, limit?: number):
    Q.IPromise<InfoData.IBaseItem[]> {
    var oMap = {};
    item.to_fetch_map(oMap);
    var self = this;
    return this._perform_get(item.collection_name, oMap, false, skip, limit).then((dd) => {
      var vRet: InfoData.IBaseItem[] = [];
      var n = dd.length;
      for (var i = 0; i < n; ++i) {
        var x = self.create_item(dd[i]);
        if (x !== null) {
          vRet.push(x);
        }
      }// i
      if ((vRet.length > 1) && (item.sort_func !== undefined)){
        vRet.sort(item.sort_func);
      }
      return vRet;
    });
  }//get_items
  public get_one_item(item: InfoData.IBaseItem):
    Q.IPromise<InfoData.IBaseItem> {
    return this.get_items(item, 0, 1).then((dd) => {
      var vRet = ((dd != undefined) && (dd != null) && (dd.length > 0)) ?
        dd[0] : null;
      return vRet;
    });
  }// get_one_item
  public get_by_id(item: InfoData.IBaseItem): Q.IPromise<InfoData.IBaseItem> {
    var oMap = { _id: item.id };
    var self = this;
    return this._perform_get(item.collection_name, oMap, false, 0, 1).then((dd) => {
      var vRet: InfoData.IBaseItem = null;
      if (dd.length > 0) {
        vRet = self.create_item(dd[0]);
      }
      return vRet;
    });
  }// get_by_id
  public get_items_array(item:InfoData.IBaseItem, ids:any[]) : Q.IPromise<InfoData.IBaseItem[]>{
      if ((ids === undefined) || (ids === null) || (ids.length < 1)){
        return Q.resolve([]);
      }
      var pp = [];
      var type = item.type;
      for (var i = 0; i < ids.length; ++i){
         var model = this.create_item({_id: ids[i], type: type});
         pp.push(this.get_by_id(model));
      }// i
      return Q.all(pp);
  }// get_items_array
  public insert_one_item(item: InfoData.IBaseItem): Q.IPromise<any> {
    return this._perform_post(item);
  }
  public update_one_item(item: InfoData.IBaseItem): Q.IPromise<any> {
    return this._perform_put(item);
  }
  public maintains_one_item(item: InfoData.IBaseItem): Q.IPromise<any> {
    if (item.has_id) {
      return this._perform_put(item);
    } else {
      return this._perform_post(item);
    }
  }
  public remove_one_item(item: InfoData.IBaseItem): Q.IPromise<any> {
    return this._perform_delete(item);
  }
}// class ItemDataManager
//
export = ItemDataManager;
