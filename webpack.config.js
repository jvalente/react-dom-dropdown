module.exports = {
    entry: "./src/Dropdown.jsx",
    output: {
        path: "./lib",
        filename: "Dropdown.js"
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
            },
            { test: /\.css$/,  loader: 'style!css' },
        ]
    },
    exports: {
        resolve: '/Users/jvalente/Projects/twist',
        resolveLoader: '/Users/jvalente/Projects/twist'
    }
};
