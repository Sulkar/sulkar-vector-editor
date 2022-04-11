const path = require('path');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// PostCss
const postcssVars = require('postcss-simple-vars');
const postcssImport = require('postcss-import');

module.exports =  {
    mode: 'production', //process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        playground: './src/playground/playground.jsx'
    },

    devServer: {
        contentBase: path.resolve(__dirname, 'playground'),
        host: 'localhost',
        port: process.env.PORT || 8078
    },
    
    output: {
        path: path.resolve(__dirname, 'playground'),
        filename: '[name].js',
    },
    plugins: [
      
    ],

    module: {
        rules: [{
           test: /\.jsx?$/,
            loader: 'babel-loader',
            include: path.resolve(__dirname, 'src'),
            options: {
                presets: ['env','react']
            }
        },
        {
            test: /\.css$/,
            use: [{
                loader: 'style-loader'
            }, {
                loader: 'css-loader',
                options: {
                    modules: {
                        localIdentName: '[name]_[local]_[hash:base64:5]'
                    },
                    importLoaders: 1,
                    localsConvention: 'camelCase'
                }
            }, {
                loader: 'postcss-loader',
                options: {
                    ident: 'postcss',
                    plugins: function () {
                        return [
                            postcssImport,
                            postcssVars
                        ];
                    }
                }
            }]
        },
       {
            test: /\.png$/i,
            loader: 'url-loader'
        },
        {
            test: /\.svg$/,
            loader: 'svg-url-loader'
        }]
    },
    optimization: {
        minimizer: [
            /*new UglifyJsPlugin({
                
            })*/
        ]
    },
  
    
};
