const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');

module.exports = webpackMerge(baseConfig, {
    output: {
        filename: '[name].[chunkhash].js',
        path: 'dist'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: [
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ]
            })
        }]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['vendor', 'manifest']
        }),
        new ExtractTextPlugin('styles.[contenthash].css'),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                drop_console: true
            }
        }),
        new ChunkManifestPlugin({
            filename: 'chunk-manifest.json'
        })
    ]
});
