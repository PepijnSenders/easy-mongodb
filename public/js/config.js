easyMongoApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('connect', {
      url: '/',
      controller: 'ConnectCtrl',
      templateUrl: 'views/connect.html'
    });

  $urlRouterProvider.otherwise('/');

});