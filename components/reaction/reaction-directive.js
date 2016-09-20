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

           var vid = document.getElementById('videoel');
           var overlay = document.getElementById('overlay');
           var overlayCC = overlay.getContext('2d');

           /********** check and set up video/webcam **********/

           function enablestart() {
             var startbutton = document.getElementById('startbutton');
             startbutton.value = "start";
             startbutton.disabled = null;
           }


           navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
           window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

           // check for camerasupport
           if (navigator.getUserMedia) {
             // set up stream

             var videoSelector = {video : true};
             if (window.navigator.appVersion.match(/Chrome\/(.*?) /)) {
               var chromeVersion = parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10);
               if (chromeVersion < 20) {
                 videoSelector = "video";
               }
             };

             navigator.getUserMedia(videoSelector, function( stream ) {
               if (vid.mozCaptureStream) {
                 vid.mozSrcObject = stream;
               } else {
                 vid.src = (window.URL && window.URL.createObjectURL(stream)) || stream;
               }
               vid.play();
             }, function() {
               //insertAltVideo(vid);
               alert("There was some problem trying to fetch video from your webcam. If you have a webcam, please make sure to accept when the browser asks for access to your webcam.");
             });
           } else {
             //insertAltVideo(vid);
             alert("This demo depends on getUserMedia, which your browser does not seem to support. :(");
           }

           vid.addEventListener('canplay', enablestart, false);

           /*********** setup of emotion detection *************/

           var ctrack = new clm.tracker({useWebGL : true});
           ctrack.init(pModel);

           $scope.startVideo = function() {
             // start video
             vid.play();
             // start tracking
             ctrack.start(vid);
             // start loop to draw face
             drawLoop();
           };

           function drawLoop() {
             requestAnimFrame(drawLoop);
             overlayCC.clearRect(0, 0, 400, 300);
             //psrElement.innerHTML = "score :" + ctrack.getScore().toFixed(4);
             if (ctrack.getCurrentPosition()) {
               ctrack.draw(overlay);
             }
             var cp = ctrack.getCurrentParameters();

             var er = ec.meanPredict(cp);
             if (er) {
               updateData(er);
               for (var i = 0;i < er.length;i++) {
                 if (er[i].value > 0.4) {
                   document.getElementById('icon'+(i+1)).style.visibility = 'visible';
                 }
                 if (er[i].value > 0.8) {
                   console.log('over 8 ');
                   document.getElementById('icon'+(i+1)).style.visibility = 'visible';
                 }
                  else {
                   document.getElementById('icon'+(i+1)).style.visibility = 'hidden';
                 }
               }
             }
           }

           var ec = new emotionClassifier();
           ec.init(emotionModel);
           var emotionData = ec.getBlank();

           /************ d3 code for barchart *****************/

           var margin = {top : 20, right : 20, bottom : 10, left : 40},
             width = 400 - margin.left - margin.right,
             height = 100 - margin.top - margin.bottom;

           var barWidth = 30;

           var formatPercent = d3.format(".0%");

           var x = d3.scale.linear()
             .domain([0, ec.getEmotions().length]).range([margin.left, width+margin.left]);

           var y = d3.scale.linear()
             .domain([0,1]).range([0, height]);

           var svg = d3.select("#emotion_chart").append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom)

           svg.selectAll("rect").
             data(emotionData).
             enter().
             append("svg:rect").
             attr("x", function(datum, index) {
               return x(index);
             }).
             attr("y", function(datum) {
               return height - y(datum.value);
              }).
             attr("height", function(datum) { return y(datum.value); }).
             attr("width", barWidth).
             attr("fill", "#2d578b");

           svg.selectAll("text.labels").
             data(emotionData).
             enter().
             append("svg:text").
             attr("x", function(datum, index) { return x(index) + barWidth; }).
             attr("y", function(datum) { return height - y(datum.value); }).
             attr("dx", -barWidth/2).
             attr("dy", "1.2em").
             attr("text-anchor", "middle").
             text(function(datum) { return datum.value;}).
             attr("fill", "white").
             attr("class", "labels");

           svg.selectAll("text.yAxis").
             data(emotionData).
             enter().append("svg:text").
             attr("x", function(datum, index) { return x(index) + barWidth; }).
             attr("y", height).
             attr("dx", -barWidth/2).
             attr("text-anchor", "middle").
             attr("style", "font-size: 12").
             text(function(datum) { return datum.emotion;}).
             attr("transform", "translate(0, 18)").
             attr("class", "yAxis");

           function updateData(data) {
             // update
             var rects = svg.selectAll("rect")
               .data(data)
               .attr("y", function(datum) { return height - y(datum.value); })
               .attr("height", function(datum) { return y(datum.value); });
             var texts = svg.selectAll("text.labels")
               .data(data)
               .attr("y", function(datum) { return height - y(datum.value); })
               .text(function(datum) { return datum.value.toFixed(1);});

             // enter
             rects.enter().append("svg:rect");
             texts.enter().append("svg:text");

             // exit
             rects.exit().remove();
             texts.exit().remove();
           }

           /******** stats ********/

           stats = new Stats();
           stats.domElement.style.position = 'absolute';
           stats.domElement.style.top = '0px';
           document.getElementById('container').appendChild( stats.domElement );

           // update stats on every iteration
           document.addEventListener('clmtrackrIteration', function(event) {

             stats.update();
           }, false);

           //#####################################################
           // screenshot
          function userMedia(){
            return navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia || null;

          }

    // Now we can use it
          if( userMedia() ){
            var videoPlaying = false;
            var constraints = {
                video: true,
                audio:false
          };
          var video = document.getElementById('v');

          var media = navigator.getUserMedia(constraints, function(stream){

          // URL Object is different in WebKit
          var url = window.URL || window.webkitURL;

        // create the url and set the source of the video element
        video.src = url ? url.createObjectURL(stream) : stream;

          // Start the video
          video.play();

          videoPlaying  = true;

          }, function(error){

          console.log("ERROR");
          console.log(error);

          });

          // Listen for user click on the "take a photo" button

          document.getElementById('take').addEventListener('click', function(){
          if (videoPlaying){

            var canvas = document.getElementById('canvas');
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0);
            var data = canvas.toDataURL('image/webp');
            document.getElementById('photo').setAttribute('src', data);
          }
          }, false);

          } else {
            console.log("KO");
          }
  };


_init();
}

})();
