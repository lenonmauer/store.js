const gulp = require('gulp');
const jshint = require('gulp-jshint');
const util = require('../util');
const paths = require('../paths');

const deps = [];

const task = () => {
  return gulp.src(paths.SRC_DEVELOPMENT)
              .pipe(jshint())
              .pipe(jshint.reporter('default'));
};

module.exports = () => util.exportTask(task, deps);