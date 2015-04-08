//departementviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
/// <reference path='../../../lib/typings/q/Q.d.ts' />
//
import Q = require('q');
import ko = require('knockout');
import InfoData = require('../../infodata');
import BaseViewModel = require('./baseviewmodel');
import userinfo = require('./userinfo');
import PagedViewModel = require('./pageviewmodel');
import Departement = require('../domain/departement');
//
class DepartementViewModel extends PagedViewModel {
  constructor(server?: InfoData.IDatabaseManager) {
    super(new Departement(),server);
    this.canNextPage = ko.observable(false);
  }// constructor
  public create_start_key():any{
    return 'DEP-';
  }
  public create_elem_item(src:any) : InfoData.IElementDesc {
    var xRet:InfoData.IElementDesc = {
      id : (src.id !== undefined) ? src.id : null,
      key: (src.key !== undefined) ? src.key : null,
      value: (src.text !== undefined) ? src.value : null,
      text: (src.text !== undefined) ? src.text : null,
      rev: (src.rev !== undefined) ? src.rev : null,
      avatarid: (src.avatarid !== undefined) ? src.avatarid : null,
      url:null
    };
    if ((src.value !== undefined) && (src.value !== null) && (src.value.length > 1)){
      xRet.text = src.value[0];
      xRet.avatarid = src.value[1];
    }
    return xRet;
  }
}// class DepartementViewModel
export = DepartementViewModel;
