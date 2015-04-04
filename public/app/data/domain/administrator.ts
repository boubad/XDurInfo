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
    return 'administrator';
  }
  public get collection_name(): string {
    return 'administrators';
  }
  public get base_prefix(): string {
    return 'ADM';
  }
}// class Administrator
export = Administrator;
