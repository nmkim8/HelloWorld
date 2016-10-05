'use strict';

var autoprefixer = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var babelify = require('babelify');
var browserify = require('browserify');
var BrowserSync = require('browser-sync');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var FileCache = require('gulp-file-cache')
var gulp = require('gulp');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var open = require('gulp-open');
var rename = require('gulp-rename');
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

const browserSync = BrowserSync.create();
const reload = browserSync.reload;

gulp.task('build', function(){
  return gulp.src(path.html)
        .pipe(gulp.dest(path.dest))
        //.pipe(open(), {app: 'google-chrome'});
});


// function bundle (bundler) {

//     // Add options to add to "base" bundler passed as parameter
//     bundler
//       .bundle()                                                        // Start bundle
//       .pipe(source('app.jsx'))                        // Entry point
//       .pipe(buffer())                                               // Convert to gulp pipeline
//       .pipe(rename('bundle.js'))          // Rename output from 'main.js'
//                                                                               //   to 'bundle.js'
//       .pipe(sourcemaps.init({ loadMaps : true }))  // Strip inline source maps
//       .pipe(sourcemaps.write('.'))    // Save source maps to their
//                                                                                       //   own directory
//       .pipe(gulp.dest(path.js.dest))        // Save 'bundle' to build/
//       .pipe(livereload());                                       // Reload browser if relevant
// }

// gulp.task('bundle', ['build'], function () {
//     var bundler = browserify(path.js.src + '/app.jsx')  // Pass browserify the entry point
//           .transform(babelify, { presets : [ 'es2015', 'react' ] });  // Then, babelify, with ES2015 preset

//     bundle(bundler);  // Chain other options -- sourcemaps, rename, etc.
// });

// gulp.task('es6', ['build'], function () {
//   return browserify(path.js.src + '/app.jsx')
//         .transform('babelify', {presets: ['es2015', 'react']})
//         .bundle()
//         .pipe(source('bundle.js'))
//         .pipe(gulp.dest(path.js.dest));
// });

                                                // gulp.task('bundle', ['build'], function () {
                                                //   return browserify(path.js.src + '/app.jsx')
                                                //         .transform('babelify', {presets: ['es2015', 'react']})
                                                //         .bundle()
                                                //         .pipe(source('bundle.js'))
                                                //         .pipe(gulp.dest(path.js.dest));
                                                // });

// gulp.task('bundle', function() {
//   return browserify({
//       extensions: ['.jsx', '.js'],
//       debug: true,
//       cache: {},
//       packageCache: {},
//       fullPaths: true,
//       entries: path.js.src + '/app.jsx'
//     })
//     .transform(babelify.configure({ 
//         presets: ['es2015', 'react'],
//         ignore: /(bower_components)|(node_modules)/
//     }))
//     .bundle()
//     .on("error", function (err) { console.log("Error : " + err.message); })
//     .pipe(source('bundle.js'))
//     .pipe(gulp.dest(path.js.dest));
// });

gulp.task('browserify', ['build'], function() {
    browserify(path.js.src + '/app.jsx', { debug: true })
        .transform(babelify.configure({
            presets: ["react"]
        }))
        .transform('browserify-shim', { global: true })
        .bundle()
        .on('error', err => { console.log('Error : ' + err.message); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(path.js.dest))
        .pipe(reload({ stream: true }));
});

gulp.task('nodemon', cb => {
    let called = false;

    return nodemon({
        script: './bundle.js',
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

gulp.task('browser-sync', ['nodemon', 'browserify'], function() {
    browserSync.init(null, {
        proxy: {
            target: 'http://localhost:3000',
            ws: true
        },
        port: 35729
    });
});


gulp.task('styles', function() {
  return gulp.src(path.sass)
        .pipe(sourcemaps.init())
        .pipe(sass.sync().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.dest));
});

// gulp.task('nodemon', ['build', 'bundle', 'styles'], function() {
//   nodemon({
//     script: path.js.dest + '/bundle.js',
//     //tasks: ['bundle'],
//     ext: 'js'
//   })
// })

gulp.task('default', function() {
    gulp.start('build', 'browserify', 'styles', 'nodemon', 'browser-sync');
});