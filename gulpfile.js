'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var gulp = require('gulp');
var open = require('gulp-open');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var react = require('gulp-react');

var path = {
  html: 'src/index.html',
  js: { src: 'src/js/', dest: 'build/js' },
  sass: 'src/sass/*.sass',
  src: 'src',
  dest: 'build'
};

gulp.task('transform', function () {
  return gulp.src(path.js.src + '/*.jsx')
        .pipe(react({harmony: false, es6module: true}))
        .pipe(gulp.dest(path.js.dest));
});

gulp.task('es6', ['transform'], function () {
  return gulp.src(path.js.src + '/*.js')
        .pipe(babel())
        .pipe(gulp.dest(path.js.dest));
});

gulp.task('build',['es6'], function(){
  return gulp.src(path.html)
        .pipe(gulp.dest(path.dest));
        //.pipe(open(), {app: 'google-chrome'});
});

gulp.task('styles', () => {
  return gulp.src(path.sass)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.dest));
});

gulp.task('default', function() {
    gulp.start('transform', 'es6', 'build', 'styles');
});