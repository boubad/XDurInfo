// departements.ts
//
import DepartementViewModel = require('../data/model/departementviewmodel');
//
class Departements extends DepartementViewModel {
  constructor(){
    super();
    this.refreshAll();
  }
  public activate():any {
    return true;
      //return this.refreshAll();
  }// ativate
}// class Departements
var pVar = new Departements();
export = pVar;
