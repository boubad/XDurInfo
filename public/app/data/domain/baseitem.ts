//baseitem.ts
/// <reference path='../../../lib/typings/moment/moment.d.ts'/>
//
import InfoData = require('../../infodata');
//
import moment = require('moment');
//
class BaseItem implements InfoData.IBaseItem {
  private _id: any;
  private _rev: any;
  //
  constructor(oMap?: any) {
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap._id !== undefined) {
        this.id = oMap._id;
      }
      if (oMap._rev !== undefined) {
        this.rev = oMap._rev;
      }
    }
  }// constructor
  public static get date_format(): string {
    return 'YYYY-MM-DD';
  }
  public static check_date(d: Date): Date {
    var dRet: Date = null;
    if ((d !== undefined) && (d !== null)) {
      var x = moment(d);
      if (x.isValid()) {
        dRet = x.toDate();
      }
    }
    return dRet;
  }// check_date
  public static string_to_date(s: string): Date {
    var dRet: Date = null;
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      var x = moment(s, BaseItem.date_format);
      if (x.isValid()) {
        dRet = x.toDate();
      }
    }
    return dRet;
  }// string_to_date
  public static date_to_string(d: Date): string {
    var sRet: string = null;
    if ((d !== undefined) && (d !== null)) {
      var x = moment(d);
      if (x.isValid()) {
        sRet = x.format(BaseItem.date_format);
      }
    }
    return sRet;
  }// date_to_string
  public get id(): any {
    return ((this._id !== undefined) && (this._id !== null) &&
      (this._id.toString().trim().length > 0)) ?
      this._id : null;
  }
  public set id(s: any) {
    this._id = s;
  }
  public get has_id(): boolean {
    return (this.id !== null);
  }
  public get rev(): any {
    return ((this._rev !== undefined) && (this._rev !== null) &&
      (this._rev.toString().trim().length > 0)) ?
      this._rev : null;
  }
  public set rev(s: any) {
    this._rev = s;
  }
  public get has_rev(): boolean {
    return (this.rev !== null);
  }
  public get type(): string {
    return null;
  }
  public get has_type(): boolean {
    return (this.type !== null);
  }
  public get collection_name(): string {
    return null;
  }
  public get has_collection_name(): boolean {
    return (this.collection_name !== null);
  }
  public get is_storeable(): boolean {
    return (this.type !== null) && (this.collection_name !== null);
  }
  public to_insert_map(oMap: any): void {
    if (this.has_type) {
      oMap.type = this.type;
    }
  }
  public to_fetch_map(oMap: any): void {
    this.to_insert_map(oMap);
    if (this.has_id) {
      oMap._id = this.id;
    }
    if (this.has_rev) {
      oMap._rev = this.rev;
    }
  }
  public toString(): string {
    var oMap = {};
    this.to_fetch_map(oMap);
    return JSON.stringify(oMap);
  }// toString
  public static array_contains(cont: any[], val: any): boolean {
    if ((cont !== undefined) && (cont !== null) && (val !== undefined) &&
      (val !== null)) {
      var s: string = val.toString().trim().toLowerCase();
      if (s.length > 0) {
        var n: number = cont.length;
        for (var i = 0; i < n; ++i) {
          var x = cont[i];
          if ((x !== undefined) && (x !== null)) {
            var ss: string = x.toString().trim().toLowerCase();
            if (ss == s) {
              return true;
            }
          }
        }// i
      }// s
    }
    return false;
  }// _array_contains
  public static array_add(cont: any[], val: any): void {
    if ((cont !== undefined) && (cont !== null) && (val !== undefined) &&
      (val !== null)) {
      var s: string = val.toString().trim().toLowerCase();
      if (s.length > 0) {
        var bFound: boolean = false;
        var n: number = cont.length;
        for (var i = 0; i < n; ++i) {
          var x = cont[i];
          if ((x !== undefined) && (x !== null)) {
            var ss: string = x.toString().trim().toLowerCase();
            if (ss == s) {
              bFound = true;
              break;
            }
          }
        }// i
        if (!bFound) {
          cont.push(val);
        }
      }// val
    }
  }// _array_add
  public static array_remove(cont: any[], val: any): void {
    if ((cont !== undefined) && (cont !== null) && (val !== undefined) &&
      (val !== null)) {
      var s: string = val.toString().trim().toLowerCase();
      if (s.length > 0) {
        var index: number = -1;
        var n: number = cont.length;
        for (var i = 0; i < n; ++i) {
          var x = cont[i];
          if ((x !== undefined) && (x !== null)) {
            var ss: string = x.toString().trim().toLowerCase();
            if (ss == s) {
              index = i;
              break;
            }
          }
        }// i
        if (index >= 0) {
          cont = cont.splice(index, 1);
        }
      }// val
    }
  }// _array_add
}// class BaseItem
export = BaseItem;
