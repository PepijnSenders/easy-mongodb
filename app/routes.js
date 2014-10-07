var PagesController = require(global.APP_DIR + '/controllers/PagesController'),
    ConnectionController = require(global.APP_DIR + '/controllers/ConnectionController');

/**
 * @class  Routes
 * @type   {Function}
 * @param  {Express.app} app
 */
module.exports = exports = function(app) {
  app.get('/', PagesController.hello);

  app.get('/api/connect', ConnectionController.connect);
  app.get('/api/collection', ConnectionController.getCollection);

  app.get('/*', PagesController.hello);
};