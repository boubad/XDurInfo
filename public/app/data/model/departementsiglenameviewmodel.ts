//departementsiglenameviewmodel.ts
//
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import SigleNameViewModel = require('./siglenameviewmodel');
//
class DepartementSigleNameViewModel extends SigleNameViewModel {
  public departement: InfoData.IDepartement;

  constructor(service: InfoData.IDataManager,
    model: InfoData.IDepartementSigleNameItem) {
    super(service, model);
    this.departement = null;
  }
  public get departementid(): any {
    return ((this.departement !== undefined) && (this.departement !== null)) ?
      this.departement.id : null;
  }
  public set departementid(id: any) {
    if ((id !== undefined) && (id !== null) && (id.toString().length > 0)) {
      var model = new Departement();
      model.id = id;
      this.dataService.get_one_item(model).then((d: Departement) => {
        this.departement = d;
        if ((d !== undefined) && (d !== null)) {
          this.modelItem.departementid = d.id;
          this.refreshAll();
        }
      }, (err) => {
          this.departement = null;
        });
    } else {
      this.departement = null;
    }
  }
  public addNew(): void {
    super.addNew();
    this.current = this.dataService.create_item({
      type: this.modelItem.type,
      departementid: this.departementid
    });
  }

}// class DepartementNameViewModel
export = DepartementSigleNameViewModel;
