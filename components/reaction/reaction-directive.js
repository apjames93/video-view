(function(){
  angular
    .module('video.reaction.reaction-directive', [])
    .directive('reaction', reaction);

    function reaction(){
        var directive = {
          restrict: 'E',
          templateUrl: '/templates/reaction.html',
          scope: {
            reactionItem: '='
          },
          controller: reactionController,
          controllerAs: 'reactionController'
        };

        return directive;
    }
    reactionController.$inject = ['$scope',  'reactionService'];
    function reactionController($scope,reactionService) {
      _init = function() {
        window.onload();
      };
        window.onload = function() {
          navigator.getUserMedia = navigator.getUserMedia ||
              navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

          var constraints = {
            audio: false,
            video: true
          };
          var video = document.querySelector('video');

          function successCallback(stream) {
            window.stream = stream; // stream available to console
            if (window.URL) {
              video.src = window.URL.createObjectURL(stream);
            } else {
              video.src = stream;
            }
          }

          function errorCallback(error) {
            console.log('navigator.getUserMedia error: ', error);
          }

          navigator.getUserMedia(constraints, successCallback, errorCallback);
        };

      _init();

    }

})();
