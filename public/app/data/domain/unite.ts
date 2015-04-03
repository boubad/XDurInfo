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
  public create_id():  string{
    return 'UN-' + this.departementid + '-' + this.sigle.toUpperCase();
  }// create_id
} // class Groupe
export = Unite;
