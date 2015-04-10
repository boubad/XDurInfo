//elementdesc.ts
/// <reference path='../lib/typings/q/Q.d.ts'/>
//
import Q = require('q');
import InfoData = require('./infodata');
//
declare var window: any;
//
class ElementDesc implements InfoData.IElementDesc {
  //
  //
  public id: string;
  public text: string;
  public rev: string;
  public avatardocid: string;
  public avatarid: any;
  public url: string;
  public personid: string;
  public startDate: Date;
  public endDate: Date;
  //
  constructor(oMap?: any) {
    this.id = null;
    this.text = null;
    this.rev = null;
    this.avatardocid = null;
    this.avatarid = null;
    this.url = null;
    this.personid = null;
    this.startDate = null;
    this.endDate = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.id !== undefined) {
        this.id = oMap.id;
      }
      if (oMap.rev !== undefined) {
        this.rev = oMap.rev;
      }
      if (oMap.text !== undefined) {
        this.text = oMap.text;
      }
      if (oMap.avatardocid !== undefined) {
        this.avatardocid = oMap.avatardocid;
      }
      if (oMap.avatarid !== undefined) {
        this.avatarid = oMap.avatarid;
      }
      if (oMap.personid !== undefined) {
        this.personid = oMap.personid;
      }
      if (oMap.startDate !== undefined) {
        this.startDate = oMap.startDate;
      }
      if (oMap.endDate !== undefined) {
        this.endDate = oMap.endDate;
      }
    }// oMap
  }// constructor
  public check_url(server?: InfoData.IDatabaseManager): Q.IPromise<any> {
    if (this.hasUrl) {
      return Q.resolve(this);
    }
    this.url = null;
    var service = ((server !== undefined) && (server !== null)) ? server : null;
    if (service === null) {
      return Q.resolve(this);
    }
    if ((this.avatarid === null) || (this.avatardocid === null)) {
      return Q.resolve(this);
    }
    return service.get_docid_attachment(this.avatardocid, this.avatarid).then((blob) => {
      this.url = window.URL.createObjectURL(blob);
      return this;
    });
  }// check_url
  public get hasUrl(): boolean {
    return ((this.url !== undefined) &&
      (this.url !== null) && (this.url.trim().length > 0));
  }
}// class ElementDesc
export = ElementDesc;
