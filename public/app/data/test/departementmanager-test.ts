// departementmanager-test.ts
//
//
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
//
import Q = require('q');
import DepartementManager = require('data/store/departementmanager');
import Departement = require('data/domain/departement');
import ObjectId = require('data/store/objectid');
//
var main = ()=>{
  test(' fill departements',(assert)=>{
    var done = assert.async();
    var pp = [];
    var n = 50;
    var base = new DepartementManager();
    for (var i = 0; i < n; ++i){
      var j = i + 1;
      var sj = "" + j;
      if (sj.length < 2){
        sj = "0" + sj;
      }
      var dep = new Departement({
        sigle: 'testDep' + sj,
        name : 'Name testDep ' + j,
        description : 'Rem testDep ' + j,
        avatarid : new ObjectId().toString()
      });
        pp.push(base.insert_departement_if(dep));
    }// i
     Q.all(pp).then((r)=>{
       ok(true);
       base.close();
       done();
     },(err)=>{
       ok(false);
       base.close();
       done();
     });
  });
  test(' get_all_departements',(assert)=>{
    var done = assert.async();
    var base = new DepartementManager();
    base.get_all_departements().then((dd)=>{
      ok((dd !== undefined) && (dd !== null));
      ok(dd.length >= 0,'Nb. deps ' + dd.length);
      base.close();
      done();
    },(err)=>{
      ok(false,"get_all_departements Reject Error " + err.toString());
      base.close();
      done();
    });
  });
  test(' insert_departement_if',(assert)=>{
    var done = assert.async();
    var base =  new DepartementManager();
    var sigle = 'testdep0';
    var item = new Departement({sigle:sigle, name:'testdep0',
          description:'testdep0 description',
          avatarid: new ObjectId().toString()});
    base.insert_departement_if(item).then((p) =>{
      ok((p !== undefined) && (p !== null));
      ok(p.id !== null,'inserted dep id ' + p.id);
      base.close();
      done();
    },(err) =>{
      ok(false,"insert_departement_if Reject Error " + err.toString());
      base.close();
      done();
    });
  });
  //
  test(' maintains_departement',(assert)=>{
    var done = assert.async();
    var base =  new DepartementManager();
    var sigle = 'testdep0';
    var oldRev = 0;
    var item = new Departement({sigle:sigle, name:'testdep0',
          description:'testdep0 description',
          avatarid: new ObjectId().toString()});
    base.insert_departement_if(item).then((p) =>{
      ok((p !== undefined) && (p !== null));
      ok(p.id !== null,'inserted dep id ' + p.id);
      oldRev = p.rev;
      p.name = "Toto dep";
      base.maintains_departement(p).then((pp) =>{
        ok((pp !== undefined) && (pp !== null));
        ok(pp.id !== null,'inserted dep id ' + pp.id);
        ok(p.id == pp.id,'modified dep has same id ' + pp.id);
        ok(pp.rev > oldRev, 'Revision number must be greater');
        base.close();
        done();
      }, (ex) =>{
        ok(false,"maintains_departement Reject Error " + ex.toString());
        base.close();
        done();
      });
    },(err) =>{
      ok(false,"insert_departement_if Reject Error " + err.toString());
      base.close();
      done();
    });
  });
  //
  test(' remove_departement',(assert)=>{
    var done = assert.async();
    var base =  new DepartementManager();
    var sigle = 'testdep0';
    var id = null;Departement
    var item = new Departement({sigle:sigle, name:'testdep0',
          description:'testdep0 description',
          avatarid: new ObjectId().toString()});
    base.insert_departement_if(item).then((p) =>{
      ok((p !== undefined) && (p !== null));
      ok(p.id !== null,'inserted dep id ' + p.id);
      id = p.id;
      base.find_departement_by_id(id).then((dx)=>{
        ok((dx !== undefined) && (dx !== null));
        ok(dx.id == id);
        base.remove_departement(p).then((bRet)=>{
          ok((bRet !== undefined) && (bRet !== null));
          ok(bRet == true);
          base.find_departement_by_id(id).then((pz)=>{
            ok(pz !== undefined);
            ok(pz === null,'Must return null');
            base.close();
            done();
          },(e3)=>{
            ok(false,"find_departement_by_id Reject Error " + e3.toString());
            base.close();
            done();
          });
        },(e2)=>{
          ok(false,"remove_departement Reject Error " + e2.toString());
          base.close();
          done();
        });
      },(e1)=>{
        ok(false,"find_departement_by_id Reject Error " + e1.toString());
        base.close();
        done();
      });
    },(err) =>{
      ok(false,"insert_departement_if Reject Error " + err.toString());
      base.close();
      done();
    });
  });
  //
};
var run = { run : main};
export = run;
