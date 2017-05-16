const mode = process.env.NODE_ENV || 'development';

const path = require("path");
const webpack = require("webpack");

const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');


module.exports = {
    entry: {
        app: "./src/main.ts",
        polyfill: "./src/polyfill.ts",
        vendor: "./src/vendor.ts"
    },
    output: {
        filename: "./app/static/js/[name].js"
    },
    watch: true,
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              options: {
                configFileName: 'tsconfig.webpack.json'
              }
            }
          ],
          exclude: [/\.(spec|e2e)\.ts$/, 'node_modules']
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      ],

    },
    plugins: [
        new webpack.ContextReplacementPlugin(
          /angular(\\|\/)core(\\|\/)@angular/,
          path.resolve(__dirname, '../src')
        )
    ],
    resolve: {
        extensions: ['.js', '.ts']
    }
}
