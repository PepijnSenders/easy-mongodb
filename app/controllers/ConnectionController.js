var Database = require(global.APP_DIR + '/classes/Database'),
    Connection = require(global.APP_DIR + '/models/Connection');

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

        return Connection.guessFields(_collection);
      })
      .then(function(fields) {
        _fields = fields;
        return Connection.countCollection(_collection);
      })
      .then(function(count) {
        _count = count;
        return Connection.getDocuments(_collection, params.count, params.page);
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