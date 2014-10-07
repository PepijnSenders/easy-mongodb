var Database = require(global.APP_DIR + '/classes/Database'),
    Connection = require(global.APP_DIR + '/models/Connection'),
    Q = require('q');

module.exports = exports = {

  connect: function(req, res) {
    try {
      var params = req.expects({
        user: {
          type: 'string',
          validations: 'required'
        },
        password: {
          type: 'string',
          validations: 'required'
        },
        url: {
          type: 'string',
          validations: 'required'
        },
        app: {
          type: 'string',
          validations: 'required'
        },
        uri: {
          type: 'string'
        }
      });
    } catch (errors) {
      return res.status(400).send({
        message: errors
      });
    }

    Database
      .connect(params.uri)
      .then(function(db) {
        return Connection.collectionNames(db);
      })
      .then(function(items) {
        res.status(200).send({
          collectionNames: items.map(function(item) {
            return item.name.replace(params.app + '.', '');
          })
        });
      })
      .catch(function(err) {
        res.status(500).send({
          message: [err.message]
        })
      });
  },

  getCollection: function(req, res) {
    try {
      var params = req.expects({
        collectionName: {
          type: 'string',
          validations: 'required'
        },
        uri: {
          type: 'string',
          validations: 'required'
        },
        count: {
          type: 'number',
          validations: 'required'
        },
        page: {
          type: 'number',
          validations: 'required'
        },
        fields: {
          type: 'array',
          validations: 'required'
        },
        sorting: {
          type: 'object'
        }
      });
    } catch(errors) {
      return res.status(400).send({
        message: errors
      });
    }

    var _collection,
        _fields;
    Database
      .connect(params.uri)
      .then(function(db) {
        _collection = db.collection(params.collectionName);
        if (params.fields && params.fields.length > 0) {
          var defer = Q.defer();
          defer.resolve(params.fields);
          return defer.promise;
        } else {
          return Connection.guessFields(_collection);
        }
      })
      .then(function(fields) {
        _fields = fields;
        return Connection.countCollection(_collection);
      })
      .then(function(count) {
        _count = count;
        return Connection.getDocuments(_collection, params.count, params.page, params.sorting);
      })
      .then(function(documents) {
        res.status(200).send({
          total: _count,
          fields: _fields,
          documents: documents
        });
      })
      .catch(function(err) {
        res.status(500).send({
          message: [err.message]
        });
      });
  }

};