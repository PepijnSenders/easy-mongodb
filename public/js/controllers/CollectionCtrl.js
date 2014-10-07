app.controller('CollectionCtrl', function($scope, ngTableParams, Connection, $stateParams, $location) {

  Connection.setCurrentCollection($stateParams.collectionName);

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: 5
  }, {
    total: 0,
    getData: function($defer, params) {
      $location.search(params.url());
      Connection.getCollection({
        page: params.page(),
        count: params.count(),
        fields: $scope.collection ? $scope.collection.fields : [],
        collectionName: Connection.getCurrentCollection(),
        uri: Connection.getConnection().uri
      }).then(function(collection) {
        $scope.collection = collection;
        params.total(collection.total);
        $defer.resolve(collection.documents);
      });
    }
  });

});