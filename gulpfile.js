'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var plumber = require('gulp-plumber');
var browserSync = require("browser-sync");
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');

sass.compiler = require('node-sass');

gulp.task("sass", function() {
    gulp
      .src("app/sass/main.scss")
      .pipe(plumber())
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(rename("main.css"))
      .pipe(autoprefixer({
          browsers: ['last 20 versions'],
          cascade: false
      }))
      .pipe(gulp.dest("./html"))
      .pipe(browserSync.reload({ stream: true }));

    gulp.start('pug');
});

gulp.task('watch', ["sass", "browser"], function () {
    gulp.watch('app/sass/*.scss', ['sass']);
    gulp.watch('app/pug/*.pug', ['pug']);
    gulp.watch("src/index.html", browserSync.reload);
});

gulp.task("browser", function() {
    browserSync({
        server: { baseDir: "html" },
        notify: true
    });
});

gulp.task('pug', function () {
    return gulp.src('app/pug/*.pug')
        .pipe(plumber())
        .pipe(pug())
        .pipe(gulp.dest('./html'))
        .pipe(browserSync.reload({ stream: true }));
});

