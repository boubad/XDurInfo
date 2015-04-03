//annee.ts
import InfoData = require('../../infodata');
//
import IntervalItem = require('./intervalitem');
//
class Annee extends IntervalItem implements InfoData.IAnnee {
  constructor(oMap?: any) {
    super(oMap);
  } // constructor

  public get type(): string {
    return 'annee';
  }
  public get collection_name(): string {
    return 'annees';
  }
  public create_id():  string{
    return 'AN-' + this.departementid + '-' + this.startDate.toISOString();
  }// create_id
} // class Annee
export = Annee;
