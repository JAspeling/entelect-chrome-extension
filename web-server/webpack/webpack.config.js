const nodeExternals = require('webpack-node-externals');
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
            // {
            //     test: /\.ts$/,
            //     loader: 'file-replace-loader',
            //     options: {
            //         condition: 'always', // <-- Note that the rule applies for all files! But you can use other conditions too
            //         replacement(resourcePath) {
            //             const mapping = {
            //                 [path.resolve('./../src/environments/environment.ts')]: path.resolve('./../src/environments/environment.develop.ts.ts'),
            //             };
            //             return mapping[resourcePath];
            //         },
            //         async: true,
            //     }
            // },
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
    },
    // Excludes node_module packages from the main bundle
    externals: [nodeExternals()],
    target: 'node'
};

module.exports = config;