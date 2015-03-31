// groupes.ts
//
import GroupeViewModel = require('../data/model/groupeviewmodel');
//
class Groupes extends GroupeViewModel {
  constructor(){
    super();
  }
  public activate(depid:any):any {
      return this.change_departementid(depid);
  }// ativate
}// class Departements
var pVar = new Groupes();
export = pVar;
