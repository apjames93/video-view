(function(){
  angular
    .module('video.youtube.youtube-service', [])
    .service('youtubeService', youtubeService);
    youtubeService.$inject = ['$http', '$q', 'loginService', '$state'];
    function youtubeService($http, $q, loginService, $state){

      return {
        getYouTube : getYouTube,
        addVideo: addVideo
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

      function addVideo(youtube){
        console.log('service', youtube);
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
          console.log(loginService.getUserId());
          console.log(response);
          deferred.resolve(response);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }
    }


})();
