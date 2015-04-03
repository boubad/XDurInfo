//operator.ts
import InfoData = require('../../infodata');
//
import DepartementPerson = require('./departementperson');
//
class Operator extends DepartementPerson implements InfoData.IOperator {
  //
  constructor(oMap?: any) {
    super(oMap);
  }// constructor
  public get type(): string {
    return 'operator';
  }
  public get collection_name(): string {
    return 'operators';
  }
  public create_id():  string{
    return 'OPR-' + this.departementid + '-' + this.personid;
  }// create_id
}// class Operator
export = Operator;
