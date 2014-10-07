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
        }
      });
    } catch (errors) {
      res.status(400).send({
        message: errors
      });
    }
  }

};