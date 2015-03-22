//uniteviewmodel.ts
//
import InfoData = require('../../infodata');
import Unite = require('../domain/unite');
import DepartementSigleNameViewModel = require('./departementsiglenameviewmodel');
//
class UniteViewModel extends DepartementSigleNameViewModel {
  constructor() {
    super(new Unite());
  }
  public update_menu():void {
    var mm:InfoData.IMenuDesc[] = [];
    if ((this.current !== null) && this.current.has_id){
      var id = this.current.id;
      mm.push({refer:'#matieres/' + id, title:'Matières'});
    }
    this.menu = mm;
  }// update_menu
}// class UniteViewModel
export = UniteViewModel;
