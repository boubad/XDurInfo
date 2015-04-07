// login.ts
//
import UserInfo = require('../data/model/userinfo');
import CouchDatabase = require('../data/local/couchlocaldatabase');
import LoginViewModel = require('../data/model/loginviewmodel');
//
class Login extends LoginViewModel {
  constructor(){
    super(new UserInfo(new CouchDatabase()));
  }
}// class Login
export = Login;
