const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    entry: {
        main: './src/main',
    },
    output: {
        path: path.join(__dirname, '../dist')
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                postcss: [require('autoprefixer')({ browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] })],
                loaders: {
                    less: ExtractTextPlugin.extract({
                        use: ['css-loader?minimize', { loader: 'postcss-loader', options: { sourceMap: true } }, 'less-loader'],
                        fallback: "style-loader"
                    }),
                    css: ExtractTextPlugin.extract({
                        use: ['css-loader', { loader: 'postcss-loader', options: { sourceMap: true } }],
                        fallback: "style-loader"
                    })
                }
            }
        },
        // {
        //     test: /iview\/.*?js$/,
        //     loader: 'babel-loader'
        // },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [
                path.join(__dirname, '../src'), 
                path.join(__dirname, '../node_modules/ripples-core'), 
                path.join(__dirname, '../node_modules/ripples-psc'),
                path.join(__dirname, '../node_modules/ems-accounting'),
            ]
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader?minimize', { loader: 'postcss-loader', options: { sourceMap: true } }],
                fallback: 'style-loader'
            })
        },

        {
            test: /\.less/,
            use: ExtractTextPlugin.extract({
                use: [{ loader: 'postcss-loader', options: { sourceMap: true } }, 'less-loader'],
                fallback: 'style-loader'
            })
        },

        {
            test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=1024'
        },
        {
            test: /\.(html|tpl)$/,
            loader: 'html-loader'
        }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
            '@': resolve('../src'),
        }
    }
};