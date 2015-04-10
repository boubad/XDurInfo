//dataservice.ts
import PouchDatabase = require('../data/local/couchlocaldatabase');
//
var dataService = new PouchDatabase();
export = dataService;
