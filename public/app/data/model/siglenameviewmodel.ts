//siglenameviewmodel.ts
import InfoData = require('../../infodata');
import BaseItem = require('../domain/baseitem');
import PagedViewModel = require('./pagedviewmodel');
//
class SigleNameViewModel extends PagedViewModel {
  constructor(service: InfoData.IDataManager, model: InfoData.ISigleNameItem) {
    super(service, model);
  }
  public get sigle(): string {
    if ((this.current !== undefined) && (this.current !== null)) {
      return this.current.sigle;
    } else {
      return null;
    }
  }
  public set sigle(s: string) {
    if ((this.current !== undefined) && (this.current !== null)) {
      this.current.sigle = s;
    }
  }
  //
  public get SigleNameViewModel(): string {
    if ((this.current !== undefined) && (this.current !== null)) {
      return this.current.name;
    } else {
      return null;
    }
  }
  public set name(s: string) {
    if ((this.current !== undefined) && (this.current !== null)) {
      this.current.name = s;
    }
  }
  public get remarks(): string {
    if ((this.current !== undefined) && (this.current !== null)) {
      return this.current.remarks;
    } else {
      return null;
    }
  }
  public set remarks(s: string) {
    if ((this.current !== undefined) && (this.current !== null)) {
      this.current.remarks = s;
    }
  }
}// class SigleNameViewModel
export = SigleNameViewModel;
