const config = require('./webpack.config');
const path = require('path');

config.mode = 'development';
config.devtool = 'inline-source-map';

config.resolve.alias = {
    [path.resolve(__dirname, "../src/environments/environment.ts")]: path.resolve(__dirname, "../src/environments/environment.local.ts")
}

module.exports = config;