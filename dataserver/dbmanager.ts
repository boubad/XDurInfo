// dbmanager.ts
/// <reference path='../public/lib/typings/q/Q.d.ts'/>
//
import mongoskin = require('mongoskin');
import Q = require('q');
//
var db = mongoskin.db('mongodb://@localhost:27017/infodb', { safe: true });
var fid = mongoskin.helper.toObjectID;
//
function convert_id(s: string): any {
  return fid(s);
} // convert_id
function filter_arg(key: string, v: any): any {
  if ((v == null) || (v == undefined)) {
    return null;
  }
  var vRet = v;
  var ss = key.trim().toLowerCase();
  var n = ss.length;
  if (n > 1) {
    if (ss.substr(n - 2, n) == "id") {
      var sval = v.toString();
      vRet = convert_id(sval);
    }
  }
  return vRet;
}// filter_arg
function filter_object(src: any): any {
  if ((src == null) || (src == undefined)) {
    return null;
  }
  var vRet = {};
  for (var k in src) {
    var v = src[k];
    vRet[k] = filter_arg(k, v);
  }
  return vRet;
}// filter_object
//
export function insert_one(colname: string, data: any): any {
  var deferred = Q.defer();
  var col = db.collection(colname);
  var pp = filter_object(data);
  col.insert(pp, {}, function(e, r) {
    if ((e != undefined) && (e != null)) {
      deferred.reject(new Error(e));
    } else {
      deferred.resolve(r);
    }
  });
  return deferred.promise;
}// insert_one
export function update_one(colname: string, id: string, data: any): any {
  var deferred = Q.defer();
  var col = db.collection(colname);
  var nid = convert_id(id);
  var pp = filter_object(data);
  col.update({ _id: nid }, { $set: pp }, { safe: true, multi: false },
    function(e, r) {
      if ((e != null) && (e != undefined)) {
        deferred.reject(new Error(e));
      }
      else {
        deferred.resolve(r);
      }
    });
  return deferred.promise;
}// update_one
export function remove_one(colname: string, id: string): any {
  var deferred = Q.defer();
  var col = db.collection(colname);
  var nid = convert_id(id);
  col.remove({ _id: nid }, function(e, r) {
    db.close();
    if ((e != null) && (e != undefined)) {
      deferred.reject(new Error(e));
    }
    else {
      deferred.resolve(r);
    }
  });
  return deferred.promise;
}// remove_one
export function find_one(colname: string, id: string): any {
  var deferred = Q.defer();
  var col = db.collection(colname);
  var nid = convert_id(id);
  col.findOne({ _id: nid }, function(e, r) {
    db.close();
    if ((e != null) && (e != undefined)) {
      deferred.reject(new Error(e));
    }
    else {
      deferred.resolve(r);
    }
  });
  return deferred.promise;
}// find_one
export function get_count(colname: string, data: any): any {
  var deferred = Q.defer();
  var col = db.collection(colname);
  var pp = filter_object(data);
  col.count(pp, function(e, r) {
    if ((e != null) && (e != undefined)) {
      deferred.reject(new Error(e));
    }
    else {
      deferred.resolve(r);
    }
  });
  return deferred.promise;
}// get_count
export function get_all(colname: string, data: any, start?: number, count?: number): any {
  var deferred = Q.defer();
  var col = db.collection(colname);
  var pp = filter_object(data);
  var options = {};
  if ((start != null) && (start != undefined) && (start > 0)) {
    options['skip'] = start;
  }
  if ((count != null) && (count != undefined) && (count > 0)) {
    options['limit'] = count;
  }
  col.find(pp, options).toArray(function(e, r) {
    if ((e != null) && (e != undefined)) {
      deferred.reject(new Error(e));
    }
    else {
      deferred.resolve(r);
    }
  });
  return deferred.promise;
}// get_all
