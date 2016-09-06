(function(){
  angular
    .module('video.signup.signup-service', [])
    .service('signupService', signupService);

    signupService.$inject = ['$http', 'loginService'];

    function signupService($http, loginService){
      return {
        createUser: createUser
      };

    function createUser(userName, password) {
      $http({
        method: 'post',
        params: {
          userName: userName,
          password: password
        },
        // url: 'http://localhost:3000/auth/signup'
        url: 'https://bomb-video-server.herokuapp.com/auth/signup'
      }).then(function successCallback(response) {
          loginService.loginUser(userName, password);
        }, function errorCallback(err) {
          console.log('createUser err', err);
        });
      }
    }

})();
