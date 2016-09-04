(function(){
  angular
    .module('video')
    .controller('myPageController', myPageController);
  myPageController.$inject = ['$scope', 'loginService'];
    function myPageController($scope, loginService) {
      _init = function() {
        _getUserName();
      };

      _getUserName = function(){
        $scope.userName = loginService.getUserName();
        return $scope.userName;
      };

      _init();
    }

})();
