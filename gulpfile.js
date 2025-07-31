var gulp = require("gulp"),
  imagemin = require("gulp-imagemin"),
  cleanCss = require("gulp-clean-css"),
  sass = require("gulp-sass")(require("sass")),
  concat = require("gulp-concat"),
  uglify = require("gulp-uglify"),
  del = require("del");

var paths = {
  root: "./",
  dist: "wwwroot/dist/",
  distImg: "wwwroot/dist/img/",
  distCss: "wwwroot/dist/css/",
  distJs: "wwwroot/dist/js/",
  srcCss: "wwwroot/css/",
  srcJs: "wwwroot/js/",
};

// Deletes the entire dist folder
gulp.task("clean", function () {
  return del([paths.dist]);
});

// Minify images
gulp.task("min-img", function () {
  return gulp
    .src(paths.root + "img/*.{png,gif,jpg}")
    .pipe(imagemin())
    .pipe(gulp.dest(paths.distImg));
});

// Combine and minify css
gulp.task("min-css", function () {
  return gulp
    .src(paths.srcCss + "*.css")
    .pipe(concat("site.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.distCss));
});

// Compile, combine and minify sass
gulp.task("min-sass", function () {
  return gulp
    .src(paths.root + "scss/*.scss")
    .pipe(sass())
    .pipe(concat("site.min.css"))
    .pipe(cleanCss())
    .pipe(gulp.dest(paths.distCss));
});

// Combine and minify js
gulp.task("min-js", function () {
  return gulp
    .src([paths.srcJs + "**/*.js"])
    .pipe(concat("site.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.distJs));
});

// Compiles and minifies everything.
gulp.task(
  "min",
  gulp.series("clean", gulp.parallel("min-img", "min-css", "min-js"))
);
