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
        $scope.hideForm = true;
        _getUserId();
        _getMyVideos();
      };

        $scope.hideForm = true;

      _getUserId = function(){
        $scope.userid= loginService.getUserId();
      };

      _getMyVideos = function(){
        myvideosService.getVideo().then(function(data){
          $scope.myvideo= data;
        });
      };

      $scope.delVideo = function(videoid){
        myvideosService.getOutOfHere(videoid);
      };

      $scope.sendEmail = function(to, subject, text){
        myvideosService.sendEmail(to, subject, text);
        $scope.hideForm = true;
        $scope.to ='';
        $scope.subject ='';
      }

      $scope.showForm = function() {
        $scope.hideForm = false;
      };



      _init();
    }

})();
