app.factory('Connection', function($http, localStorageService) {

  var Connection = {
    getCollectionNames: getCollectionNames,
    setCollectionNames: setCollectionNames,

    getCurrentCollection: getCurrentCollection,
    setCurrentCollection: setCurrentCollection,

    getConnection: getConnection,
    setConnection: setConnection,

    getCollection: getCollection,

    connect: connect
  };

  return Connection;

  function getCollectionNames() {
    return Connection.collectionNames || localStorageService.get('collectionNames');
  };

  function setCollectionNames(collectionNames) {
    Connection.collectionNames = collectionNames;
    localStorageService.set('collectionNames', collectionNames);
    return Connection;
  };

  function getCurrentCollection() {
    return Connection.currentCollection || localStorageService.get('currentCollection');
  };

  function setCurrentCollection(currentCollection) {
    Connection.currentCollection = currentCollection;
    localStorageService.set('currentCollection', currentCollection);
    return Connection;
  };

  function getConnection() {
    return Connection.connection || localStorageService.get('connection');
  };

  function setConnection(connection) {
    Connection.connection = connection;
    localStorageService.set('connection', connection);
    return Connection;
  };

  function getCollection(params) {
    return $http({
      method: 'GET',
      url: 'api/collection',
      params: params
    }).then(function(response) {
      return response.data;
    });
  };

  function connect(params) {
    Connection.setConnection(params);
    return $http({
      method: 'GET',
      url: 'api/connect',
      params: params
    }).then(function(response) {
      Connection.setCollectionNames(response.data.collectionNames)
      return Connection.getCollectionNames();
    });
  };

});