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
  public create_id():  string{
    return 'ADM-' + this.departementid + '-' + this.personid;
  }// create_id
}// class Administrator
export = Administrator;
