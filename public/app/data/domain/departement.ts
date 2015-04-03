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
  public create_id():  string{
    return 'DEP-' + this.sigle.toUpperCase();
  }// create_id
} // class Departement
export = Departement;
