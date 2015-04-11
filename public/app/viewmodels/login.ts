// login.ts
//
import LoginViewModel = require('../data/model/loginviewmodel');
import dataService = require('./dataservice');
import shell = require('./shell');
//
class Login extends LoginViewModel {
  constructor(){
    super(dataService);
    this.router = shell.router;
  }
  public activate(): any {
    return true;
  }
}// class Login
var pv = new Login();
export = pv;
