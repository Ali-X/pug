'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', function () {
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/pug/*.pug', ['pug']);
});

gulp.task('pug', function () {
    return gulp.src('app/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('./html'));
});

