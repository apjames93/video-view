(function(){
  angular
    .module('video')
    .controller('myPageController', myPageController);

    myPageController.$inject = ['$scope', 'loginService', 'myvideosService'];
  
    function myPageController($scope, loginService, myvideosService) {
      _init = function() {
        _getUserName();
        _getMyVideos();
      };

      _getUserName = function(){
        $scope.userName = loginService.getUserName();
        return $scope.userName;
      };
      _getMyVideos = function(){
        myvideosService.getVideo().then(function(data){
          $scope.myvideo= data;
        });
      };

      _init();
    }

})();
