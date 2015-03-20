//// profperson.ts
import InfoData = require('../../infodata');
//
import Person = require('./person');
//
class ProfPerson extends Person implements InfoData.IProfPerson {
  //
  constructor(oMap?: any) {
    super(oMap);
    this.add_role('prof');
  }
  public get type(): string {
    return "profperson";
  }
  //
} // class ProfPerson
export = ProfPerson;
