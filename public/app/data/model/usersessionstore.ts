//usersessionstore.ts
//
import InfoData = require('../../infodata');
import ItemGenerator = require('../itemgenerator');
//
class UserSessionStore extends ItemGenerator implements InfoData.IObjectStore {
  constructor() {
    super();
  }
  public get_value(key: any): any {
    var sdata = window.sessionStorage.getItem(key.toString());
    var oMap = (sdata !== null) ? JSON.parse(sdata) : null;
    var vRet = null;
    if (oMap !== null) {
      vRet = this.create_item(oMap);
    }
    return vRet;
  }// get_value
  public store_value(key:any, item:InfoData.IBaseItem): boolean {
    if ((key !== undefined) && (key !== null) && (item !== undefined) && (item !== null)) {
        var oMap = {};
        item.to_insert_map(oMap);
        var sdata = JSON.stringify(oMap);
        window.sessionStorage.setItem(key, sdata);
        return true;
    } else if ((key !== undefined) && (key !== null) && (item === null)){
      this.remove_value(key);
    }
    return false;
  }
  public remove_value(key: any): boolean {
    if ((key !== undefined) && (key !== null)) {
      var sid = key.toString();
      if (window.sessionStorage.getItem(sid) !== null) {
        window.sessionStorage.removeItem(sid);
        return true;
      }
    }
    return false;
  }// public
}// class UserSessionStore
export = UserSessionStore;
