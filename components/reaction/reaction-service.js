// service that will be used to send videos to AWS
(function(){
  angular
    .module('video.reaction.reaction-service', [])
    .service('reactionService', reactionService);
    reactionService.$inject = ['$http', '$q', 'loginService', '$state'];
      function reactionService($http, $q, loginService, $state){
      return {
      };
    }

})();
