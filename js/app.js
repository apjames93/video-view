(function(){ 

  angular
    .module('video', [
      'ui.router',
      'video.login',
      'video.signup',
      'video.youtube',
      'video.reaction',
      'video.myvideos',
      'video.pagenav'
    ])
    .config(function($stateProvider,
      $urlRouterProvider,
      $locationProvider,
      $sceProvider
    ){
    $sceProvider.enabled(false);
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
      })
      .state('myVideo',{
        url: '/myVideos',
        templateUrl: '/templates/myVideo.html',
        controller: 'myPageController'

      });
    });

})();
