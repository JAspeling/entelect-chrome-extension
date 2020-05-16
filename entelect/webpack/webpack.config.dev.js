const CleanPlugin = require('clean-webpack-plugin');
const config = require('./webpack.config');

config.mode = 'development';
config.devtool = 'inline-source-map';
config.plugins.push(new CleanPlugin.CleanWebpackPlugin());

module.exports = config;