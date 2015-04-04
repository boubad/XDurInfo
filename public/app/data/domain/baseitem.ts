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
  private _localmode:string;
  private _attachments:any;
  //
  constructor(oMap?: any) {
    this._id = null;
    this._rev = null;
    this._localmode = null;
    this._attachments = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap._id !== undefined) {
        this.id = oMap._id;
      }
      if (oMap._rev !== undefined) {
        this.rev = oMap._rev;
      }
      if (oMap.localmode !== undefined){
        this.localmode = oMap.localmode;
      }
      if (oMap._attachments !== undefined){
        this.attachments = oMap._attachments;
      }
    }
  }// constructor
  public get index_name():string{
    return this.collection_name + '/by_id';
  }
  public create_id():  string{
    var n:number = Math.floor(Math.random() * 10000.0);
    var s:string = (new Date()).toISOString() + '-' + n;
    var ss = this.search_prefix + '-' + s;
    return ss;
  }// create_id
  public get base_prefix(): string {
    return '';
  }
  public get search_prefix(): string {
    return this.base_prefix;
  }
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
    return this._id;
  }
  public set id(s: any) {
    this._id = ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) ?
    s : null;
  }
  public get has_id(): boolean {
    return (this.id !== null);
  }
  public get rev(): any {
    return this._rev;
  }
  public set rev(s: any) {
    this._rev =  ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) ?
    s : null;
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
  public get localmode():string {
    return this._localmode;
  }
  public set localmode(s:string){
    this._localmode =  ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) ?
    s : null;
  }
  public get attachments():any {
    return this._attachments;
  }
  public set attachments(s:any){
    this._attachments = (s !== undefined) ? s : null;
  }
  public get has_attachments():boolean{
    return (this.attachments !== null);
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
      oMap.type = this.type;
      if (this.localmode !== null){
        oMap.localmode = this.localmode;
      }
  }
  public to_fetch_map(oMap: any): void {
    this.to_insert_map(oMap);
    oMap._id = this.id;
    oMap._rev = this.rev;
    oMap.localmode = null;
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
  public sort_func(p1:InfoData.IBaseItem, p2:InfoData.IBaseItem): number {
        var vRet = -1;
        if ((p1 !== undefined) && (p2 !== undefined) && (p1 !== null) && (p2 !== null)) {
            if ((p1.id !== undefined) && (p1.id !== null)) {
                if ((p2.id !== undefined) && (p2.id !== null)) {
                    var s1 = p1.id.toString();
                    var s2 = p2.id.toString();
                    vRet = s1.localeCompare(s2);
                } else {
                    vRet = 1;
                }
            } else {
                vRet = 1;
            }
        } else if ((p1 === undefined) || (p1 === null)) {
            vRet = 1;
        }
        return vRet;
    } // sort_func
}// class BaseItem
export = BaseItem;
