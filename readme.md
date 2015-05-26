# gulp-simple-preprocess [![Build Status](https://travis-ci.org/stevemao/gulp-simple-preprocess.svg?branch=master)](https://travis-ci.org/stevemao/gulp-simple-preprocess)

> Preprocess html, js and css based off environment configuration with [simple-preprocess](https://github.com/stevemao/simple-preprocess)

*Issues with the output should be reported on the simple-preprocess [issue tracker](https://github.com/stevemao/simple-preprocess/issues).*


## Install

```
$ npm install --save-dev gulp-simple-preprocess
```


## Usage

```js
var gulp = require('gulp');
var simplePreprocess = require('gulp-simple-preprocess');

gulp.task('default', function () {
  return gulp.src('src/*.html')
    .pipe(simplePreprocess({
			env: 'prod'
		}))
    .pipe(gulp.dest('dist'));
});
```


## License

MIT © [Steve Mao](https://github.com/stevemao)
