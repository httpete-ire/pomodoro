exports.config =  {
    tests: {
        client: ['./node_modules/angular/angular.js', './node_modules/angular-mocks/angular-mocks.js', './client/app/js/**/*.js', './client/test/**/*.js'],
        server: '',
        karma: './karma.conf.js'
    },
    styles: {
        sass: './client/app/sass/**/*.scss',
        css: './client/app/css'
    },
    js: {
        server: '',
        client: './client/app/js/**/*.js'
    },
    build: './client/build',
    port: 3000,
    app: './client/app/'
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

