const CleanPlugin = require('clean-webpack-plugin');
const config = require('./webpack.config');

config.mode = 'development';
config.devtool = 'inline-source-map';
config.plugins.push(new CleanPlugin.CleanWebpackPlugin());

config.resolve.alias = {
    [path.resolve(__dirname, "../src/environments/environment.ts")]: path.resolve(__dirname, "../src/environments/environment.develop.ts")
}

module.exports = config;