var webpack = require('webpack');
var path = require('path');
var env = require('yargs').argv.mode;

var externals = [{
  "knex": "knex",
  "bluebird": {
    root: "Promise",
    commonjs2: "bluebird",
    commonjs: "bluebird",
    amd: "bluebird"
  },
  "lodash": {
    root: "_",
    commonjs2: "lodash",
    commonjs: "lodash",
    amd: "lodash"
  }
}]

var config = {
  entry: __dirname + '/src/vivid.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: 'vivid.js',
    library: 'vivid',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /(\.js)$/,
        loader: 'babel',
        exclude: /(node_modules)/
      },
      {
        test: /(\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js']
  },
  externals: externals
};

module.exports = config;
