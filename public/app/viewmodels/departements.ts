//departements.ts
//
import DepartementViewModel = require('../data/model/departementviewmodel');
import dataService = require('./dataservice');
import userinfo = require('../data/model/userinfo');
//
class Departements extends DepartementViewModel {
  constructor() {
    super(dataService);
    this.title('Départements');
  }// constructor
  public canActivate(){
    var pPers = this.person();
    if (pPers === null){
      return false;
    }
    var bRet = pPers.is_super || pPers.is_admin || pPers.is_oper;
    return bRet;
  }// canActivate
}//class Departements
var pv = new Departements();
export = pv;
