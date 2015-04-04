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
  public get base_prefix(): string {
    return 'DEP';
  }
  public get index_name():string{
    return this.collection_name + '/by_sigle';
  }
} // class Departement
export = Departement;
