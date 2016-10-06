'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var concat = require('gulp-concat');
var FileCache = require('gulp-file-cache')
var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var open = require('gulp-open');
var sass = require('gulp-sass');
var shim = require('browserify-shim');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');

var path = {
  html: 'src/static/index.html',
  server: { src: 'src/server.js', dest_File: 'src/static/js/server.js' },
  js: { entry: 'src/app-client.js', dest: 'src/static/js' },
  sass: 'src/sass/*.sass',
  src: 'src',
  dest: ''
};

//var fileCache = new FileCache();

// gulp.task('index', () => {
//   return gulp.src(path.html)
//         .pipe(gulp.dest(path.dest))
//         //.pipe(open(), {app: 'google-chrome'});
// });

gulp.task('server', () => {
    return gulp.src(path.server.src)
      .pipe('babel',({presets: [ 'es2015', 'react' ]}))
      .pipe(gulp.dest(path.js.dest));
});

gulp.task('bundle', () => {
    return browserify(path.entry)
          .transform('babelify', {presets: ['es2015', 'react']})
          .bundle()
          .pipe(source('bundle.js'))
          .pipe(gulp.dest(path.js.dest));
});

// gulp.src('./src/**/*.js') // your ES2015 code 
//                    .pipe(cache.filter()) // remember files 
//                    .pipe(babel({ ... })) // compile new ones 
//                    .pipe(cache.cache()) // cache them 
//                    .pipe(gulp.dest('./dist')) // write them 

gulp.task('styles', () => {
    return gulp.src(path.sass)
          .pipe(sourcemaps.init())
          .pipe(sass.sync().on('error', sass.logError))
          .pipe(autoprefixer())
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(path.dest));
});

// gulp.task('nodemon', ['bundle', 'build', 'styles'], function() {
//   nodemon({
//     script: path.js.dest + '/bundle.js',
//     tasks: ['bundle'], // compile synchronously onChange
//     ext: 'js'
//   })
// })

gulp.task('nodemon', ['server', 'bundle', 'styles'], (cb) => {
    let called = false;

    return nodemon({
        script: path.server.dest_File,
        ext: 'js html',
        ignore: ['./public', 'node_modules'],
        nodeArgs: ['--harmony']
    })
        .on('start', () => {
            if (!called) {
                called = true;
                cb();
            }
        })
        .on('restart', () => {
            setTimeout(() => {
                reload();
            }, 500);
        });
});


gulp.task('default', function() {
    gulp.start('server', 'bundle', 'styles', 'nodemon');
});