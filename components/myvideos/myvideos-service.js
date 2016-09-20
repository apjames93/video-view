(function(){
  angular 
    .module('video.myvideos.myvideos-service', [])
    .service('myvideosService', myvideosService);
    myvideosService.$inject = ['$http', '$q', 'loginService', '$state'];
    function myvideosService($http, $q, loginService, $state){

      return {
        getVideo: getVideo,
        getOutOfHere:getOutOfHere,
        sendEmail: sendEmail
      };

      function getVideo(myvideos){
        var deferred = $q.defer();
        $http({
          method: 'get',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          params: {
            users_id: loginService.getUserId(),
          },
          url: 'https://bomb-video-server.herokuapp.com/api/video/' + loginService.getUserId()
          // url: 'http://localhost:3000/api/video/' + loginService.getUserId()
        }).then(function successCallback(response) {
          deferred.resolve(response.data.user);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }

      function getOutOfHere(videoid){
        var videoId = videoid;
        var deferred = $q.defer();
        $http({
          method: 'delete',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          params: {
            users_id: loginService.getUserId(),
            video_id: videoId

          },
          url: 'https://bomb-video-server.herokuapp.com/api/video/' + loginService.getUserId()
          // url: 'http://localhost:3000/api/video/' + loginService.getUserId()
        }).then(function successCallback(response) {

          deferred.resolve(response);
          $state.go($state.$current, null, { reload: true });
        }, function errorCallback(err) {

          deferred.reject(err);
        });
          return deferred.promise;
      }


      function sendEmail(to, subject, text){
        var deferred = $q.defer();
        $http({
          method: 'post',
          headers: {
            Authorization: 'Bearer ' + loginService.getToken()
          },
          params: {
            to: to,
            subject: subject,
            text: text

          },
          url: 'https://bomb-video-server.herokuapp.com/api/video/email'
          // url: 'http://localhost:3000/api/video/email'
        }).then(function successCallback(response) {
          deferred.resolve(response);
        }, function errorCallback(err) {

          deferred.reject(err);
        });
          return deferred.promise;
      }
    }
})();
