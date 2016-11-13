var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: ['whatwg-fetch', path.resolve(ROOT_PATH, 'app/index.js')],

    resolve: {
        extensions: ['', '.js']
    },

    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },

    plugins: [

        new HtmlWebpackPlugin({
            title: 'Neighborhood map',
            template: './app/index.html'
        }),

        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel",
                query: {
                    presets: ['es2015']
                }
            },

            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass']
            }
        ]
    }
};