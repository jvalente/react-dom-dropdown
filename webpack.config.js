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
            }
        ]
    }
};
