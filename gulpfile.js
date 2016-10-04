'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var gulp = require('gulp');
var open = require('gulp-open');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var react = require('gulp-react');

const dirs = {
  src: 'src',
  dest: 'build'
};

var jsFiles = {
  src: 'src/js',
  dest: 'build/js'
};

const sassPaths = {
  src: 'src/sass',
  dest: 'build/sass'
};

//
gulp.task('transform', function () {
  return gulp.src(jsFiles.src + '/*.jsx')
        .pipe(react({harmony: false, es6module: true}))
        .pipe(gulp.dest(jsFiles.dest));
});

gulp.task('es6', ['transform'], function () {
  return gulp.src(jsFiles.src + '/*.js')
        .pipe(babel())
        .pipe(gulp.dest(jsFiles.dest));
});

gulp.task('build',['es6'], function(){
  return gulp.src('src/html/index.html')
        .pipe(open(), {app: 'google-chrome'});
});

gulp.task('styles', () => {
  return gulp.src(dirs.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dirs.dest));
});

gulp.task('default', function() {
    gulp.start('transform', 'es6', 'build', 'styles');
});