const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const util = require('../util');
const paths = require('../paths');

const deps = ['jshint'];

const task = () => {
  return  gulp.src(paths.SRC_DEVELOPMENT)
              .pipe(babel())
              .on('error', function(err) { this.emit('end'); })
              .pipe(gulp.dest(paths.DEST_DEVELOPMENT))
              .pipe(browserSync.stream());
};

module.exports = () => util.exportTask(task, deps);