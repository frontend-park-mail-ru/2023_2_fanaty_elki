const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = ({ development }) => ({
    entry: "./public/index.ts",
    output: {
        filename: "index_bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    mode: development ? "development" : "production",
    devtool: development ? "eval-cheap-source-map" : false,
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.hbs$/i,
                use: ["handlebars-loader"],
            },
            {
                test: /\.(png|jpe?g|gif|ico)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.(ts|js)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
    resolve: {
        extensions: [".d.ts", ".ts", ".js", ".hbs"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
    ],
});
