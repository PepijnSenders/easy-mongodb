app.factory('Connection', function($http) {

  return {
    connect: connect
  };

  function connect(data) {
    return $http({
      method: 'POST',
      url: 'api/connect',
      data: data
    }).then(function(response) {
      return response.data.connection;
    });
  };

});