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
  public get base_prefix(): string {
    return 'OPR';
  }
}// class Operator
export = Operator;
