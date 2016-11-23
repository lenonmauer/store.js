const gulp = require('gulp');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const util = require('../util');
const paths = require('../paths');

const deps = ['jshint'];

const task = () => {
  browserSync.init({
    server: paths.DEST_EXAMPLES,
  });

  gulp.watch(paths.SRC_DEVELOPMENT, ['build-dev']);
  gulp.watch(paths.SRC_EXAMPLES).on('change', browserSync.reload);
};

module.exports = () => util.exportTask(task, deps);