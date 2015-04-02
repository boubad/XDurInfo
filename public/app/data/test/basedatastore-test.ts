// basedatastore-test.ts
//
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
import BaseDBStore = require('data/store/basedbstore');
import Departement = require('data/domain/departement');

//
var main = ()=>{
  test('open',(assert)=>{
    var done = assert.async();
    var base = new BaseDBStore();
    base.open().then((db)=>{
      ok((db !== undefined) && (db !== null));
      base.close();
      done();
    },(err)=>{
      ok(false,"BaseDBStore Reject Error " + err.toString());
      base.close();
      done();
    });
  });
  test(' find_one_by_index',(assert)=>{
    var done = assert.async();
    var base = new BaseDBStore();
    var indexname = 'sigle';
    var indexval = 'testdep';
    var item = new Departement({sigle:indexval, name:'testdep'});
    base.open().then((db)=>{
      ok((db !== undefined) && (db !== null),'IDBDatabase OK!');
      base.find_item_by_index(item,indexname, indexval).then((r)=>{
        ok(r !== undefined, 'find item OK!');
        if (r !== null){
          ok(r !== null,'Found item ' + r.toString());
        } else {
          ok(true, 'Found null item');
        }
        if (r === null){
          base.maintains_one_item(item).then((z)=>{
            ok((z !== undefined) && (z !== null),'Item inserted!');
            base.close();
            done();
          },(ex)=>{
            ok(false,"Maintains Reject Error " + ex.toString());
            base.close();
            done();
          });
        } else {
          ok(true, 'Got data ' + r.toString());
          base.close();
          done()
        }
      },(e)=>{
        ok(false,"Reject Error " + e.toString());
        base.close();
        done();
      });
    },(err)=>{
      ok(false,"BaseDBStore Reject Error " + err.toString());
      base.close();
      done();
    });
  });
  test('get_items',(assert)=>{
    var done = assert.async();
    var base = new BaseDBStore();
    var item = new Departement();
    base.open().then((db)=>{
      ok((db !== undefined) && (db !== null));
      base.get_items(item).then((dd)=>{
        ok ((dd !== undefined) && (dd !== null), 'response is defined and not null');
        ok (dd.length >= 0, 'items count greater or equal 0 ==> ' + dd.length);
        base.close();
        done();
      },(err) =>{
        ok(false,"get_items Reject Error " + err.toString());
        base.close();
        done();
      });
    },(err)=>{
      ok(false,"BaseDBStore Reject Error " + err.toString());
      base.close();
      done();
    });
  });
  test('get_items by index',(assert)=>{
    var done = assert.async();
    var base = new BaseDBStore();
    var item = new Departement();
    var indexname = 'sigle';
    base.open().then((db)=>{
      ok((db !== undefined) && (db !== null));
      base.get_items(item,indexname).then((dd)=>{
        ok ((dd !== undefined) && (dd !== null), 'response is defined and not null');
        ok (dd.length >= 0, 'items count greater or equal 0 ==> ' + dd.length);
        base.close();
        done();
      },(err) =>{
        ok(false,"get_items Reject Error " + err.toString());
        base.close();
        done();
      });
    },(err)=>{
      ok(false,"BaseDBStore Reject Error " + err.toString());
      base.close();
      done();
    });
  });
};
var run = { run : main};
export = run;
