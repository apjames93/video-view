(function(){

  angular
    .module('video', [
      'ui.router',
      'video.login',
      'video.signup'
    ])
    .config(function($stateProvider,
      $urlRouterProvider,
      $locationProvider){

        $urlRouterProvider.otherwise('/');

        $stateProvider
          .state('home',{
            url: '/',
            templateUrl: '/templates/home.html'
          });

      });

})();
