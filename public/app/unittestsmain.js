"use strict";
require.config({
    paths: {
        'QUnit': '../lib/qunit/qunit-1.17.1',
        'blanket': '../lib/blanket/blanket.min',
        'text': '../lib/require/text',
        'durandal': '../lib/durandal/js',
        'plugins': '../lib/durandal/js/plugins',
        'transitions': '../lib/durandal/js/transitions',
        'knockout': '../lib/knockout/knockout-3.1.0',
        'bootstrap': '../lib/bootstrap/js/bootstrap',
        'jquery': '../lib/jquery/jquery-1.9.1',
        'q': '../lib/q/q',
        'pouchdb':'../lib/pouchdb/pouchdb-3.3.1.min',
        'pouchdb-find':'../lib/pouchdb/pouchdb.find.min',
        'moment': '../lib/moment/moment',
        'domain':'./data/domain',
        'model':'./data/model',
        'services':'./data/services',
        'test':'./data/test'
    },
    shim: {
      'bootstrap': {
        deps: ['jquery'],
        exports: 'jQuery'
      },
       'q': {
         exports: 'Q'
       },
       'pouchdb':{
         exports: 'PouchDB'
       },
       'knockout':{
         exports: 'ko'
       },
       'QUnit': {
           exports: 'QUnit',
           init: function() {
               QUnit.config.autoload = false;
               QUnit.config.autostart = false;
           }
       }
    }
});
// require the unit tests.
require(
    ['q','pouchdb','QUnit','test/couchlocaldatabase-test'],
    function(Q,PouchDB,QUnit, mytest) {
        PouchDB.debug.enable('*');
        // run the tests.
        //dummyTest.run();
        mytest.run();
        // start QUnit.
        QUnit.load();
        QUnit.start();
    }
);
