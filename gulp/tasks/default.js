const gulp = require('gulp');
const util = require('../util');

const deps = [];

const task = () => {
  gulp.start('build-production');
};

module.exports = () => util.exportTask(task, deps);