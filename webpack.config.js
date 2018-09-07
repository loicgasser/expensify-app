const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env) => {
    const isProduction = env == 'production'

    return {
        mode: 'development',
        entry: './src/app.js',
        watch: isProduction ? false : true,
        watchOptions: {
            poll: true,
            ignored: /node_modules/
        },
        output: {
            path: path.join(__dirname, '/public'),
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    exclude: /node_modules/,
                    test: /\.js$/
                },
                {
                    test: /\.s?css$/,
                    use: [
                        isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'styles.css',
                chunkFilename: 'styles.[hash].css'
            }),
            new HtmlWebpackPlugin({
                template: 'public/index.template.html',
                minify: true
            })
        ],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, '/public'),
            compress: false,
            port: 9000,
            historyApiFallback: true
        }
    }
}