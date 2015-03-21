//unite.ts
import InfoData = require('../../infodata');
//
import DepartementSigleNameItem = require('./departementsiglename');
//
class Unite extends DepartementSigleNameItem implements InfoData.IUnite {
  constructor(oMap?: any) {
    super(oMap);
  } // constructor

  public get type(): string {
    return 'unite';
  }
  public get collection_name(): string {
    return 'unites';
  }
} // class Groupe
export = Unite;
