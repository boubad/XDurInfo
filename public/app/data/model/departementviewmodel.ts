//departementviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
//
import ko = require('knockout');
import InfoData = require('../../infodata');
import userinfo = require('./userinfo');
import SigleNameViewModel = require('./siglenameviewmodel');
import Departement = require('../domain/departement');
//
class DepartementViewModel extends SigleNameViewModel {
  constructor(server?: InfoData.IDatabaseManager) {
    super(new Departement(), server);
  }// constructor
  public create_start_key(): any {
    return 'DEP-';
  }
  public change_current(s: InfoData.IElementDesc): any {
    super.change_current(s).then((r: InfoData.IDepartement) => {
      var dep = this._current_data();
      if (dep === null) {
        userinfo.departement = null;
      } else {
        var oMap = {};
        dep.to_fetch_map(oMap);
        userinfo.departement = new Departement(oMap);
      }
    });
  }// change_current
  public update_menu(): void {
    var mm: InfoData.IMenuDesc[] = [];
    var pPers = userinfo.person;
    if (pPers === null) {
      this.menu(mm);
      return;
    }
    if ((!pPers.is_admin) && (!pPers.is_oper) && (!pPers.is_super)) {
      this.menu(mm);
      return;
    }
    var x = this._current_data();
    var id = (x !== null) ? x.id : null;
    if (id === null) {
      this.menu(mm);
      return;
    }
    if (pPers.is_super) {
      mm.push({
        refer: '#administrators',
        title: 'Administrateurs',
        desc: "Administrateurs",
        img_source: 'images/administrators.jpg'
      });
    }
    if (pPers.is_admin || pPers.is_super) {
      mm.push({
        refer: '#operators',
        title: 'Opérateurs',
        desc: "Opérateurs",
        img_source: 'images/operators.jpg'
      });
    }
    mm.push({
      refer: "#unites/:id",
      title: 'Unités',
      desc: "Unités d'enseignement",
      img_source: 'images/unites.jpg'
    });
    mm.push({
      refer: '#groupes',
      title: 'groupes',
      desc: "Groupes",
      img_source: 'images/groupes.jpg'
    });
    mm.push({
      refer: '#annees',
      title: 'Années',
      desc: "Années universitaires",
      img_source: 'images/groupes.jpg'
    });
    mm.push({
      refer: '#enseignants',
      title: 'Enseignants',
      desc: "Enseignants",
      img_source: 'images/enseignants.jpg'
    });
    mm.push({
      refer: '#etudiants',
      title: 'Etudiants',
      desc: "Etudiants",
      img_source: 'images/etudiants.jpg'
    });
    this.menu(mm);
  }// update_menu
}// class DepartementViewModel
export = DepartementViewModel;
