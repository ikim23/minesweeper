const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'src', 'index.ts'),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              happyPackMode: true,
            },
          },
        ],
      },
    ],
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'static/bundle.js',
  },
  plugins: [
    new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([
      'index.html',
      { from: 'public', to: 'public' },
    ]),
    new LodashModuleReplacementPlugin(),
    new UglifyJsPlugin(),
    new ForkTsCheckerWebpackPlugin({
      tslint: false,
      checkSyntacticErrors: false,
    }),
  ]
};
