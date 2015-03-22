//semestreviewmodel.ts
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import Annee = require('../domain/annee');
import Semestre = require('../domain/semestre');
import IntervalViewModel = require('./intervalviewmodel');
//
class SemestreViewModel extends IntervalViewModel {
  //
  public annee: InfoData.IAnnee;
  constructor() {
    super(new Semestre());
    this.annee = new Annee();
  }
  public get anneeid(): any {
    return ((this.annee !== undefined) && (this.annee !== null)) ?
      this.annee.id : null;
  }
  public set anneeid(id: any) {
    if ((id !== undefined) && (id !== null) && (id.toString().length > 0)) {
      var model = new Annee();
      model.id = id;
      this.dataService.get_one_item(model).then((d: Annee) => {
        this.annee = d;
        if ((d !== undefined) && (d !== null)) {
          this.modelItem.anneeid = d.id;
          this.modelItem.departementid = d.departementid;
          this.refreshAll();
          this.departementid = d.departementid;
        }
      }, (err) => {
          this.annee = null;
        });
    } else {
      this.annee = null;
    }
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
      anneeid: this.anneeid,
      departementid: this.departementid
    });
  }
  public get canSave(): boolean {
    if ((this.anneeid == null) || (this.departementid == null) ||
      (this.annee == null)) {
      return false;
    }
    var d01 = this.annee.startDate;
    var d02 = this.annee.endDate;
    if ((d01 == null) || (d02 === null)) {
      return false;
    }
    var item = this.current;
    if ((item === undefined) || (item === null)) {
      return false;
    }
    if (!item.has_sigle) {
      return false;
    }
    var d1: Date = this.string_to_date(this.startDate);
    var d2: Date = this.string_to_date(this.endDate);
    if ((d1 === null) || (d2 === null)) {
      return false;
    }
    if (d1.getTime() > d2.getTime()) {
      return false;
    }
    if ((d1.getTime() < d01.getTime()) || (d1.getTime() > d02.getTime())) {
      return false;
    }
    if ((d2.getTime() < d01.getTime()) || (d2.getTime() > d02.getTime())) {
      return false;
    }
    return true;
  }// canSave
}// class SemestreViewModel
export = SemestreViewModel;
