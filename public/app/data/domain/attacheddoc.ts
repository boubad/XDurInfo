// attacheddoc.ts
import InfoData = require('../../infodata');
//
import BaseItem = require('./baseitem');
//
class AttachedDoc extends BaseItem implements InfoData.IAttachedDoc {
  private _desc: string;
  private _mime: string;
  private _genre: string;
  private _name: string;
  private _data: any[];
  //
  constructor(oMap?: any) {
    super(oMap);
    if ((oMap !== undefined) && (oMap !== null)) {
      if (oMap.remarks !== undefined) {
        this.remarks = oMap.remarks;
      }
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
    return (this._data !== undefined) ? this._data : null;
  } // id
  public set data(s: any[]) {
    if ((s !== undefined) && (s !== null) && (s.length > 0)) {
      this._data = s;
    } else {
      this._data = null;
    }
  }
  public get has_data(): boolean {
    return (this.data !== null);
  }
  public get name(): string {
    return (this._name !== undefined) ? this._name : null;
  } // id
  public set name(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._name = s.trim();
    } else {
      this._name = null;
    }
  }
  public get has_name(): boolean {
    return (this.name !== null);
  }
  public get genre(): string {
    return (this._genre !== undefined) ? this._genre : null;
  } // id
  public set genre(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._genre = s.trim().toLowerCase();
    } else {
      this._genre = null;
    }
  }
  public get has_genre(): boolean {
    return (this.genre !== null);
  }
  public get mimetype(): string {
    return (this._mime !== undefined) ? this._mime : null;
  } // id
  public set mimetype(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._mime = s.trim();
    } else {
      this._mime = null;
    }
  }
  public get has_mimetype(): boolean {
    return (this.mimetype !== null);
  }
  public get remarks(): string {
    return (this._desc !== undefined) ? this._desc : null;
  } // description
  public set remarks(s: string) {
    if ((s !== undefined) && (s !== null) && (s.trim().length > 0)) {
      this._desc = s.trim();
    } else {
      this._desc = null;
    }
  } // description
  public get has_remarks(): boolean {
    return (this.remarks !== null);
  }
  public to_insert_map(oMap: any): void {
    super.to_insert_map(oMap);
    if (this.has_remarks) {
      oMap.remarks = this.remarks;
    }
    if (this.has_mimetype) {
      oMap.mimetype = this.mimetype;
    }
    if (this.has_genre) {
      oMap.genre = this.genre;
    }
    if (this.has_name) {
      oMap.name = this.name;
    }
    if (this.has_data) {
      oMap.data = this.data;
    }
  } // toInsertMap
  public get is_storeable():boolean {
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
