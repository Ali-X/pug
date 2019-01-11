'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var browserSync = require("browser-sync");

sass.compiler = require('node-sass');

gulp.task('sass', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./html'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', ["sass", "browser"], function () {
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/pug/*.pug', ['pug']);
    gulp.watch("src/index.html", browserSync.reload);
});

gulp.task("browser", function() {
    browserSync({
        server: { baseDir: "html" },
        notify: false
    });
});

gulp.task('pug', function () {
    return gulp.src('app/pug/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./html'))
        .pipe(browserSync.reload({ stream: true }));
});

