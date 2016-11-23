const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const strip = require('gulp-strip-comments');
const sourcemaps = require('gulp-sourcemaps');
const util = require('../util');
const paths = require('../paths');

const deps = ['clean-production'];

const task = () => {
  return gulp.src(paths.SRC_DEVELOPMENT)
            .pipe(sourcemaps.init())
            .pipe(babel())
            .pipe(strip())
            .pipe(gulp.dest(paths.DEST_PRODUCTION))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(sourcemaps.write('/'))
            .pipe(gulp.dest(paths.DEST_PRODUCTION));
};

module.exports = () => util.exportTask(task, deps);