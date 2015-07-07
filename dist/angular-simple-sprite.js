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
				axis: "@",
				repeat: "@",
				speed: "@"
			},

			link: function($scope, element, attributes) {

				var src,
					frameWidth,
					frameHeight,
					frames,
					axis = 'x',
					repeat = true,
					speed = 100;

				function init() {
					src = $scope.src;
					frameWidth = parseInt($scope.frameWidth, 10);
					frameHeight = parseInt($scope.frameHeight, 10);
					frames = parseInt($scope.frames, 10);
					axis = $scope.axis;
					repeat = $scope.repeat == 'true';
					speed = $scope.speed;

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
					 	
					 	var currentPos = element.css("background-position").split([" "]),
					 		currentPosX = parseInt(currentPos[0].replace("px", ""), 10),
					 		currentPosY = parseInt(currentPos[1].replace("px", ""), 10);

					 	if (axis == 'x') {
					 		if (currentPosX < frameWidth * frames || repeat) {
					 			element.css("background-position", currentPosX + frameWidth + "px" + " " + currentPosY);
					 		} else {
				 				$interval.cancel(animationInterval);
					 		}
					 	} else if (axis == 'y') {
					 		if (currentPosY < frameHeight * frames || repeat) {
					 			element.css("background-position", currentPosX + " " + currentPosY + frameHeight + "px");
					 		} else {
				 				$interval.cancel(animationInterval);
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