//anneeviewmodel.ts
import InfoData = require('../../infodata');
import Annee = require('../domain/annee');
import IntervalViewModel = require('./intervalviewmodel');
//
class AnneeViewModel extends IntervalViewModel {
  constructor() {
    super(new Annee());
    this.current(new Annee());
  }
  public update_menu():void {
    var mm:InfoData.IMenuDesc[] = [];
    if ((this.current() !== null) && this.current().has_id){
      var id = this.current().id;
      mm.push({refer:'#semestres/' + id, title:'Semestres'});
    }
    this.menu(mm);
  }// update_menu
  public update_title(): void {
    var s = 'Années';
    if (this.departement() !== null){
      s = s + ' ' + this.departement().name;
    }
    this.title(s);
  }// update_title
}// class AnneeViewModel
export = AnneeViewModel;
