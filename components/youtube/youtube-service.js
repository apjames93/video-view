(function(){
  angular
    .module('video.youtube.youtube-service', [])
    .service('youtubeService', youtubeService);
    youtubeService.$inject = ['$http', '$q', 'loginService', '$state'];
    function youtubeService($http, $q, loginService, $state){
      return {
        getUserName: getUserName,
        getYouTube : getYouTube
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
      function getYouTube(){
        var deferred = $q.defer();
        $http({
            url: 'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true&ACCESS_TOKEN=AIzaSyAlCuRiOYDzcxZrJZ2hufn-UREkhr4W2Qc'
        }).then(function successCallback(response) {
          console.log(response);
          deferred.resolve(response);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }
    }


})();
