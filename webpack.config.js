var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

    entry: [path.resolve(ROOT_PATH, 'app/index.js')],

    resolve: {
        extensions: ['', '.js',]
    },

    output: {
        path: path.resolve(ROOT_PATH, 'build'),
        filename: 'bundle.js'
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Neighborhood map'
        })
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
                test: /\.css$/,
                loaders: ['style', 'css']
            }
        ]
    }
};