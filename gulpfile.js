'use strict';

const gulp = require('gulp');
const uglify = require('gulp-uglify');
const jshint = require('gulp-jshint');
const clean = require('gulp-clean');
const babel = require('gulp-babel');
const rename = require('gulp-rename');
const strip = require('gulp-strip-comments');
const sourcemaps = require('gulp-sourcemaps');

const DEST = 'build/';

gulp.task('clean', () => {
	return gulp.src(DEST)
			.pipe(clean());
});

gulp.task('jshint', () => {
	return gulp.src('app/*.js')
			.pipe(jshint({esversion: 6}))
			.pipe(jshint.reporter('default'));
});

//Cria junta todos os módulos e dependencias
gulp.task('build', ['clean', 'jshint'], () => {
	return 	gulp.src('src/store.js')
            .pipe(sourcemaps.init())
            .pipe(babel({presets: ['es2015']}))
            .pipe(strip())
            .pipe(gulp.dest(DEST))
            .pipe(uglify())
            .pipe(rename({ extname: '.min.js' }))
            .pipe(sourcemaps.write('/'))
			.pipe(gulp.dest(DEST));
});

gulp.task('default', ['clean', 'jshint', 'build']);


