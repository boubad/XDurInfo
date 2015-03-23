//departementviewmodel.ts
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import SigleNameViewModel = require('./siglenameviewmodel');
//
class DepartementViewModel extends SigleNameViewModel {
  constructor() {
    super(new Departement());
    this.title('Départements');
    this.current(new Departement());
  }
  public update_menu():void {
    var mm:InfoData.IMenuDesc[] = [];
    var v = this.current();
    if ((v !== undefined) && (v !== null) && (v.id !== undefined) &&
    (v.id != null)){
      var id = v.id;
      mm.push({refer:'#groupes/' + id, title:'Groupes'});
      mm.push({refer:'#unites/' + id, title:'Unités'});
      mm.push({refer:'#annees/' + id, title:'Années'});
      mm.push({refer:'#profs/' + id, title:'Enseignants'});
      mm.push({refer:'#etuds/' + id, title:'Etudiants'});
      mm.push({refer:'#opers/' + id, title:'Opérateurs'});
    }
    this.menu(mm);
  }// update_menu
}// class DepartementNameViewModel
export = DepartementViewModel;
