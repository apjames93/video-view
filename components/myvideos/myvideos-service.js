(function(){
  angular
    .module('video.myvideos.myvideos-service', [])
    .service('myvideosService', myvideosService);
    myvideosService.$inject = ['$http', '$q', 'loginService', '$state'];
    function myvideosService($http, $q, loginService, $state){

      return {
        getVideo: getVideo
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
          // url: 'https://bomb-video-server.herokuapp.com/api/video/' + loginService.getUserId()
          url: 'http://localhost:3000/api/video/' + loginService.getUserId()
        }).then(function successCallback(response) {
          // console.log(loginService.getUserId());
          console.log(response.data.user);
          deferred.resolve(response.data.user);
        }, function errorCallback(err) {
          deferred.reject(err);
        });
          return deferred.promise;
      }
    }


})();
