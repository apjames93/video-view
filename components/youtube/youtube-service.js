(function(){
  angular
    .module('video.youtube.youtube-service', [])
    .service('youtubeService', youtubeService);
    youtubeService.$inject = ['$http', '$q', 'loginService', '$state'];
    function youtubeService($http, $q, loginService, $state){
      return {
      };
      function getUserName(){
        var deferred = $q.defer();

        $http({
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
            url: 'http://localhost:3000/api/video/' + loginService.getUserId()
        }).then(function successCallback(response) {
          console.log(response.data.userName);
          deferred.resolve(response.data.userName);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }
    }


})();
