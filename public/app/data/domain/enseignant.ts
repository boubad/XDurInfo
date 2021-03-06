//enseignant.ts
import InfoData = require('../../infodata');
//
import DepartementPerson = require('./departementperson');
//
class Enseignant extends DepartementPerson implements InfoData.IEnseignant {
  //
  constructor(oMap?: any) {
    super(oMap);
  }// constructor
  public get type(): string {
    return 'enseignant';
  }
  public get collection_name(): string {
    return 'enseignants';
  }
  public get base_prefix(): string {
    return 'PRF';
  }
}// class Etudiant
export = Enseignant;
