// dummyTest.ts
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
var main = ()=>{
  test("Dummy test",()=>{
    equal(2, 2, 'The return should be 2.');
  });
};
var run = { run : main};
export = run;
