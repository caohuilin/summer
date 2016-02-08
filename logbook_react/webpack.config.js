module.exports = {
    entry: "./src/js/entry.js",
    output: {
        path: __dirname,
        filename: "all.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};