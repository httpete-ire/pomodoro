module.exports = function(config) {
    config.set({
        basePath: '',
        autoWatch: true,
        browsers: ['PhantomJS'],
        frameworks: ['mocha', 'chai'],
        plugins: [
          'karma-spec-reporter',
          'karma-phantomjs-launcher',
          'karma-mocha',
          'karma-chai'
        ],
        files: [
          'app/dev/lib/angular/angular.js',
          'app/dev/lib/angular-mocks/angular-mocks.js',
          'app/dev/js/**/*.js',
          'test/**/*.js'
        ],
        reporters: ['spec']
    });
};
