// departements.ts
//
import DepartementViewModel = require('../data/model/departementviewmodel');
//
class Departements extends DepartementViewModel {
  constructor(){
    super();
  }
  public activate():any {
      return this.refreshAll();
  }// ativate
}// class Departements
var pVar = new Departements();
export = pVar;
