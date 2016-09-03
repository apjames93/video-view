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
    }

})();
