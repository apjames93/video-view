(function(){
  angular
    .module('video')
    .controller('myPageController', myPageController);
  myPageController.$inject = ['$scope', 'youtubeService'];
    function myPageController($scope, youtubeService) {
      _init = function() {
        _getyouTubeVideo();
      };
      _getyouTubeVideo = function(){
        youtubeService.getYouTube().then(function(response){
          console.log(response);
        });
      };

      _init();
    }

})();
