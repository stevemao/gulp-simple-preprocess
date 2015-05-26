'use strict';
var assign = require('object-assign');
var chalk = require('chalk');
var extname = require('path').extname;
var gutil = require('gulp-util');
var through = require('through2');
var simplePreprocess = require('simple-preprocess');

module.exports = function(opts) {
  opts = assign({
    // TODO: remove this when gulp get's a real logger with levels
    verbose: process.argv.indexOf('--verbose') !== -1
  }, opts);

  return through.obj(function(file, enc, cb) {
    if (file.isNull()) {
      cb(null, file);
      return;
    }

    if (file.isStream()) {
      cb(new gutil.PluginError('gulp-simple-preprocess', 'Streaming not supported'));
      return;
    }

    var path = file.path;
    var type = opts.type || extname(path).replace('.', '');
    var env = opts.env;

    var result = simplePreprocess(file.contents.toString(), type, env);
    file.contents = new Buffer(result.data);

    var retained = result.retained;
    var stripped = result.stripped;
    var retainedCount = retained.length;
    var strippedCount = stripped.length;

    if (opts.verbose && (retainedCount > 0 || strippedCount > 0)) {
      retained.forEach(function(comment) {
        gutil.log(chalk.green(comment) + chalk.cyan('retained'));
      });

      stripped.forEach(function(code) {
        gutil.log(chalk.red(code) + chalk.magenta('stripped'));
      });

      gutil.log(path + ': ' + chalk.green('✔ ') + retainedCount + ' blocks retained.');
      gutil.log(chalk.red('✖ ') + strippedCount + ' blocks stripped.');
    }

    cb(null, file);
  });
};
