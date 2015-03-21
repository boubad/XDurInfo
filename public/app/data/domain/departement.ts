//departement.ts
import InfoData = require('../../infodata');
//
import SigleNameItem = require('./siglenameitem');
//
class Departement extends SigleNameItem implements InfoData.IDepartement {
  //
  constructor(oMap?: any) {
    super(oMap);
  } // constructor
  public get type(): string {
    return 'departement';
  }
  public get collection_name(): string {
    return 'departements';
  }
} // class Departement
export = Departement;
