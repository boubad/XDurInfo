//itemdatamanager-test.ts
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
import ItemDataManager = require('../services/itemdatamanager');
import Person = require('../domain/person');

//
//import http = require('plugins/http');
//
//
var main = ()=>{
    test('ItemDataManager static methods',()=>{
      ok(ItemDataManager);
      ok(ItemDataManager.form_url);
    });
    //
    test(' ItemDataManager Count',(assert)=>{
      var done = assert.async();
      var model = new Person();
       var pMan = new ItemDataManager();
      pMan.get_items_count(model).then((r)=>{
        ok((r !== undefined) && (r !== null),"response must be defined and not null");
        ok(r > 0, 'Persons count must be greater than 0');
        done();
      },(err)=>{
        ok(false,"Http get error");
        done();
      });
    });
    test(' ItemDataManager Get ',(assert)=>{
      var done = assert.async();
      var model = new Person();
       var pMan = new ItemDataManager();
        pMan.get_items(model).then((r)=>{
        ok(r,"response must be defined and not null");
        ok(r.length, 'response must be an array');
        ok(r.length > 0, 'array must not be empty');
        done();
      },(err)=>{
        ok(false,"Http get error");
        done();
      });
    });
}; // main
var run = { run : main};
export = run;
