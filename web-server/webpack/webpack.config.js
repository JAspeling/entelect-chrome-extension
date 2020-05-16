const path = require('path');

const config = {
    entry: {
        main: './src/main.ts',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist')
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
        ]
    },
    plugins: [
       
    ],
    // which file extensions it adds to the imports it finds
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    },
    node: {
        fs: 'empty',
        net: 'empty',
    }
};

module.exports = config;