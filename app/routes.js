var PagesController = require(global.APP_DIR + '/controllers/PagesController'),
    ConnectionController = require(global.APP_DIR + '/controllers/ConnectionController');

/**
 * @class  Routes
 * @type   {Function}
 * @param  {Express.app} app
 */
module.exports = exports = function(app) {
  app.get('/', PagesController.hello);

  app.post('/api/connect', ConnectionController.connect);
};