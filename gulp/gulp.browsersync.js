var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();
var config = require('./gulp.config').config;
var browserSync = require('browser-sync');

gulp.task('serve', function() {
    // browserSync.init(null, {
    //     proxy: 'http://localhost:' + config.port + '/',
    //     files: [config.build + '/main.css'],
    //     browser: 'google chrome',
    //     port: (config.port + 1)
    // });
    browserSync({
        server: {
            baseDir: config.app
        }
    });
});

gulp.task('serve:build', function() {
    browserSync({
        server: {
            baseDir: config.build
        }
    });
});

