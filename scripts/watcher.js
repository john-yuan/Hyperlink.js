var watcher = require('@john-yuan/dev-browserify-watcher');

var watch = function () {
    watcher.watch({
        entry: 'lib/Hyperlink.js',
        output: 'dist/Hyperlink.js',
        paths: 'lib/**/*.js',
        browserifyOptions: {
            standalone: 'Hyperlink',
            debug: true,
            detectGlobals: false,
        }
    });
};

exports.watch = watch;
