//matiereviewmodel.ts
import ko = require('knockout');
import InfoData = require('../../infodata');
import Departement = require('../domain/departement');
import Unite = require('../domain/annee');
import Matiere = require('../domain/semestre');
import DepartementSigleNameViewModel = require('./departementsiglenameviewmodel');
import userInfo = require('./userinfo');
//
class MatiereViewModel extends DepartementSigleNameViewModel {
  //
  public genre:KnockoutComputed<string>;
  public mat_module:KnockoutComputed<string>;
  public coefficient:KnockoutComputed<number>;
  public ecs:KnockoutComputed<number>;
  //
  public unite: KnockoutComputed<InfoData.IUnite>;
  constructor() {
    super(new Matiere());
    this.current(new Matiere());
    this.title('Matières');
    this.unite =  ko.computed({
      read: ()=>{
        return userInfo.unite();
      },
      write : (s: InfoData.IUnite) =>{
        userInfo.unite(s);
      },
      owner: this
    });
    this.genre = ko.computed({
      read: ()=>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          return this.current().genre;
        } else {
          return null;
        }
      },
      write: (s:string) =>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          this.current().genre = s;
        }
      },
      owner: this
    });
    this.mat_module = ko.computed({
      read: ()=>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          return this.current().mat_module;
        } else {
          return null;
        }
      },
      write: (s:string) =>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          this.current().mat_module = s;
        }
      },
      owner: this
    });
    this.coefficient = ko.computed({
      read: ()=>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          return this.current().coefficient;
        } else {
          return null;
        }
      },
      write: (s:number) =>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          this.current().coefficient = s;
        }
      },
      owner: this
    });
    this.ecs = ko.computed({
      read: ()=>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          return this.current().ecs;
        } else {
          return null;
        }
      },
      write: (s:number) =>{
        if ((this.current() !== undefined) && (this.current() !== null)) {
          this.current().ecs = s;
        }
      },
      owner: this
    });
  }// constructor
  public get uniteid(): any {
    return ((this.unite() !== undefined) && (this.unite() !== null)) ?
      this.unite().id : null;
  }
  public set uniteid(id: any) {
    if ((id !== undefined) && (id !== null) && (id.toString().length > 0)) {
      var model = new Unite();
      model.id = id;
      this.dataService.get_one_item(model).then((d: Unite) => {
        this.unite(d);
        if ((d !== undefined) && (d !== null)) {
          this.modelItem.uniteid = d.id;
          this.modelItem.departementid = d.departementid;
          this.refreshAll();
          this.departementid = d.departementid;
        }
      }, (err) => {
          this.unite(null);
        });
    } else {
      this.unite(null);
    }
  }
  public addNew(): void {
    super.addNew();
    this.current(this.dataService.create_item({
      type: this.modelItem.type,
      uniteid: this.uniteid,
      departementid: this.departementid
    }));
  }
}// class MatiereViewModel
export = MatiereViewModel;
