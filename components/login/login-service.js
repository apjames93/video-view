(function(){
  angular
    .module('video.login.login-service', [])
    .service('loginService', loginService);
    loginService.$inject = ['$http', '$location'];

    function loginService($http, $location){
      var user = {};
      return {
        getToken: getToken,
        getUserId : getUserId,
        loginUser: loginUser,
        getUserName : getUserName
      };
      function _setUserData(data) {
        user = data;
      }
      function getToken() {
          return user.token;
      }
      function getUserId(){
        return user.userId;
      }
      function getUserName(){
        return user.userName;
      }
      function loginUser(userName, password) {
        $http({
          method: 'post',
          params: {
            userName: userName,
            password: password
          },
          url: 'http://localhost:3000/auth/login'
          // url: 'https://bomb-video-server.herokuapp.com/auth/login'
        }).then(function successCallback(response) {
            _setUserData(response.data);
            $location.path('/myPage');
          }, function errorCallback(err) {
            console.log('login err', err);
          });
      }

    }


})();
