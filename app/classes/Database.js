var MongoClient = require('mongodb').MongoClient,
    Q = require('q'),
    config = require(global.APP_DIR + '/config');

var Database = {

  connect: function (uri, options) {
    options = options || {};

    var defer = Q.defer();

    MongoClient.connect(uri, options, function(err, db) {
      if (err) {
        return defer.reject(err);
      }
      defer.resolve(db);
    });

    return defer.promise;
  }

};

module.exports = exports = Database;