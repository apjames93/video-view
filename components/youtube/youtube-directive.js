(function(){
  angular
    .module('video.youtube.youtube-directive', [])
    .directive('youtube', youtube);

    function youtube(){
        var directive = {
          restrict: 'E',
          templateUrl: '/templates/youtube.html',
          scope: {
            youtube: '='
          },
          controller: youtubeController,
          controllerAs: 'youtubeController'
        };

        return directive;
    }

    youtubeController.$inject = ['$scope', 'youtubeService', 'loginService'];
    function youtubeController($scope, youtubeService, loginService) {



      _init = function() {
        _getyouTubeVideo();
        _getUserId();
      };

      _getUserId = function(){
        $scope.userid= loginService.getUserId();
      };

      var randomId;
      _getRandomvideo= function(min, max) {
        randomId = (Math.floor(Math.random() * (max - min + 1)) + min);
        return randomId;
    };

      _getyouTubeVideo = function(){
        youtubeService.getYouTube().then(function(response){
        _getRandomvideo(0, response.data.items.length);
          $scope.youtubeVideo = "https://www.youtube.com/embed/"+ response.data.items[randomId].id.videoId;
          return $scope.youtubeVideo;
        });
      };

      $scope.newVideo = function(){
        youtubeService.dontLikeThat();
      };

      $scope.addVideo = function(youtube){
        // console.log(youtube);
        youtubeService.addVideo(youtube);
      };


      _init();
    }

})();
