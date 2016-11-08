(function() {
    angular
        .module('simple-sprite', [])
        .directive('simpleSprite', simpleSprite);

    simpleSprite.$inject = ['$window'];

    function simpleSprite($window) {
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

                // Keeps track of the current x and y positions of the sprite.
                var spritePosition = {
                    'x': 0,
                    'y': 0
                };

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

                /**
                 * Animates the sprite.
                 */
                function animate() {

                    /**
                     * Returns whether the sprite animation has completed or not.
                     */
                    function isAnimationComplete() {
                        var toReturn = false;

                        if (framesPerRow) {
                            var numRows = frames / framesPerRow

                            if (spritePosition.x >= (framesPerRow - 1) * frameWidth &&
                                spritePosition.y >= numRows * frameHeight) {
                                toReturn = true;
                            }

                        } else {
                            if (spritePosition.x >= frameWidth * frames) {
                                toReturn = true;
                            }
                        }

                        return toReturn;
                    }

                    animationInterval = $window.setInterval(function() {
                        // Update the sprite frame
                        element.css("background-position", -spritePosition.x + "px" + " " + spritePosition.y + "px");

                        // Determine if we should loop the animation, or stop, if the animation is complete
                        if (isAnimationComplete()) {
                            if (repeat) {
                                spritePosition.x = 0;
                                spritePosition.y = 0;
                            } else {
                                $window.clearInterval(animationInterval);
                                // $interval.cancel(animationInterval);
                            }
                        } else {
                            // Increment the X position
                            spritePosition.x += frameWidth;

                            // Check if we should move to the next row
                            if (framesPerRow != null && spritePosition.x + frameWidth > frameWidth * framesPerRow) {
                                spritePosition.x = 0;
                                spritePosition.y += frameHeight;
                            }
                        }
                    }, speed);
                }

                $scope.$on("$destroy", function() {
                    $window.clearInterval(animationInterval);
                    // $interval.cancel(animationInterval);
                });

                init();
            }
        };
    }
})(angular);
