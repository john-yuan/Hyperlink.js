var builder = require('@john-yuan/dev-browserify-builder');

builder.build('lib/Hyperlink.js', 'dist/Hyperlink.min.js', {
    standalone: 'Hyperlink',
    debug: false,
    detectGlobals: false
}, {
    compress: {
        drop_console: true
    }
});
