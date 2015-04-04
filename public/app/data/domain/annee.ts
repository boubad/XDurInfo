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
  public get base_prefix(): string {
    return 'ANN';
  }
} // class Annee
export = Annee;
