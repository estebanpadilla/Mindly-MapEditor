
var path = require('path');

module.exports = {
    entry: "./js/main.js",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: "dist"
    },
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        watchContentBase: true,
        compress: true
    }
}
