// groupeviewmodel.ts
import Groupe = require('../domain/groupe');
import DepartementSigleNameViewModel = require('./departementsiglenameviewmodel');
//
class GroupeViewModel extends DepartementSigleNameViewModel {
  constructor() {
    super(new Groupe());
    this.title('Groupes');
  }

}// class GroupeViewModel
export = GroupeViewModel;
