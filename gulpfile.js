'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var gulp = require('gulp');
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
  return gulp.src(paths.src)
    .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', plugins.sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.dest));
});