const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./chrome/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");

const config = {
    mode: 'development',
    entry: {
        popup: './src/popup/popup.ts',
        options: './src/options/options.ts',
        background: './src/background/background.ts',
        styles: './src/scss/styles.scss'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        // loader is a package that tells webpack how to deal with certain files.
        rules: [
            {
                //whether the rule applies to this file or not
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/css/[name].css',
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader?-url'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ],
            },
        ]
    },
    plugins: [
        // new HtmlWebpackPlugin({
        //     title: "Entelect Extensions",
        //     meta: {
        //         charset: "utf-8",
        //         viewport: "width=device-width, initial-scale=1, shrink-to-fit=no", "theme-color": "#000000"
        //     },
        //     manifest: "manifest.json",
        //     filename: "index.html",
        //     template: "./static/index.html",
        //     hash: true
        // }),
        new HtmlWebpackPlugin({
            filename: 'popup.html',
            template: 'src/popup/popup.html',
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            filename: 'options.html',
            template: 'src/options/options.html',
            chunks: ['options']
        }),
        new CopyPlugin({
            patterns: [
                { from: 'chrome/icons', to: 'assets/icons' },
                { from: 'vendor', to: 'assets/vendor' },
            ],
        }),
        new WebpackExtensionManifestPlugin({
            config: {
                base: baseManifest
            }
        })
    ],
    // which file extensions it adds to the imports it finds
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    }
};

module.exports = config;