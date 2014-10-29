'use strict';

var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var gulp = require('gulp');

gulp.task('style', function () {
  return gulp.src('lib\\reporters\\flat.css')
    .pipe(rename('assertiz.min.css'))
    .pipe(minifycss())
    .pipe(gulp.dest('build\\'));
});

gulp.task('scripts', function () {
  return gulp.src(['lib\\*.js', 'lib\\reporters\\flat.js', 'src\\*.js'])  
    .pipe(concat('assertiz.js'))
    .pipe(uglify())
    .pipe(rename('assertiz.min.js'))
    .pipe(gulp.dest('build\\'));
});

gulp.task('default', function () {
  gulp.start('style', 'scripts');
});
