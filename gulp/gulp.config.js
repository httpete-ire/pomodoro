exports.config =  {
    tests: {
        public:'./test/**/*.js',
        server:'',
        karma:'./karma.conf.js'
    },
    styles: {
        sass: './app/dev/sass/**/*.scss',
        css: './app/dist'
    },
    js: {
        server: '',
        client: './app/dev/js/**/*.js'
    },
    build: './app/dist',
    port: 3000,
    app: './app'
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

