// departements.ts
//
/// <reference path='../../lib/typings/durandal/durandal.d.ts'/>
//
import app = require('durandal/app');
import DepartementViewModel = require('../data/model/departementviewmodel');
//
class Departements extends DepartementViewModel {
  constructor(){
    super();
  }
  public perform_conditionally(message:string, oper:()=>any) {
    app.showMessage(message,'InfoData',['Yes','No']).then((r)=>{
      if ((r !== undefined) && (r !== null) && (r == 'Yes')){
        oper();
      }
    });
  }
  public activate():any {
      if (this.items.length < 1){
        this.refreshAll();
      }
  }// ativate
}// class Departements
export = Departements;
