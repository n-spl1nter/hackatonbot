const path = require('path');
const nodeExternals = require('webpack-node-externals')

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';

const config = {
  mode,

  target: 'node',

  entry: {
    server: [path.resolve(__dirname, 'src', 'index')],
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: '[name].js',
  },

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env'],
        }
      }
    ]
  },

};


module.exports = config;
