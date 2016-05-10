var path = require('path');

module.exports = {
    entry: "./src/app.jsx",
    output: {
        path: "./lib",
        filename: "app.js"
    },
    module: {
        loaders: [
            {
                loader: "babel-loader",
                test: /\.jsx?$/,
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react'],
                }
            }
        ]
    },
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react')
        }
    }
};
