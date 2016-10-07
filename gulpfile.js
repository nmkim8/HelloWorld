'use strict';

var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var path = require('path');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var shell = require('gulp-shell');
// var gutil = require('gulp-util');
// var webpack = require('webpack');
// var webpackConfig = require('./webpack.config.js');
// var WebpackDevServer = require("webpack-dev-server");


var path = {
  server: { src: 'src/server.js', dest_File: 'src/static/js/server.js' },
  js: { entry: 'src/app-client.js', dest: 'src/static/js' },
  sass: 'src/sass/*.sass',
  src: 'src',
  dest: ''
};

gulp.task('styles', () => {
    return gulp.src(path.sass)
          .pipe(sourcemaps.init())
          .pipe(sass.sync().on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(path.dest));
});

// gulp.task('serve', function(callback) {
//    var myConfig = Object.create(webpackConfig);

//     new WebpackDevServer(webpack(myConfig), {
//         stats: {
//             colors: true
//         }
//     }).listen(3000, "localhost", function(err) {
//         if(err) throw new gutil.PluginError("webpack-dev-server", err);
//         gutil.log("[webpack-dev-server]", "http://localhost:3000/src/static");
//     });
// });

gulp.task('buildAndServe', shell.task([
    "NODE_ENV=production node_modules/.bin/webpack -p",
    "NODE_ENV=production node_modules/.bin/babel-node --presets 'react,es2015' src/server.js"
]))


gulp.task('default', function() {
    gulp.start('styles', 'buildAndServe');
});