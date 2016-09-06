(function(){
  angular
    .module('video.signup.signup-directive', [])
    .directive('signup', signup);

    function signup(){
      var directive = {
        restrict: 'E',
        templateUrl: 'templates/signup.html',
        scope: {},
        controller: signupController,
        controllerAs: 'signupController'
      };
      return directive;
    }

    signupController.$inject = ['signupService'];

    function signupController(signupService) {
      this.submit = function(userName, password) {
        signupService.createUser(userName, password);
      };
    }

})();
