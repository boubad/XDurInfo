// couchlocaldatabase-test.ts
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
/// <reference path='../../../lib/typings/pouchdb/pouchdb.d.ts' />
//
import PouchDB = require('pouchdb');
//
import CouchDatabase = require('data/local/maintainsdatabase');
import Person = require('data/domain/person');
import Departement = require('data/domain/departement');
import BaseItem = require('data/domain/baseitem');
import Groupe = require('data/domain/groupe');
import Unite = require('data/domain/unite');
import Annee = require('data/domain/annee');
import Matiere = require('data/domain/matiere');
import Semestre = require('data/domain/semestre');
//
import userinfo = require('data/model/userinfo');
//
var remoteUrl = 'http://localhost:5984/geninfo';
//var remoteUrl = 'http://boubadiarra.hd.free.fr:5984/geninfo';
//
var dbMode = 'remote';
//var dbMode = 'local';
//
var create_database = () => {
  if (dbMode == 'remote') {
    return new CouchDatabase(remoteUrl);
  } else {
    return new CouchDatabase();
  }
};
//
//
var main = () => {
/*
  test("Remote replication test", (assert) => {
    var done = assert.async();
    var rep = PouchDB.replicate('http://localhost:5984/geninfo', 'geninfo').
      on('change', function(info) {
        // handle change
      }).on('paused', function() {
        // replication paused (e.g. user went offline)
      }).on('active', function() {
        // replicate resumed (e.g. user went back online)
      }).on('denied', function(info) {
        // a document failed to replicate, e.g. due to permissions
      }).on('complete', function(info) {
        ok(true,'Info: ' + JSON.stringify(info));
        done();
      }).on('error', function(err) {
        ok(true,'Error: ' + JSON.stringify(err));
        done();
      });

  });
  */

  test('Get all matieres', (assert) => {
    var done = assert.async();
    var model = new Matiere();
    var db = create_database();
    db.find_elements_range(model.index_name).then((dd) => {
      ok((dd !== undefined) && (dd !== null) && (dd.length >= 0), "response is an array");
      var n = dd.length;
      ok(n >= 0, 'array length is ' + n);
      for (var i = 0; i < n; ++i) {
        var d = dd[i];
        ok((d !== undefined) && (d !== null), 'item ' + i + ' is ' + JSON.stringify(d));
      }// i
      done();
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });

/*

test(' insert admins', (assert) => {
 var done = assert.async();
 var dd: Person[] = [];
 var mx = new BaseItem();
 var p = new Person({
   username:'admin',
   lastname: 'System',
   firstname: 'Administrator',
   roles:['super','admin']
 });
 p.reset_password();
 dd.push(p);
 var px = new Person({
   username:'boubad',
   lastname: 'diarra',
   firstname: 'boubacar',
   roles:['prof','admin']
 });
 px.reset_password();
 dd.push(px);
 var db = create_database();
 db.maintains_items(dd).then((rr) => {
   ok((rr !== undefined) && (rr !== null));
   done();
 }, (err) => {
     ok(false, JSON.stringify(err));
     done();
   });
});
*/
  //
/*
  test(' find_person_by_id', (assert) => {
    var done = assert.async();
    var username = 'PER-admin';
    var db = create_database();
    db.get_item_by_id(username).then((pPers) => {
      if (pPers == null) {
        ok(true, 'OOPS!!! not found')
      } else {
        ok((pPers !== undefined) && (pPers !== null), 'Found ' + pPers.toString());
      }
      done();
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });

  test(' find_person_by_username', (assert) => {
    var done = assert.async();
    var username = 'boubad';
    var db = create_database();
    db.find_person_by_username(username).then((pPers) => {
      if (pPers == null) {
        ok(true, 'OOPS!!! not found')
      } else {
        ok((pPers !== undefined) && (pPers !== null), 'Found ' + pPers.toString());
      }
      done();
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });
*/
  //
  /*
  test('Remove annees', (assert)=>{
    var done = assert.async();
    var viewName = 'annees/by_id';
    var db = create_database();
    db.remove_data(viewName).then((d) => {
      ok(true,JSON.stringify(d));
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });
  */
  /*
  test('fetch annees', (assert) => {
    var done = assert.async();
    var depid = 'DEP-DEP01';
    var db = create_database();
    db.get_item_by_id(depid).then((d) => {
      var ddid = d.id;
      var model = new Annee();
      model.departementid = ddid;
      var start = [depid]
      var end = [depid, {}];
      var db = create_database();
      db.find_elements_range(model.index_name, start, end).then((pp) => {
        ok((pp !== undefined) && (pp !== null), 'annees length ' + pp.length);
        var n = pp.length;
        for (var i = 0; i < n; ++i) {
          var x = pp[i];
          ok(x != null, 'item ' + i + " is " + JSON.stringify(x));
        }// i
        done();
      }, (ex) => {
          ok(false, JSON.stringify(ex));
          done();
        });
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });
  */
/*
  test(' isConnected', (assert) => {
    var done = assert.async();
    var db = create_database();
    db.isConnected().then((bRet) => {
      ok((bRet !== undefined) && (bRet !== null) && (bRet == true));
      done();
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });
*/

  test('Get all departement', (assert) => {
    var done = assert.async();
    var model = new Departement();
    var startKey = model.search_prefix;
    var db = create_database();
    db.find_elements_range(model.index_name).then((dd) => {
      ok((dd !== undefined) && (dd !== null) && (dd.length >= 0), "response is an array");
      var n = dd.length;
      ok(n >= 0, 'array length is ' + n);
      for (var i = 0; i < n; ++i) {
        var d = dd[i];
        var s = (d === null) ? 'NULL' : JSON.stringify(d);
        ok(true,s);
        //ok((d !== undefined) && (d !== null), 'item ' + i + ' is ' + JSON.stringify(d));
      }// i
      done();
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });
  
/*
  test('Get persons range ', (assert) => {
    var done = assert.async();
    var model = new Person();
    var startKey = model.search_prefix;
    var db = create_database();
    db.find_elements_range(model.index_name, null, null, 50, 11, false).then((dd) => {
      ok((dd !== undefined) && (dd !== null) && (dd.length >= 0), "response is an array");
      var n = dd.length;
      ok(n >= 0, 'array length is ' + n);
      for (var i = 0; i < n; ++i) {
        var d = dd[i];
        ok((d !== undefined) && (d !== null), 'item ' + i + ' is ' + JSON.stringify(d));
      }// i
      done();
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });
  */
  /*
    test(' insert departements', (assert) => {
      var done = assert.async();
      var n = 50;
      var dd: Departement[] = [];
      var mx = new BaseItem();
      for (var i = 0; i < n; ++i) {
        var j = i + 1;
        var sj = "" + j;
        if (sj.length < 2) {
          sj = '0' + sj;
        }
        var d = new Departement({
          sigle: 'dep' + sj,
          name: 'Département ' + sj,
          description: 'Description ddepartement ' + sj,
        });
        dd.push(d);
      }// i
      var db = create_database();
      db.maintains_items(dd).then((rr) => {
        ok((rr !== undefined) && (rr !== null));
        done();
      }, (err) => {
          ok(false, JSON.stringify(err));
          done();
        });
    });
     test(' insert persons', (assert) => {
      var done = assert.async();
      var n = 128;
      var dd: Person[] = [];
      var mx = new BaseItem();
      var p = new Person({
        username:'admin',
        lastname: 'System',
        firstname: 'Administrator',
        roles:['super','admin']
      });
      p.reset_password();
      dd.push(p);
      for (var i = 0; i < n; ++i) {
        var j = i + 1;
        var sj = '' + j;
        while (sj.length < 3){
          sj = '0' + sj;
        }
        var d = new Person({
          username: 'pers' + sj,
          lastname: 'lastname ' + sj,
          firstname: 'firstname' + sj,
          description: 'Description person ' + sj
        });
        d.reset_password();
        dd.push(d);
      }// i
      var db = create_database();
      db.maintains_items(dd).then((rr) => {
        ok((rr !== undefined) && (rr !== null));
        done();
      }, (err) => {
          ok(false, JSON.stringify(err));
          done();
        });
    });
    test('Fill departement children', (assert) => {
      var done = assert.async();
      var depid = 'DEP-DEP01';
      var mm = 10;
      var bb = [];
      var mx = new BaseItem();
      for (var i = 0; i < mm; ++i){
        var j = i + 1;
        var sj = "" + j;
        if (sj.length < 2) {
          sj = '0' + sj;
        }
        bb.push(new Groupe({
          departementid : depid,
          sigle: 'Grp' + sj,
          name: 'Groupe ' + sj,
          description: 'Description groupe ' + sj
        }));
        bb.push(new Unite({
          departementid : depid,
          sigle: 'UN' + sj,
          name: 'Unité ' + sj,
          description: 'Description unite ' + sj
        }));
        bb.push(new Annee({
          departementid : depid,
          startDate : new Date(2014 - i,8,1),
          endDate: new Date(2015 - i,5,30),
          sigle: 'ANNEE' + sj,
          name: 'Annee ' + sj,
          description: 'Description Année ' + sj
        }));
      }// i
      var db = create_database();
      db.maintains_items(bb).then((dd) => {
        ok((dd !== undefined) && (dd !== null) && (dd.length >= 0), "response is an array");
        var n = dd.length;
        ok(n >= 0, 'array length is ' + n);
        for (var i = 0; i < n; ++i) {
          var d = dd[i];
          ok((d !== undefined) && (d !== null), 'item ' + i + ' is ' + d.toString());
        }// i
        done();
      }, (err) => {
          ok(false, JSON.stringify(err));
          done();
        });
    });
    test ('insert matieres',(assert)=>{
      var done = assert.async();
      var uniteid = 'UNT-DEP-DEP01-UN01';
      var depid = "DEP-DEP01";
      var mm = 10;
      var bb = [];
      for (var i = 0; i < mm; ++i){
        var j = i + 1;
        var sj = "" + j;
        if (sj.length < 2) {
          sj = '0' + sj;
        }
        bb.push(new Matiere({
          departementid : depid,
          uniteid: uniteid,
          sigle: 'Mat' + sj,
          name: 'Matière ' + sj,
          description: 'Description matière ' + sj,
          genre: 'Pratique',
          mat_module: 'Md453',
          coefficient : 5,
          ecs: 400
        }));
      }// i
      var db = create_database();
      db.maintains_items(bb).then((dd) => {
        ok((dd !== undefined) && (dd !== null) && (dd.length >= 0), "response is an array");
        var n = dd.length;
        ok(n >= 0, 'array length is ' + n);
        for (var i = 0; i < n; ++i) {
          var d = dd[i];
          ok((d !== undefined) && (d !== null), 'item ' + i + ' is ' + d.toString());
        }// i
        done();
      }, (err) => {
          ok(false, JSON.stringify(err));
          done();
        });
    });
  */
/*
    test(' design documents',(assert)=>{
      var done = assert.async();
      var db = create_database();
      db.create_design_docs().then((bRet)=>{
        ok((bRet !== undefined) && (bRet !== null));
        done();
      },(err)=>{
        ok(false,JSON.stringify(err));
        done();
      });
    });
*/
};
var run = { run: main };
export = run;
