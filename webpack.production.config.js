var path = require('path');
var SCSS_LOADER = "style!style-loader!css-loader!sass-loader";
var config = {
    entry: path.resolve(__dirname, "./client/scripts/index.js"),
    output: {
        path: './www',
        filename: "static/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.scss$/, loader: SCSS_LOADER },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            },
            {
            test: /\.js$/,

            // There is not need to run the loader through
            // vendors
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                optional: ["es7.decorators", "es7.classProperties"]
            }
        }]
    }
};

module.exports = config;