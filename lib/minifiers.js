var jsmin = require('./../deps/jsmin').minify;

module.exports = {
    // Return a js minification function, based on a passed-in name.
    // Supported values are 'uglify-js' and 'jsmin'; if none are provided jsmin
    // will be used.
    // Note that you must also have uglify-js in your package.json for it to work.
    getJsMinifier: function ( name ) {
        if ( name === 'uglify-js' ) {
            // See explanation of uglify's API at https://github.com/mishoo/UglifyJS
            var uglify          = require('uglify-js');
            return function ( contents ) {
                var ast = uglify.parser.parse(contents);
                ast     = uglify.uglify.ast_mangle(ast);
                ast     = uglify.uglify.ast_squeeze(ast);
                return uglify.uglify.gen_code(ast);
            };
        } else {
            return jsmin;
        }
    }
};
