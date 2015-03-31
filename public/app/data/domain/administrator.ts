//operator.ts
import InfoData = require('../../infodata');
//
import DepartementPerson = require('./departementperson');
//
class Administrator extends DepartementPerson implements InfoData.IAdministrator {
  //
  constructor(oMap?: any) {
    super(oMap);
  }// constructor
  public get type(): string {
    return 'adminustrator';
  }
  public get collection_name(): string {
    return 'administrators';
  }
}// class Administrator
export = Administrator;
