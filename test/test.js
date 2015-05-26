'use strict';
var assert = require('assert');
var fs = require('fs');
var gutil = require('gulp-util');
var join = require('path').join;
var simplePreprocess = require('../');

it('should Preprocess html, js and css based off environment configuration', function(cb) {
  var fixtureHtml = fs.readFileSync(join(__dirname, 'fixtures/env.html'));
  var expectedHtml = fs.readFileSync(join(__dirname, 'expected/env.html'), 'utf8');
  var fixtureJs = fs.readFileSync(join(__dirname, 'fixtures/env.js'));
  var expectedJs = fs.readFileSync(join(__dirname, 'expected/env.js'), 'utf8');
  var fixtureCss = fs.readFileSync(join(__dirname, 'fixtures/env.css'));
  var expectedCss = fs.readFileSync(join(__dirname, 'expected/env.css'), 'utf8');

  var stream = simplePreprocess({
    env: 'test'
  });

  stream.on('data', function(file) {
    if (file.path === join(__dirname, 'fixtures/env.html')) {
      assert.equal(file.contents.toString(), expectedHtml);
    } else if (file.path === join(__dirname, 'fixtures/env.js')) {
      assert.equal(file.contents.toString(), expectedJs);
    } else if (file.path === join(__dirname, 'fixtures/env.css')) {
      assert.equal(file.contents.toString(), expectedCss);
    } else {
      assert.ifError(true);
    }
  });

  stream.on('end', cb);

  stream.write(new gutil.File({
    cwd: __dirname,
    base: join(__dirname, 'fixtures'),
    path: join(__dirname, 'fixtures/env.html'),
    contents: fixtureHtml
  }));

  stream.write(new gutil.File({
    cwd: __dirname,
    base: join(__dirname, 'fixtures'),
    path: join(__dirname, 'fixtures/env.js'),
    contents: fixtureJs
  }));

  stream.write(new gutil.File({
    cwd: __dirname,
    base: join(__dirname, 'fixtures'),
    path: join(__dirname, 'fixtures/env.css'),
    contents: fixtureCss
  }));

  stream.end();
});
