//infohttpmanager.ts
/// <reference path='../../../lib/typings/durandal/durandal.d.ts'/>
//
import http = require('plugins/http');
import InfoData = require('../../infodata');
//
class InfoHttpManager implements InfoData.IHttpManager {
  constructor() {
  }// constructor
  public perform_get(url: string) {
    return http.get(url);
  }
  public perform_post(url: string, data: any) {
    return http.post(url, data);
  }
  public perform_put(url: string, data: any) {
    return http.put(url, data);
  }
  public perform_remove(url: string) {
    return http.remove(url);
  }
}// class InfoHttpManager
export = InfoHttpManager;
