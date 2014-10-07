app.controller('CollectionsCtrl', function($scope, collectionNames) {

  $scope.collectionNames = collectionNames;
  $scope.activeCollectionName = $scope.collectionNames[0];

  $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
    $scope.activeCollectionName = toParams.collectionName;
  });

});