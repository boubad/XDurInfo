// infohttpmanager.ys
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
import pMan = require('../services/itemdatamanager');
import Person = require('../domain/person');

//
import http = require('plugins/http');
//
var main = ()=>{
  //
  test("Persons test",()=>{
    var pPers = new Person();
    ok(pPers != null);
  });
  //
  /*
  test("InfoHttpManager get test",(assert)=>{
    var done = assert.async();
    var url = '/api/persons';
    http.get(url).then((r)=>{
      assert.ok((r !== undefined) && (r !== null));
      done();
    },(err)=>{
      assert.ok(false,'get test error');
       done();
    });
  });
  */
  //
  test("Persons count test",(assert)=>{
    var done = assert.async();
    var pPers = new Person();
    var url = '/api/persons?$count=5';
    http.get(url).then((r)=>{
      assert.ok((r !== undefined) && (r !== null));
      done();
    },(err)=>{
      assert.ok(false,'Persons count test error');
       done();
    });
  });
  //
};
var run = { run : main};
export = run;
