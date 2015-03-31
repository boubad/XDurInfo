// groupeviewmodel.ts
import Groupe = require('../domain/groupe');
import DepartementSigleNameViewModel = require('./departementsiglenameviewmodel');
//
class GroupeViewModel extends DepartementSigleNameViewModel {
  constructor() {
    super(new Groupe());
    this.title('Groupes');
    this.current(new Groupe());
  }
  public update_title(): void {
    var s = 'Groupes';
    if (this.departement() !== null){
      s = s + ' ' + this.departement().name;
    }
    this.title(s);
  }// update_title
}// class GroupeViewModel
export = GroupeViewModel;
