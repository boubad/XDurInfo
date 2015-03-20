// server.ts
//
import DBManager = require('./dbmanager');
//
class DataServer {
  constructor(app: any) {
    app.get('/api/:collectionName', function(req, res, next) {
      var bcount = false;
      var skip = 0;
      var limit = 0;
      var pp = {};
      for (var k in req.query) {
        var v = req.query[k];
        if (k == '$count') {
          bcount = true;
        }
        else if (k == '$limit') {
          limit = v;
        }
        else if (k == '$skip') {
          skip = v;
        }
        else {
          pp[k] = v;
        }
      }
      var collectionName = req.params.collectionName;
      if (bcount) {
        DBManager.get_count(collectionName, pp).then(function(results) {
          res.send({ count: results });
        }).catch(function(err) {
            next(err);
          });
      } else {
        DBManager.get_all(collectionName, pp, skip, limit).then(function(results) {
          res.send(results);
        }).catch(function(err) {
            next(err);
          });
      }
    });
    app.post('/api/:collectionName', function(req, res, next) {
      var collectionName = req.params.collectionName;
      //console.log(req.body);
      DBManager.insert_one(collectionName, req.body).then(function(results) {
        res.send(results);
      }).catch(function(err) {
          next(err);
        });
    });
    app.get('/api/:collectionName/:id', function(req, res, next) {
      var collectionName = req.params.collectionName;
      var id = req.params.id;
      DBManager.find_one(collectionName, id).then(function(results) {
        res.send(results);
      }).catch(function(err) {
          next(err);
        });
    });
    app.put('/api/:collectionName/:id', function(req, res, next) {
      var collectionName = req.params.collectionName;
      var id = req.params.id;
      var pp = req.body;
      DBManager.update_one(collectionName, id, pp).then(function(result) {
        res.send((result === 1) ? { msg: 'success' } : { msg: 'error' });
      }).catch(function(err) {
          next(err);
        });
    });
    app.delete('/api/:collectionName/:id', function(req, res, next) {
      var collectionName = req.params.collectionName;
      var id = req.params.id;
      DBManager.remove_one(collectionName, id).then(function(result) {
        res.send((result === 1) ? { msg: 'success' } : { msg: 'error' });
      }).catch(function(err) {
          next(err);
        });
    });
  }
} // class DataServer
export = DataServer;
