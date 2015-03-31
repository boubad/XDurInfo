//departementsiglenameviewmodel.ts
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import SigleNameViewModel = require('./siglenameviewmodel');
import ItemDataManager = require('../services/itemdatamanager');
//import userInfo = require('./userinfo');
//
class DepartementSigleNameViewModel extends SigleNameViewModel {
  public departement: KnockoutObservable<InfoData.IDepartement>;

  constructor(model: InfoData.IDepartementSigleNameItem) {
    super(model);
    this.departement = ko.observable(null);
  }
  public get departementid(): any {
    return ((this.departement() !== undefined) && (this.departement() !== null)) ?
      this.departement().id : null;
  }
  public change_departementid(id: any) {
    if ((id !== undefined) && (id !== null) && (id.toString().length > 0)) {
      var model = new Departement();
      model.id = id;
      this.dataService.get_one_item(model).then((d: Departement) => {
        this.departement(d);
        this.update_title();
        if ((d !== undefined) && (d !== null) && (d.id !== null)) {
          var px = d.id;
          this.modelItem.departementid = px;
        }
        return this.refreshAll();
      });
    } else {
      this.departement(null);
      return true;
    }
  }
  public addNew(): void {
    super.addNew();
    this.current(this.dataService.create_item({
      type: this.modelItem.type,
      departementid: this.departementid
    }));
  }

}// class DepartementNameViewModel
export = DepartementSigleNameViewModel;
