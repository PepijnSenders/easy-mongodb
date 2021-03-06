app.controller('CollectionCtrl', function($scope, ngTableParams, Connection, $stateParams, $location) {

  Connection.setCurrentCollection($stateParams.collectionName);

  $scope.tableParams = new ngTableParams({
    page: 1,
    count: 10
  }, {
    total: 0,
    getData: function($defer, params) {
      $location.search(params.url());
      Connection.getCollection({
        page: params.page(),
        count: params.count(),
        fields: $scope.collection ? $scope.collection.fields.join('|') : null,
        collectionName: Connection.getCurrentCollection(),
        uri: Connection.getConnection().uri,
        sorting: params.sorting()
      }).then(function(collection) {
        $scope.collection = collection;
        $scope.fields = collection.fields.map(function(field) {
          return {
            name: field,
            visible: true
          };
        });
        params.total(collection.total);
        $defer.resolve(collection.documents);
      });
    }
  });

});