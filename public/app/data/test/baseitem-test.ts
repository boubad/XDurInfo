//baseitem-test.ts
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
import BaseItem = require('../domain/baseitem');
//
var main = ()=>{

    test('BaseItem Static Methods',()=>{
      ok(BaseItem,'BaseItem must be defined');
       var t = BaseItem.date_format;
       ok(t,'date_format property must be defined');
       equal(t,'YYYY-MM-DD');
       ok(BaseItem.check_date);
       ok(BaseItem.string_to_date);
       ok(BaseItem.date_to_string);
       var d:Date = new Date(2015,2,19);
       var dRet = BaseItem.check_date(d);
       deepEqual(dRet, d,"actual " + dRet.toString());
       var sRet = BaseItem.date_to_string(d);
       deepEqual(sRet,'2015-03-19');
       var xRet = BaseItem.string_to_date('2015-03-19');
       deepEqual(xRet,d);
    });
}; // main
var run = { run : main};
export = run;
