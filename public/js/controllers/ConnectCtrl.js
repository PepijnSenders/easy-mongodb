app.controller('ConnectCtrl', function($scope, Connection) {

  $scope.connectionType = 'external';
  $scope.connect = function(connection) {
    Connection.connect(connection)
      .then(function(connection) {

      })
      .catch(function(response) {
        $scope.errors = response.data.message;
      });
  };

  $scope.checkError = function(key) {
    return $scope.errors && key in $scope.errors;
  };

});