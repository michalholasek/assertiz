'use strict';

var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulp = require('gulp');
var path = require('path');

gulp.task('style', function () {
  return gulp.src(path.join('lib', 'reporters', '*.css'))
    .pipe(rename('assertiz.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('build'));
});

gulp.task('scripts', function () {
  var libs = path.join('lib', '*.js');
  var reporters = path.join('lib', 'reporters', '*.js');
  var src = path.join('src', '*.js');

  return gulp.src([libs, reporters, src])
    .pipe(concat('assertiz.js'))
    .pipe(uglify())
    .pipe(rename('assertiz.min.js'))
    .pipe(gulp.dest('build'));
});

gulp.task('default', function () {
  gulp.start('style', 'scripts');
});
