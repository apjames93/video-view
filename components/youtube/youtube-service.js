(function(){
  angular
    .module('video.youtube.youtube-service', [])
    .service('youtubeService', youtubeService);

    youtubeService.$inject = ['$http', '$q', 'loginService', '$location', '$state'];

    function youtubeService($http, $q, loginService, $location, $state){
      return {
        getYouTube: getYouTube,
        addVideo: addVideo,
        dontLikeThat: dontLikeThat
      };

      function dontLikeThat(){
        $state.go($state.$current, null, { reload: true });
      }

      function getYouTube(){
        var deferred = $q.defer();
        $http({
          url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=34%2CComedy&key=AIzaSyAlCuRiOYDzcxZrJZ2hufn-UREkhr4W2Qc'
        })
        .then(function successCallback(response) {
          deferred.resolve(response);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }

      function addVideo(youtube){
        var deferred = $q.defer();
        $http({
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          params: {
            users_id: loginService.getUserId(),
            youtube: youtube
          },
          // url: 'https://bomb-video-server.herokuapp.com/api/video/'
          url: 'http://localhost:3000/api/video/'
        }).then(function successCallback(response) {
          $location.path('/myVideos');
          deferred.resolve(response);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }
    }

})();
