(function(){
  angular
    .module('video.youtube.youtube-service', [])
    .service('youtubeService', youtubeService);
    youtubeService.$inject = ['$http', '$q', 'loginService', '$state'];
    function youtubeService($http, $q, loginService, $state){
      return {
        getYouTube : getYouTube
      };
      function getYouTube(){
        var deferred = $q.defer();
        $http({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=34%2CComedy&key=AIzaSyAlCuRiOYDzcxZrJZ2hufn-UREkhr4W2Qc'
        }).then(function successCallback(response) {
          deferred.resolve(response);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }
    }


})();
