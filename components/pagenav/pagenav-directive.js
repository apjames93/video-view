(function(){
  angular
    .module('video.pagenav.pagenav-directive', [])
    .directive('pagenav', pagenav);

    function pagenav(){
        var directive = {
          restrict: 'E',
          templateUrl: '/templates/pagenav.html',
          scope: {
            pagenavItem: '='
          }
          // controller: myPageController,
          // controllerAs: 'myPageController'
        };
        return directive;
    }
})();
