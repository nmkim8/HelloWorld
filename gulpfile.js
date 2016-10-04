'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var open = require('gulp-open');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

var path = {
  html: 'src/index.html',
  js: { src: 'src/js', dest: 'build/js' },
  sass: 'src/sass/*.sass',
  src: 'src',
  dest: 'build'
};

gulp.task('es6', function () {
  return browserify('src/js/app.jsx')
        .transform('babelify', {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.js.dest));
});

gulp.task('build',['es6'], function(){
  return gulp.src(path.html)
        .pipe(gulp.dest(path.dest))
        .pipe(open(), {app: 'google-chrome'});
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
    gulp.start('es6', 'build', 'styles');
});