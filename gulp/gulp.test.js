var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;

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
    .src(config.tests.client)
    .pipe($.karma({ configFile: config.tests.karma,  action: 'watch' }));
});
