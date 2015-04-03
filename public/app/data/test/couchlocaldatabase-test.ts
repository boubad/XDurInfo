// couchlocaldatabase-test.ts
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
import CouchDatabase = require('data/local/couchlocaldatabase');
import Person = require('data/domain/person');
//

//
var db = new CouchDatabase();
var main = ()=>{

  //
  test(' isConnected',(assert)=>{
    var done = assert.async();
    db.isConnected().then((bRet)=>{
      ok((bRet !== undefined) && (bRet !== null) && (bRet == true));
      done();
    },(err)=>{
      ok(false,JSON.stringify(err));
      done();
    });
  });
  //
  test(' design documents',(assert)=>{
    var done = assert.async();
    db.create_design_docs().then((bRet)=>{
      ok((bRet !== undefined) && (bRet !== null) && (bRet == true));
      var pPers = new Person({username:'admin',firstname:'administator',
      lastname:'System',roles:['super','admin']});
      pPers.reset_password();
      db.maintains_one_item(pPers).then((r)=>{
        ok((r !== undefined) && (r !== null),'Got person ' + r.toString());
        done();
      },(e)=>{
        ok(false,JSON.stringify(e));
        done();
      });
    },(err)=>{
      ok(false,JSON.stringify(err));
      done();
    });
  });
  //
  test(' find_person_by_username',(assert)=>{
    var done = assert.async();
    var username = 'admin';
    db.find_person_by_username(username).then((pPers)=>{
     ok((pPers !== undefined) && (pPers !== null) ,'Got person ' + pPers.toString());
      done();
    },(err)=>{
      ok(false,JSON.stringify(err));
      done();
    });
  });
  //
};
var run = { run : main};
export = run;
