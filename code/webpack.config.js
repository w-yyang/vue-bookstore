const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "[name].js"
    },
    mode: "development",
    resolve: {
        extensions: ['.vue', '.js'],
        alias: {
            '@': resolve('src'),
            'node_modules': path.resolve(__dirname, 'node_modules')
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        esModule: false
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({ 
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
    ],
    devServer: {
        contentBase: path.resolve(__dirname, './dist'),
        proxy: {
            "/api": {
                target: "http://localhost:3000"
            },
            "/images": {
                target: "http://localhost:3000"
            }
        },
        port: 8080,
        hot: true,
        hotOnly: true
    }
}

function resolve (dir) {
    return path.join(__dirname, dir)
}