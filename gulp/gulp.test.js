var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;

var files =  [
          'app/dev/lib/angular/angular.js',
          'app/dev/lib/angular-mocks/angular-mocks.js',
          'app/dev/js/**/*.js',
          'test/**/*.js'
        ];

gulp.task('mocha', function() {
    return gulp
    .src(config.tests.server, {read: false})
    .pipe($.mocha());
});

gulp.task('test:server', function() {
    gulp.watch(config.tests.server, ['mocha']);
});

gulp.task('test:client', function() {
    return gulp
    .src(files)
    .pipe($.karma({ configFile: config.tests.karma,  action: 'watch' }));
});
