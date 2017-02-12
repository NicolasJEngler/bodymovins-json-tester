var gulp = require('gulp'),
    webserver = require('gulp-webserver'),
    sass = require('gulp-sass'),
    postcss = require('gulp-postcss'),
    cssNext = require('postcss-cssnext'),
    concatCss = require('gulp-concat-css'),
    cssnano = require('gulp-cssnano'),
    concatJs = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    watch = require('gulp-watch');

// gulp webserver - starts a local webserver to see changes
gulp.task('webserver', function() {
  gulp.src('./dist')
    .pipe(webserver({
      livereload: true,
      directoryListing: {
        enable: true,
        path: 'dist'
      },
      open: true
    })
  );
});

// gulp css - uses cssnext for prefixing and future css, concatenates all CSS files, and minifies the result
gulp.task('css', function () {
  return (
    gulp.src('./src/css/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concatCss('all.css'))
    .pipe(postcss([
      cssNext()
    ]))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
  )
});

gulp.task('vendor-css', function () {
  var source = './src/vendor/';
  return (
    gulp.src([
      // source + 'plugin/styles.css'
    ])
    .pipe(concatCss('vendor.css'))
    .pipe(cssnano())
    .pipe(gulp.dest('./dist/css'))
  )
});

// gulp js - concatenates and minifies JS files
gulp.task('js', function() {
  return gulp.src('./src/scripts/**/*.js')
    .pipe(concatJs('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('vendor-js', function() {
  var source = './src/vendor/';
  return gulp.src([
      // source + 'plugin/script.js'
      source + 'jquery/jquery-3.1.1.min.js',
      source + 'bodymovin/bodymovin.min.js'
    ])
    .pipe(concatJs('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/scripts/'));
});

// gulp clean - cleans the dist folder
gulp.task('clean', function () {
  return del([
    './dist/**/*'
  ]);
});

// gulp copy-images - copies files inside images folder
gulp.task('copy-images', function() {
  return gulp.src('./src/images/**/*.{svg,png,jpg,gif}')
    .pipe(gulp.dest('./dist/images'));
});

// gulp copy - copies HTML files inside src
gulp.task('copy', function() {
  return gulp.src([
      './src/**/*.html',
      './src/**/*.php'
    ])
    .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/css/**/*.scss', ['css']);
  gulp.watch('./src/scripts/**/*.js', ['js']);
  gulp.watch('./src/vendor/css/**/*.css', ['vendor-css']);
  gulp.watch('./src/vendor/js/**/*.js', ['vendor-js']);
  gulp.watch('./src/images/**/*.{svg,png,jpg,gif}', ['copy-images']);
  gulp.watch('./src/**/*.html', ['copy']);
  gulp.watch('./src/**/*.php', ['copy']);
});

gulp.task('build', ['css', 'vendor-css', 'js', 'vendor-js', 'copy-images', 'copy']);

gulp.task('default', ['webserver', 'watch']);
