const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {

    //target: 'node',

    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ["@babel/preset-env"]
                },
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
        },
        ],
    },

    resolve: {
        fallback: {
            // other fallbacks
            "net": false,
            "tls": false,
            "fs": false,
        },
    },

    plugins: [new HtmlWebpackPlugin({
        template: './src/popup.html',
        filename: 'popup.html',
    }),
    new CopyPlugin({
        patterns: [
            { from: "public" },
        ],
    }),

    new NodePolyfillPlugin(),
    ],

    optimization: {
        minimize: false,
    },

};