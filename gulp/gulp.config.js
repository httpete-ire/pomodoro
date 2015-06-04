exports.config =  {
    tests: {
        client: [
        './node_modules/angular/angular.js',
        './node_modules/angular-mocks/angular-mocks.js',
        './client/app/**/*.js',
        './client/test/**/*.js'],
        server: '',
        karma: './karma.conf.js'
    },
    styles: {
        sass: './client/sass/**/*.scss',
        css: './client/css'
    },
    js: {
        server: '',
        client: './client/app/**/*.js'
    },
    templates: './client/app/views/**/*.html',
    build: './client/build',
    port: 3000,
    app: './client/'
};

exports.banner = [
  '/*! ',
    '<%= package.name %> ',
    'v<%= package.version %> | ',
    '(c) ' + new Date().getFullYear() + ' <%= package.author %> |',
    ' <%= package.homepage %>',
  ' */',
  '\n'
].join('');

