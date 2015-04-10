//baseitem.ts
/// <reference path='../../../lib/typings/moment/moment.d.ts'/>
//
import InfoData = require('../../infodata');
//
//
class BaseItem implements InfoData.IBaseItem {
  private _id: any;
  private _rev: any;
  private _attachments:any;
  private _avatarid:any;
  //
  constructor(oMap?: any) {
    this._id = null;
    this._rev = null;
    this._attachments = null;
    this._avatarid = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap._id !== undefined) {
        this.id = oMap._id;
      }
      if (oMap._rev !== undefined) {
        this.rev = oMap._rev;
      }
      if (oMap.avatarid !== undefined){
        this.avatarid = oMap.avatarid;
      }
      if (oMap._attachments !== undefined){
        this.attachments = oMap._attachments;
      }
    }
  }// constructor
  public get avatarid():any {
    if ((this._avatarid !== undefined) && (this._avatarid !== null) &&
    (this._avatarid.toString().trim().length > 0)){
      return this._avatarid;
    }
    return null;
  }
  public set avatarid(s:any) {
    this._avatarid = ((s !== undefined) && (s !== null) &&
    (s.trim().length > 0)) ? s : null;
  }
  public get has_avatarid(){
    return (this.avatarid !== null);
  }
  public get index_name():string{
    return this.collection_name + '/by_id';
  }
  public create_id():  string{
    var n:number = Math.floor(Math.random() * 10000.0);
    var sn = '' + n;
    while(sn.length < 4){
      sn = '0' + sn;n
    }
    var s:string = ((new Date()).toISOString()).substr(0,10) + '-' + sn;
    var ss = this.base_prefix + '-' + s;
    return ss;
  }// create_id
  public get base_prefix(): string {
    return '';
  }
  public get search_prefix(): string {
    return this.base_prefix;
  }
  public static check_date(d: Date): Date {
    var dRet: Date = null;
    if ((d !== undefined) && (d !== null)) {
       var t = Date.parse(d.toString());
       if (!isNaN(t)){
         dRet = d;
       }
    }
    return dRet;
  }// check_date
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
      oMap.avatarid = this.avatarid;
  }
  public to_fetch_map(oMap: any): void {
    this.to_insert_map(oMap);
    oMap._id = this.id;
    oMap._rev = this.rev;
    oMap._attachments = this.attachments;
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
