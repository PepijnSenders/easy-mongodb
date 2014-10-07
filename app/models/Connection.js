var Q = require('q');

module.exports = exports = {

  collectionNames: function(db) {
    var defer = Q.defer();

    db.collectionNames(function(err, items) {
      if (err) {
        return defer.reject(err);
      }
      defer.resolve(items);
    });

    return defer.promise;
  },

  countCollection: function(collection) {
    var defer = Q.defer();

    collection.count(function(err, count) {
      if (err) {
        return defer.reject(err);
      }
      defer.resolve(count);
    });

    return defer.promise;
  },

  getDocuments: function(collection, count, page) {
    var defer = Q.defer();

    collection.find({}).limit(count).skip((page - 1) * count).toArray(function(err, documents) {
      if (err) {
        return defer.reject(err);
      }

      defer.resolve(documents);
    });

    return defer.promise;
  },

  guessFields: function(collection) {
    var defer = Q.defer();

    var fieldCollection = {};
    collection.find({}).limit(50).sort({rand: 1}).toArray(function(err, items) {
      if (err) {
        return defer.reject(err);
      }

      items.forEach(function(item) {
        for (var field in item) {
          if (field in fieldCollection) {
            fieldCollection[field]++;
          } else {
            fieldCollection[field] = 1;
          }
        }
      });

      var useFields = [];
      for (var field in fieldCollection) {
        var number = fieldCollection[field];

        var percentageActive = number / items.length;
        if (percentageActive < 0.1) {
          delete fieldCollection[field];
        } else {
          useFields.push(field);
        }
      }

      defer.resolve(useFields);
    });

    return defer.promise;
  }

};