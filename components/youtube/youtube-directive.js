(function(){
  angular
    .module('video.youtube.youtube-directive', [])
    .directive('youtube', youtube);

    function youtube(){
        var directive = {
          restrict: 'E',
          templateUrl: '/templates/youtube.html',
          scope: {
            youtubeItem: '='
          },
          controller: youtubeController,
          controllerAs: 'youtubeController'
        };

        return directive;
    }

    youtubeController.$inject = ['$scope',  'youtubeService'];
    function youtubeController($scope,youtubeService) {

      _init = function() {
        _getyouTubeVideo();
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
      _init();
    }

})();
