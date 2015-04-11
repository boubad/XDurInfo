//profil.ts
import InfoData = require('../infodata');
import ProfilViewModel = require('../data/model/profilviewmodel');
import dataService = require('./dataservice');
//
class Profil extends ProfilViewModel {
  constructor(){
    super(dataService);
  }
}
