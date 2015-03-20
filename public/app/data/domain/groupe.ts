//groupe.ts
import InfoData = require('../../infodata');
//
import SigleNameItem = require('./siglenameitem');
//
class Groupe extends SigleNameItem  implements InfoData.IGroupe {
  constructor(oMap?: any) {
    super(oMap);
  } // constructor

  public get type(): string {
    return 'groupe';
  }
  public get collection_name(): string {
    return 'groupes';
  }
} // class Groupe
export = Groupe;
