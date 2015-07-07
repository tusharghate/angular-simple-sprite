# angular-simple-sprite
An easy-to-use AngularJS directive for creating simple sprite animations. 

## Useage

+ Install angular-simple-sprite with [Bower](http://www.bower.io)

```
$ bower install angular-simple-sprite --save
```

+ Include the required libraries in your `index.html`: 

```html
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-simple-sprite/angular-simple-sprite.min.js"></script>
```

+ Inject the `simple-sprite` module into your app:

```javascript
angular.module('myApp', ['simple-sprite']);
```

+ Implement the `simple-sprite` directive in your HTML:

```html
 <simple-sprite 
    src="path/to/your/image.png" 
    frame-width="100" 
    frame-height="100" 
    frames="10" 
    axis="x" 
    repeat="true" 
    speed="50">
</simple-sprite>
```

Be sure to check the example folder if you'd like to see `simple-sprite` in action.

## Options

+ `src` - The path to your sprite image.
+ `frame-width` - The width of a single frame in your sprite.
+ `frame-height` - The height of a single frame in your sprite.
+ `frames` - The total number of frames in your sprite.
+ `axis` - The axis on which to animate (accepts either `x` or `y`).
+ `repeat` - _Optional_ Determines whether or not the sprite animation should repeat. Defaults to `true`.
+ `speed` - _Optional_ The speed between each frame in milliseconds. Defaults to `100ms`.


## Author

### Tushar Ghate

+ [http://www.tusharghate.com](http://www.tusharghate.com)
+ [http://github.com/tusharghate](http://github.com/tusharghate)

## License

```
The MIT License (MIT)

Copyright (c) <2015> <Tushar Ghate>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```


