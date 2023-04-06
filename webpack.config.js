const webpack = require('webpack');
const pkg = require('./package.json');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

let config = {
    entry: './src/index.js',
    output: {
        filename: 'flv.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'flvjs',
        libraryTarget: 'umd',
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    plugins: [
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(pkg.version)
        })
    ],
    node: {
        'fs': 'empty',
        'path': 'empty'
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                // extractComments: false,
            })
        ]
    },

    module: {
        rules: [
            {
                test: /\.(ts|js)$/,
                use: 'ts-loader',
                exclude: /node-modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'source-map-loader'
            }
        ]
    }
};

module.exports = (env, argv) => {
    if (argv.mode === 'production') {
        config.output.filename = 'flv.min.js';
    }

    return config;
};
