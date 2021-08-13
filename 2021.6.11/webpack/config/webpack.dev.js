const { resolve } = require("path"); // node内置核心模块，用来设置路径。
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: "./src/index.js", // 入口文件
    output: {
        // 输出配置
        filename: "./js/main.js", // 输出文件名
        path: resolve(__dirname, "build"), // 输出文件路径配置
        clean: true, // 清除打包目录的文件
    },
    mode: "development", // 开发环境(二选一)
    // mode: 'production'   // 生产环境(二选一)
    module: {
        rules: [
            {
                test: /\.js$/, // 只检测js文件
                exclude: /node_modules/, // 排除node_modules文件夹
                enforce: "pre", // 提前加载使用
                use: {
                    // 使用eslint-loader解析
                    loader: "eslint-loader",
                },
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,"css-loader", "less-loader"]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024, // 小于8kb以下的图片会被打包成base64格式
                    },
                },
            },
            {
                test: [/\.ttf$/, /\.woff$/, /\.woff2$/],
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].[contenthash:8].css",
            chunkFilename: "css/[id].[contenthash:8].css",
        }),
        new CssMinimizerPlugin({}),

    ],
    devServer: {
        contentBase: './build',  // 打包根路径
        port: 8080, // 端口号
        open: true,// 自动打开浏览器
        progress: true, // 进度条
    },


};