// basedatastore-test.ts
//
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
import BaseDBStore = require('data/store/basedbstore');
var main = ()=>{
  test('open',(assert)=>{
    var done = assert.async();
    var base = new BaseDBStore();
    base.open().then((db)=>{
      ok((db !== undefined) && (db !== null));
      base.close();
      done();
    },(err)=>{
      ok(false,"BaseDBStore Error");
      base.close();
      done();
    });

  });
};
var run = { run : main};
export = run;
