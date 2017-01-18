(function() {
    angular
        .module('simple-sprite', [])
        .directive('simpleSprite', simpleSprite)
        .service('simpleSpriteDelegate', simpleSpriteDelegate);

    simpleSprite.$inject = ['$window', 'simpleSpriteDelegate'];

    function simpleSprite($window, simpleSpriteDelegate) {
        return {
            restrict: 'AE',
            replace: false,
            scope: {
                src: "@",
                frameWidth: "@",
                frameHeight: "@",
                frames: "@",
                framesPerRow: "@",
                repeat: "@",
                speed: "@",
                onstep: "&"
            },

            link: function($scope, element, attributes) {
            	var sprite = new Sprite($scope, element);
            	if (attributes.delegateHandle)
            		simpleSpriteDelegate.instance[attributes.delegateHandle] = sprite;
            	sprite.play();
            }
        };
        function Sprite($scope, element) {

            var src,
                frameWidth,
                frameHeight,
                frames,
                framesPerRow = 0,
                repeat = true,
                speed = 100;

            var index = 0;
            // Keeps track of the current x and y positions of the sprite.
            var spritePosition = {
                'x': 0,
                'y': 0
            };

            var scale;

            /**
                * Initializes the sprite with default CSS styles and options passed in by
                * the user. Starts the sprite animation.
                */
            function init() {
                src = $scope.src;
                frameWidth = parseInt($scope.frameWidth, 10);
                frameHeight = parseInt($scope.frameHeight, 10);
                frames = parseInt($scope.frames, 10);
                repeat = $scope.repeat == 'true';
                speed = $scope.speed
                framesPerRow = $scope.framesPerRow;

                var width = element.width();
                scale = width / frameWidth;

                element.css({
                    "display": "block",
                    "background": "url(" + src + ") repeat",
                    "background-size": framesPerRow * 100 + '%',
                    "backgroundPosition": "0px 0px"
                });
            }

            var animationInterval = null;

            /**
                * Animates the sprite.
                */
            function animate() {

                animationInterval = $window.setInterval(function() {
                    // Update the sprite frame
                    element.css("background-position", -spritePosition.x * scale + "px" + " " + -spritePosition.y * scale + "px");

                    $scope.onstep({index:index});

                    // Determine if we should loop the animation, or stop, if the animation is complete
                    index++;
                    // Increment the X position
                    spritePosition.x += frameWidth;

                    // Check if we should move to the next row
                    if (framesPerRow != null && spritePosition.x + frameWidth > frameWidth * framesPerRow) {
                        spritePosition.x = 0;
                        spritePosition.y += frameHeight;
                    }

                    if (index >= frames) {
                        index = 0;
                        if (repeat) {
                            spritePosition.x = 0;
                            spritePosition.y = 0;
                        } else {
                            $window.clearInterval(animationInterval);
                            // $interval.cancel(animationInterval);
                        }
                    }
                }, speed);
            }

            function pause() {
                $window.clearInterval(animationInterval);
            }

            $scope.$on("$destroy", function() {
                $window.clearInterval(animationInterval);
                // $interval.cancel(animationInterval);
            });

            init();

            return {
            	play: animate,
            	pause: pause
            };
        }
    }

    function simpleSpriteDelegate() {
    	return {
    		instance: {}
    	};
    }
})(angular);
