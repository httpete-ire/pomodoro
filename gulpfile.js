var gulp = require('gulp');
var $ = plugins = require('gulp-load-plugins')();

var path = require('path');
var wiredep = require('wiredep').stream;
var browserSync = require('browser-sync');

/**
 *  paths
 */
var paths = {
    app: './app',
    sass: 'app/dev/sass/**/*.scss',
    dist: './app/dist',
    index: './app/index.html',
    css: './app/dist/*.css',
    js: './app/dev/js/**/*.js',
    devCss: './app/dev/css',
    test: './app/test/**/*.js'
};

/**
 * inject bower dependencies
 *
 */
gulp.task('bowerInject', function () {
  return gulp.src(paths.index)
    .pipe(wiredep({
          directory: 'app/dev/lib/',
          exclude: ['dev/lib/jquery/dist/jquery.js', 'dev/lib/bootstrap-sass-official/assets/javascripts/bootstrap.js', 'dev/lib/angular-mocks/angular-mocks.js'],
          ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(paths.app));
});

/**
 * start the broweser sync server
 *
 */
gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: paths.app
        }
    });
});

/**
 * compile SASS files to css
 *
 */
gulp.task('sass:dev', function () {
    return sass({
        outputStyle: 'expanded',
        dest: paths.dist
    });
});

/**
 * compile SASS files to css
 *
 */
gulp.task('sass:build', function () {
    return sass({
        outputStyle: 'compressed',
        dest: paths.dist
    });
});

gulp.task('js-lint', function(){
  return lint(paths.js);
});

gulp.task('inject', function () {

  var sources = gulp.src([paths.js], {read: false});

  return gulp.src(paths.index)
              .pipe($.inject(sources, {
                 ignorePath: '/app',
                 addRootSlash: false
              }))
              .pipe(gulp.dest(paths.app));
});

gulp.task('test', function() {
  return gulp.src(paths.test)
    .pipe($.plumber())
    .pipe($.karma({ configFile: './karma.conf.js' }))
    .on('error', function(err) { throw err; });
});

/**
 * run a dev enviornment for front end
 *
 */
gulp.task('dev', ['serve'], function () {
  gulp.watch([paths.sass], ['sass:dev']);
  gulp.watch([paths.js], [browserSync.reload]);
});

/**
 * inject bower into html, complile sass and inject
 */
gulp.task('setup', ['bowerInject', 'sass:dev', 'test', 'dev']);

function sass (opts) {
    if(!opts) {
        return;
    }

    return gulp.src(paths.sass)
    .pipe($.sourcemaps.init())
    .pipe($.sass({
        outputStyle: opts.outputStyle
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(opts.dest))
    .pipe(browserSync.reload({stream:true}));
}

/**
 * Helper functions
 */
function lint (src) {
  return gulp.src(src)
      .pipe($.jshint('./.jshintrc'))
      .pipe($.notify({
          onLast: false,
          message: function (file) {
              if (file.jshint.success) {
              // Don't show something if success
              return false;
              }
          // create a string that contains error details
              var errors = file.jshint.results.map(function (data) {
                  if (data.error) {
                      return 'line ' + data.error.line + ' : ' +  data.error.reason;
                  }
              }).join('\n'); // join error messages with a new line

              return errors;
          },
          title: function (file) {
              return 'File : ' + file.relative;
          },
          sound: 'Submarine'
  }));
}
