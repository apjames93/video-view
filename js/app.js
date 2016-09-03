(function(){

  angular
    .module('video', [
      'ui.router',
      'video.login',
      'video.signup',
      'video.youtube'
    ])
    .config(function($stateProvider,
      $urlRouterProvider,
      $locationProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home',{
            url: '/',
            templateUrl: '/templates/home.html'
          })
          .state('myPage',{
            url: '/myPage',
            templateUrl: '/templates/myPage.html',
            controller: 'myPageController'

          });


      });

})();
