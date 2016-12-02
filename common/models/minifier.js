'use strict';
var UglifyJS = require("uglify-js");

module.exports = function(Minifier) {
    Minifier.minifyJs = function (data, cb) {
        //var result = UglifyJS.minify("/path/to/file.js");        
        // if you need to pass code instead of file name
        var result = UglifyJS.minify(data, {fromString: true});
        console.log(result.code); // minified output
        console.log(result); // minified output

        cb(null, result.code);
    }

    Minifier.remoteMethod(
        'minifyJs', {
            http: {
                path: '/minifyJs',
                verb: 'post'
            },
            description: [
                "api endpoint to minify javascript files"
            ],
            accepts: [
                {
                    arg: 'data',
                    type: 'string',
                    required: 'true'
                }
            ],
            returns: {
                arg: 'result',
                type: 'string'
            }
        }
    );
};
