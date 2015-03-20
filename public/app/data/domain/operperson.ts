//// operperson.ts
import InfoData = require('../../infodata');
//
import Person = require('./person');
//
class OperPerson extends Person implements InfoData.IOperPerson {
  //
  constructor(oMap?: any) {
    super(oMap);
    this.add_role('oper');
  }
  public get type(): string {
    return "operperson";
  }
  //
} // class OperPerson
export =OperPerson;
