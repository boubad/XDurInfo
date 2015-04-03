//etudiant.ts
import InfoData = require('../../infodata');
//
import DepartementPerson = require('./departementperson');
//
class Etudiant extends DepartementPerson implements InfoData.IEtudiant {
  //
  constructor(oMap?: any) {
    super(oMap);
  }// constructor
  public get type(): string {
    return 'etudiant';
  }
  public get collection_name(): string {
    return 'etudiants';
  }
  public create_id():  string{
    return 'ETD-' + this.departementid + '-' + this.personid;
  }// create_id
}// class Etudiant
export = Etudiant;
