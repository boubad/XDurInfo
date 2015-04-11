// home.ts
import InfoData = require('../infodata');
import BaseViewModel = require('../data/model/baseviewmodel');
import dataService = require('./dataservice');
import userinfo = require('../data/model/userinfo');
import shell = require('./shell');
//
class HomeClass extends BaseViewModel {
  constructor(){
    super(dataService);
    this.title('InfoApp');
    this.router = shell.router;
  }// constructor
  public canActivate(){
    var pPers = userinfo.person;
    if (pPers === null){
      return false;
    }
  }
  public activate(){
    var pPers = userinfo.person;
    if (pPers === null){
      return true;
    }
    var mm: InfoData.IMenuDesc[] = [];
    mm.push({
      refer: '#profil',
      title: 'Mon compte',
      desc: 'Profil utilisateur',
      img_source: 'images/profil.jpeg'
    });
    var bAdmin = ((!pPers.is_admin) && (!pPers.is_oper) && (!pPers.is_super));
    if (bAdmin) {
      mm.push({
        refer: '#departements',
        title: 'Départements',
        desc: 'Départements',
        img_source: 'images/administration.jpeg'
      });
    }
    this.menu(mm);
    return true;
  }// activate
} // class HomeClass
var pv = new HomeClass();
//
export = pv;
