app.config(function($stateProvider, $urlRouterProvider, $locationProvider, localStorageServiceProvider) {

  localStorageServiceProvider.setPrefix('easy-mongo');

  $locationProvider.html5Mode(true);

  $stateProvider
    .state('connect', {
      url: '/',
      controller: 'ConnectCtrl',
      templateUrl: 'views/connect.html'
    })
    .state('collections', {
      url: '/collections',
      resolve: {
        collectionNames: function(Connection, $q) {
          var defer = $q.defer();

          var collectionNames = Connection.getCollectionNames();
          if (collectionNames) {
            defer.resolve(collectionNames);
          } else {
            defer.reject();
          }

          return defer.promise;
        }
      },
      controller: 'CollectionsCtrl',
      templateUrl: 'views/collections.html'
    })
    .state('collections.collection', {
      url: '/:collectionName',
      views: {
        'collection': {
          controller: 'CollectionCtrl',
          templateUrl: 'views/collection.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');

});