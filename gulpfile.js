var gulp = require('gulp');

// Plugins
var jshint         = require('gulp-jshint'),
    sass           = require('gulp-sass'),
    sourcemaps     = require('gulp-sourcemaps'),
    neat           = require('node-neat').includePaths,
    browserSync    = require('browser-sync'),
    notify         = require('gulp-notify'),
    filter         = require('gulp-filter');

var reload         = browserSync.reload;

//Paths
var dest = './public';

//Errors
var onError = function(err) {
  return notify().write(err);
}

// Tasks
gulp.task('sass', function() {
  return gulp.src(dest + '/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass( {
        includePaths: neat,
        outputStyle: 'nested',
        onError: onError
    }))
		// .pipe(sourcemaps.write('maps'))
		.pipe(gulp.dest(dest + '/css'))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(reload({stream:true}));
});

gulp.task('sass-prod', function() {
  return gulp.src(dest + '/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass( {
        includePaths: neat,
        outputStyle: 'nested',
        onError: onError
    }))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest(dest + '/css'))
});

gulp.task('js', function() {
  return gulp.src(dest + '/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: dest
    }
  });
});

//Run App
gulp.task('dev', ['sass', 'js', 'browser-sync'], function () {
	gulp.watch(dest + "/scss/*.scss", ['sass']);
	gulp.watch([dest + "/js/**/*.js", dest + "/*.html"], reload);
});

//Run App
gulp.task('heroku:production', ['sass-prod', 'js'], function () {

});
