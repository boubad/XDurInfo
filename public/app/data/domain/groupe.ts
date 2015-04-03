//groupe.ts
import InfoData = require('../../infodata');
//
import DepartementSigleNameItem = require('./departementsiglename');
//
class Groupe extends DepartementSigleNameItem  implements InfoData.IGroupe {
  constructor(oMap?: any) {
    super(oMap);
  } // constructor

  public get type(): string {
    return 'groupe';
  }
  public get collection_name(): string {
    return 'groupes';
  }
  public create_id():  string{
    return 'GRP-' + this.departementid + '-' + this.sigle.toUpperCase();
  }// create_id
} // class Groupe
export = Groupe;
