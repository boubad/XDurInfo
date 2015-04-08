//loginviewmodel.ts
/// <reference path='../../../lib/typings/knockout/knockout.d.ts' />
//
import InfoData = require('../../infodata');
import BaseViewModel = require('././baseviewmodel');
//
class LoginViewModel extends BaseViewModel {
  //
  //
  constructor(server?: InfoData.IDatabaseManager) {
    super(server);
  }// constructor
}// class LoginViewModel
export = LoginViewModel;
