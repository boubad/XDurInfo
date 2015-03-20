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
}// class Etudiant
export = Etudiant;
