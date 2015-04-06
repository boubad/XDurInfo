// descriptionitem.ts
//
import InfoData = require('../../infodata');
import BaseItem = require('./baseitem');
//
class DescriptionItem extends BaseItem  implements InfoData.IDescriptionItem {
  private _desc: string;

  //
  constructor(oMap?: any) {
    super(oMap);
    this._desc = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.description !== undefined) {
        this.description = oMap.description;
      }

    } // oMap
  } // constructor
  public get description(): string {
    return this._desc;
  } // description
  public set description(s: string) {
    this._desc = ((s !== undefined) && (s !== null) && (s.toString().trim().length > 0)) ?
    s : null;
  } // description
  public get has_description(): boolean {
    return (this.description !== null);
  }
  public to_insert_map(oMap: any) : void {
    super.to_insert_map(oMap);
    oMap.description = this.description;
  } // toInsertMap
}// class DescriptionItem
export = DescriptionItem;
