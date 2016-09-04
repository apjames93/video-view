(function(){
  angular
    .module('video.myvideos.myvideos-directive', [])
    .directive('myvideos', myvideos);

    function myvideos(){
        var directive = {
          restrict: 'E',
          templateUrl: '/templates/myvideos.html',
          scope: {
            video: '='
          },
          controller: myvideosController,
          controllerAs: 'myvideosController'
        };

        return directive;
    }

    myvideosController.$inject = ['$scope', 'myvideosService', 'loginService'];
    function myvideosController($scope, myvideosService, loginService) {



      _init = function() {
        _getUserId();
        _getMyVideos();
      };

      _getUserId = function(){
        $scope.userid= loginService.getUserId();
      };

      _getMyVideos = function(){
        myvideosService.getVideo().then(function(data){
          console.log('controller data @@##@@#@',data);
          $scope.myvideo= data;
        });
      };




      _init();
    }

})();
