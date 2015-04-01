var mongoskin = require('mongoskin');
var Q = require('q');
var db = mongoskin.db('mongodb://@localhost:27017/infodb', { safe: true });
var fid = mongoskin.helper.toObjectID;
function convert_id(s) {
    return fid(s);
}
function filter_arg(key, v) {
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
}
function filter_object(src) {
    if ((src == null) || (src == undefined)) {
        return null;
    }
    var vRet = {};
    for (var k in src) {
        var v = src[k];
        vRet[k] = filter_arg(k, v);
    }
    return vRet;
}
function insert_one(colname, data) {
    var deferred = Q.defer();
    var col = db.collection(colname);
    var pp = filter_object(data);
    col.insert(pp, {}, function (e, r) {
        if ((e != undefined) && (e != null)) {
            deferred.reject(new Error(e));
        }
        else {
            deferred.resolve(r);
        }
    });
    return deferred.promise;
}
exports.insert_one = insert_one;
function update_one(colname, id, data) {
    var deferred = Q.defer();
    var col = db.collection(colname);
    var nid = convert_id(id);
    var pp = filter_object(data);
    col.update({ _id: nid }, { $set: pp }, { safe: true, multi: false }, function (e, r) {
        if ((e != null) && (e != undefined)) {
            deferred.reject(new Error(e));
        }
        else {
            deferred.resolve(r);
        }
    });
    return deferred.promise;
}
exports.update_one = update_one;
function remove_one(colname, id) {
    var deferred = Q.defer();
    var col = db.collection(colname);
    var nid = convert_id(id);
    col.remove({ _id: nid }, function (e, r) {
        db.close();
        if ((e != null) && (e != undefined)) {
            deferred.reject(new Error(e));
        }
        else {
            deferred.resolve(r);
        }
    });
    return deferred.promise;
}
exports.remove_one = remove_one;
function find_one(colname, id) {
    var deferred = Q.defer();
    var col = db.collection(colname);
    var nid = convert_id(id);
    col.findOne({ _id: nid }, function (e, r) {
        db.close();
        if ((e != null) && (e != undefined)) {
            deferred.reject(new Error(e));
        }
        else {
            deferred.resolve(r);
        }
    });
    return deferred.promise;
}
exports.find_one = find_one;
function get_count(colname, data) {
    var deferred = Q.defer();
    var col = db.collection(colname);
    var pp = filter_object(data);
    col.count(pp, function (e, r) {
        if ((e != null) && (e != undefined)) {
            deferred.reject(new Error(e));
        }
        else {
            deferred.resolve(r);
        }
    });
    return deferred.promise;
}
exports.get_count = get_count;
function get_all(colname, data, start, count) {
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
    col.find(pp, options).toArray(function (e, r) {
        if ((e != null) && (e != undefined)) {
            deferred.reject(new Error(e));
        }
        else {
            deferred.resolve(r);
        }
    });
    return deferred.promise;
}
exports.get_all = get_all;
