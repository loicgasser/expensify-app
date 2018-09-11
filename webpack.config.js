const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV == 'test') {
    require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV == 'development') {
    require('dotenv').config({ path: '.env.development' })
}
// NODE_ENV is automatically set to production on Heroku

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
            path: path.join(__dirname, 'public', 'dist'),
            filename: 'bundle.js',
            publicPath: '/'
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
            }),
            new webpack.definePlugin({
                'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
                'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
                'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
                'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
                'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
                'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID)
            })
        ],
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'public', 'dist'),
            compress: false,
            port: 9000,
            historyApiFallback: true
        }
    }
}