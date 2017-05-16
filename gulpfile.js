
////////////////////////////////
//
// Включаем задачи
//
////////////////////////////////

// Плагины
var gulp = require('gulp'),
      pjson = require('./package.json'),
      gutil = require('gulp-util'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      cssnano = require('gulp-cssnano'),
      rename = require('gulp-rename'),
      del = require('del'),
      plumber = require('gulp-plumber'),
      uglify = require('gulp-uglify'),
      exec = require('child_process').exec,
      runSequence = require('run-sequence'),
      browserSync = require('browser-sync').create(),
      reload = browserSync.reload;


// Директории
var pathsConfig = function (appName) {
  this.app = "./app";

  return {
    app: this.app,
    templates: this.app + '/templates',
    css: this.app + '/static/css',
    sass: './src/sass',
    fonts: this.app + '/static/fonts',
    images: this.app + '/static/images',
    js: this.app + '/static/js',
  }
};

var paths = pathsConfig();

////////////////////////////////
    //Задачи//
////////////////////////////////

// Стили
gulp.task('styles', function() {
  return gulp.src(paths.sass + '/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(plumber()) // Checks for errors
    .pipe(autoprefixer({browsers: ['last 2 version']})) // Adds vendor prefixes
    .pipe(gulp.dest(paths.css))
    .pipe(rename({ suffix: '.min' }))
    .pipe(cssnano()) // Minifies the result
    .pipe(gulp.dest(paths.css));
});

// JS  минификация
gulp.task('scripts', function() {
  return gulp.src(paths.js + '/project.js')
    .pipe(plumber()) // Checks for errors
    .pipe(uglify()) // Minifies the js
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(paths.js));
});


// Запуск Django сервера
gulp.task('runServer', function() {
  exec('python manage.py runserver', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
});

// Browser sync 
gulp.task('browserSync', function() {
    browserSync.init(
      [paths.css + "/*.css", paths.js + "*.js", paths.templates + '*.html'], {
        proxy:  "localhost:8000"
    });
});

// Default task
gulp.task('default', function() {
    runSequence(['styles', 'scripts'], 'browserSync');
});

////////////////////////////////
    //Watch//
////////////////////////////////

// Watch
gulp.watch(paths.sass + '/*.scss', ['styles']);
