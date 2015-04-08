// login.ts
//
import CouchDatabase = require('../data/local/couchlocaldatabase');
import LoginViewModel = require('../data/model/loginviewmodel');
//
class Login extends LoginViewModel {
  constructor(){
    super(new CouchDatabase());
  }
  public activate(): any {
    return true;
  }
}// class Login
var pv = new Login();
export = pv;
