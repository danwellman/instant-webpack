const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        vendor: ['./node_modules/angular/angular'],
        bundle: ['./app/js/main']
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015'] }
            }, {
                loader: 'eslint-loader'
            }]
        }, {
            test: /\.woff2$/,
            loader: 'file-loader?name=fonts/[name].woff2'
        }, {
            test: /\.html$/,
            loader: 'html-loader'
        }]
    },
    resolve: {
        modules: ['../../node_modules']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor'
        }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            minify: {
                removeScriptTypeAttributes: true
            },
            favicon: './app/favicon.png'
        }),
        new CleanWebpackPlugin(['./dist'], {
            root: __dirname + '/..'
        })
    ]
}
