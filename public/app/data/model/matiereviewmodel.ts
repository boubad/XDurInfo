//matiereviewmodel.ts
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import Unite = require('../domain/annee');
import Matiere = require('../domain/semestre');
import DepartementSigleNameViewModel = require('./departementsiglenameviewmodel');
//
class MatiereViewModel extends DepartementSigleNameViewModel {
  //
  public unite: InfoData.IUnite;
  constructor() {
    super(new Matiere());
    this.unite = new Unite();
  }
  public get genre(): string {
    if ((this.current !== undefined) && (this.current !== null)) {
      return this.current.genre;
    } else {
      return null;
    }
  }
  public set genre(s: string) {
    if ((this.current !== undefined) && (this.current !== null)) {
      this.current.genre = s;
    }
  }
  public get mat_module(): string {
    if ((this.current !== undefined) && (this.current !== null)) {
      return this.current.mat_module;
    } else {
      return null;
    }
  }
  public set mat_module(s: string) {
    if ((this.current !== undefined) && (this.current !== null)) {
      this.current.mat_module = s;
    }
  }
  public get coefficient(): number {
    if ((this.current !== undefined) && (this.current !== null)) {
      return this.current.coefficient;
    } else {
      return null;
    }
  }
  public set coefficient(s: number) {
    if ((this.current !== undefined) && (this.current !== null)) {
      this.current.coefficient = s;
    }
  }
  public get ecs(): number {
    if ((this.current !== undefined) && (this.current !== null)) {
      return this.current.ecs;
    } else {
      return null;
    }
  }
  public set ecs(s: number) {
    if ((this.current !== undefined) && (this.current !== null)) {
      this.current.ecs = s;
    }
  }
  public get uniteid(): any {
    return ((this.unite !== undefined) && (this.unite !== null)) ?
      this.unite.id : null;
  }
  public set uniteid(id: any) {
    if ((id !== undefined) && (id !== null) && (id.toString().length > 0)) {
      var model = new Unite();
      model.id = id;
      this.dataService.get_one_item(model).then((d: Unite) => {
        this.unite = d;
        if ((d !== undefined) && (d !== null)) {
          this.modelItem.uniteid = d.id;
          this.modelItem.departementid = d.departementid;
          this.refreshAll();
          this.departementid = d.departementid;
        }
      }, (err) => {
          this.unite = null;
        });
    } else {
      this.unite = null;
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
      uniteid: this.uniteid,
      departementid: this.departementid
    });
  }
}// class MatiereViewModel
export = MatiereViewModel;
