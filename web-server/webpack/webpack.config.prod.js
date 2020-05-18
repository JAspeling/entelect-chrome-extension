const CleanPlugin = require('clean-webpack-plugin');
const config = require('./webpack.config');

config.mode = 'production';
config.devtool = 'none';
config.plugins.push(new CleanPlugin.CleanWebpackPlugin());

config.resolve.alias = {
    [path.resolve(__dirname, "../src/environments/environment.ts")]: path.resolve(__dirname, "../src/environments/environment.prod.ts")
}

module.exports = config;