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
  public create_id():  string{
    return 'PRF-' + this.departementid + '-' + this.personid;
  }// create_id
}// class Etudiant
export = Enseignant;
