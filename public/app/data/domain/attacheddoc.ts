// attacheddoc.ts
import InfoData = require('../../infodata');
//
import DescriptionItem = require('./descriptionitem');
//
class AttachedDoc extends DescriptionItem implements InfoData.IAttachedDoc {
  private _mime: string;
  private _genre: string;
  private _name: string;
  private _data: any[];
  //
  constructor(oMap?: any) {
    super(oMap);
    this._mime = null;
    this._genre = null;
    this._name = null;
    this._data = null;
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.mimetype !== undefined) {
        this.mimetype = oMap.mimetype;
      }
      if (oMap.genre !== undefined) {
        this.genre = oMap.genre;
      }
      if (oMap.name !== undefined) {
        this.name = oMap.name;
      }
      if (oMap.data !== undefined) {
        this.data = oMap.data;
      }
    } // oMap
  } // constructor
  public get data(): any[] {
    return this._data;
  } // id
  public set data(s: any[]) {
    this._data = ((s !== undefined) && (s !== null) && (s.length !== undefined) &&
    (s.length > 0)) ? s : null;
  }
  public get has_data(): boolean {
    return (this.data !== null);
  }
  public get name(): string {
    return this._name;
  } // id
  public set name(s: string) {
    this._name = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
    s.trim() : null;
  }
  public get has_name(): boolean {
    return (this.name !== null);
  }
  public get genre(): string {
    return this._genre;
  } // id
  public set genre(s: string) {
    this._genre = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
    s.trim().toLowerCase() : null;
  }
  public get has_genre(): boolean {
    return (this.genre !== null);
  }
  public get mimetype(): string {
    return this._mime;
  } // id
  public set mimetype(s: string) {
    this._mime = ((s !== undefined) && (s !== null) && (s.trim().length > 0)) ?
    s.trim() : null;
  }
  public get has_mimetype(): boolean {
    return (this.mimetype !== null);
  }

  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    oMap.mimetype = this.mimetype;
    oMap.genre = this.genre;
    oMap.name = this.name;
    oMap.data = this.data;
  } // toInsertMap
  public get is_storeable(): boolean {
    return (this.has_mimetype &&
      this.has_genre && this.has_name && this.has_data);
  }
  public get type(): string {
    return 'attacheddoc';
  }
  public get collection_name(): string {
    return 'attacheddocs';
  }
}// class AttachedDoc
export = AttachedDoc;
