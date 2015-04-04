// couchlocaldatabase-test.ts
/// <reference path='../../../lib/typings/qunit/qunit.d.ts'/>
import CouchDatabase = require('data/local/maintainsdatabase');
import Person = require('data/domain/person');
import Departement = require('data/domain/departement');
import BaseItem = require('data/domain/baseitem');
import Groupe = require('data/domain/groupe');
import Unite = require('data/domain/unite');
import Annee = require('data/domain/annee');
//
var main = () => {
  //
  test('Get all departement', (assert) => {
    var done = assert.async();
    //var url = 'http://localhost:5984/geninfo';
    var db = new CouchDatabase();
    //var db = new CouchDatabase(url);
    var model = new Departement();
    var startKey = model.search_prefix;
    db.get_items_range(model).then((dd) => {
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
  test('Get persons range ', (assert) => {
    var done = assert.async();
    //var url = 'http://localhost:5984/geninfo';
    var db = new CouchDatabase();
    //var db = new CouchDatabase(url);
    var model = new Person();
    var startKey = model.search_prefix;
    db.get_items_range(model,null,null,50,11,false).then((dd) => {
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

  test('Fill departement children', (assert) => {
    var done = assert.async();
    //var url = 'http://localhost:5984/geninfo';
    var db = new CouchDatabase();
    //var db = new CouchDatabase(url);
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
        description: 'Description groupe ' + sj,
        avatarid: mx.create_id()
      }));
      bb.push(new Unite({
        departementid : depid,
        sigle: 'UN' + sj,
        name: 'Unité ' + sj,
        description: 'Description unite ' + sj,
        avatarid: mx.create_id()
      }));
      bb.push(new Annee({
        departementid : depid,
        startDate : new Date(2014 - i,8,1),
        endDate: new Date(2015 - i,5,30),
        sigle: 'ANNEE' + sj,
        name: 'Annee ' + sj,
        description: 'Description Année ' + sj,
        avatarid: mx.create_id()
      }));
    }// i
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
  
  //
  test(' isConnected',(assert)=>{
    var done = assert.async();
    var db = new CouchDatabase();
    db.isConnected().then((bRet)=>{
      ok((bRet !== undefined) && (bRet !== null) && (bRet == true));
      done();
    },(err)=>{
      ok(false,JSON.stringify(err));
      done();
    });
  });
  /*
  test(' insert departements', (assert) => {
    var done = assert.async();
    //var url = 'http://localhost:5984/geninfo';
    var db = new CouchDatabase();
    //var db = new CouchDatabase(url);
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
        avatarid: mx.create_id()
      });
      dd.push(d);
    }// i
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
    //var url = 'http://localhost:5984/geninfo';
    var db = new CouchDatabase();
    //var db = new CouchDatabase(url);
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
    db.maintains_items(dd).then((rr) => {
      ok((rr !== undefined) && (rr !== null));
      done();
    }, (err) => {
        ok(false, JSON.stringify(err));
        done();
      });
  });
  
  test(' design documents',(assert)=>{
    var done = assert.async();
    //var url = 'http://localhost:5984/geninfo';
    var db = new CouchDatabase();
    //var db = new CouchDatabase(url);
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
