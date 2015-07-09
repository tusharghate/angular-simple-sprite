(function() {
	angular
		.module('simple-sprite', [])
		.directive('simpleSprite', simpleSprite);

	simpleSprite.$inject = ['$interval'];

  	function simpleSprite($interval) {
		return {
			restrict: 'AE',
			replace: false,
			scope: {
				src: "@",
				frameWidth: "=",
				frameHeight: "=",
				frames: "=",
                framesPerRow: "@",
				repeat: "@",
				speed: "@"
			},

			link: function($scope, element, attributes) {

				var src,
					frameWidth,
					frameHeight,
					frames,
                    framesPerRow = 0,
					repeat = true,
					speed = 100;
                
                var currentPosX = 0,
                    currentPosY = 0;

				function init() {
					src = $scope.src;
					frameWidth = parseInt($scope.frameWidth, 10);
					frameHeight = parseInt($scope.frameHeight, 10);
					frames = parseInt($scope.frames, 10);
					repeat = $scope.repeat == 'true';
					speed = $scope.speed
                    framesPerRow = $scope.framesPerRow;

					element.css({
						"display": "block",
						"width": frameWidth + "px",
						"height": frameHeight + "px",
						"background": "url(" + src + ") repeat",
						"backgroundPosition": "0px 0px"
					});

					animate();
				}

				var animationInterval = null;
				function animate() {
					 animationInterval = $interval(function() {
                         // Check if the animation has completed
                         var animationComplete = false;
                         if (framesPerRow) {
                             if ((currentPosY / frameHeight * framesPerRow) + (currentPosX / frameWidth) >= frames) {
                                animationComplete = true;
                             }
                         } else {
                             if (currentPosX / frameWidth >= frames) {
                                animationComplete = true;   
                             }
                         }
                         
                        // Update the sprite frame
                        element.css("background-position", currentPosX  + "px" + " " + currentPosY + "px");
					 
                        // Determine if we should loop the animation, or stop, if the animation is complete
                        if (animationComplete) {
                            if (repeat) {
                                currentPosX = 0;
                                currentPosY = 0;
                            } else {
                                $interval.cancel(animationInterval);
                            }
                         } else {
                            // Increment the X position
                            currentPosX += frameWidth;

                            // Check if we should move to the next row
                            if (framesPerRow != null && currentPosX + frameWidth > frameWidth * framesPerRow) {
                                currentPosX = 0;
                                currentPosY += frameHeight;
                            }
                         }
                     }, speed);
				}

				$scope.$on("$destroy", function() {
					$interval.cancel(animationInterval);
				});

				init();
			}
		};
	}
})(angular);