app.controller('ConnectCtrl', function($scope, Connection, $interpolate, $state) {

  $scope.connect = function(connection) {
    Connection.connect(connection)
      .then(function(collectionNames) {
        $state.go('collections');
      })
      .catch(function(response) {
        $scope.errors = response.data.message;
      });
  };

  $scope.$watchCollection('[connection.user, connection.password, connection.url, connection.app]', function(newValues, oldValues) {
    $scope.connection.uri = $interpolate('mongodb://{{connection.user}}:{{connection.password}}@{{connection.url}}/{{connection.app}}')($scope);
  });

  $scope.checkError = function(key) {
    return $scope.errors && key in $scope.errors;
  };

});