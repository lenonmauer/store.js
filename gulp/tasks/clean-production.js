const gulp = require('gulp');
const clean = require('gulp-clean');
const util = require('../util');
const paths = require('../paths');

const deps = [];

const task = () => {
  return gulp.src(paths.DEST_PRODUCTION)
            .pipe(clean());
};

module.exports = () => util.exportTask(task, deps);