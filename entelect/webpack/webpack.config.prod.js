const CleanPlugin = require('clean-webpack-plugin');
const config = require('./webpack.config');

config.mode = 'production';
config.devtool = 'none';
config.plugins.push(new CleanPlugin.CleanWebpackPlugin());

module.exports = config;