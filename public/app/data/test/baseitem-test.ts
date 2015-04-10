//baseitem-test.ts
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
import BaseItem = require('../domain/baseitem');
//
var main = ()=>{

    test('BaseItem Static Methods',()=>{
      ok(BaseItem,'BaseItem must be defined');
    });
}; // main
var run = { run : main};
export = run;
