'use strict';

const gulp = require('gulp');
const path = require('path');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const strip = require('gulp-strip-comments');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');

const DEST_PRODUCTION = 'build/';
const DEST_EXAMPLES = './examples/';
const DEST_DEVELOPMENT = path.join(DEST_EXAMPLES, 'assets');
const SRC_DEVELOPMENT = './src/*.js';
const SRC_EXAMPLES = path.join(DEST_EXAMPLES, '*.html');

gulp.task('jshint', () => {
	return gulp.src(SRC_DEVELOPMENT)
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

gulp.task('clean-production', () => {
  return gulp.src(DEST_PRODUCTION)
              .pipe(clean());
});

gulp.task('build-dev', ['jshint'], () => {
  return  gulp.src(SRC_DEVELOPMENT)
              .pipe(babel())
              .on('error', function(err) { this.emit('end'); })
              .pipe(gulp.dest(DEST_DEVELOPMENT))
              .pipe(browserSync.stream());
});

gulp.task('watch-dev', ['build-dev'], () => {
  browserSync.init({
    server: DEST_EXAMPLES,
  });

  gulp.watch(SRC_DEVELOPMENT, ['build-dev']);
  gulp.watch(SRC_EXAMPLES).on('change', browserSync.reload);
});

//Cria junta todos os módulos e dependencias
gulp.task('build-production', ['clean-production'], () => {
	gulp.src(SRC_DEVELOPMENT)
      .pipe(sourcemaps.init())
      .pipe(babel())
      .pipe(strip())
      .pipe(gulp.dest(DEST_PRODUCTION))
      .pipe(uglify())
      .pipe(rename({ extname: '.min.js' }))
      .pipe(sourcemaps.write('/'))
      .pipe(gulp.dest(DEST_PRODUCTION));
});

gulp.task('default', ['build-production']);