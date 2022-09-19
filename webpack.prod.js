const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const ESLintPlugin = require('eslint-webpack-plugin');


module.exports = {
  mode: 'production',
  // 1
  // Use the src/index.js file as entry point to bundle it.
  // If the src/index.js file imports other JS files,
  // bundle them as well
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    homepage: path.resolve(__dirname, './src/homepage/homepage.js'),
    dogBreeds: path.resolve(__dirname, './src/dogBreeds/dogBreeds.js'),
    favorites: path.resolve(__dirname, './src/favorites/favorites.js'),
  },
  // 2
  // The bundles source code files shall result in a bundle.js file
  // in the /dist folder
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  // 3
  // The /dist folder will be used to serve our application
  // to the browser
  devServer: {
    static: path.resolve(__dirname, './dist'),
  },
  // 4
  // Add plugins for webpack here
  plugins: [
    new ESLintPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: "Dog Breeds",
      template: path.resolve(__dirname, './src/index.html'),
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'homepage.html',
      title: "Homepage",
      template: path.resolve(__dirname, './src/homepage/homepage.html'),
      chunks: ['homepage'],
    }),
    new HtmlWebpackPlugin({
      filename: 'dogBreeds.html',
      title: "Dog Breeds",
      template: path.resolve(__dirname, './src/dogBreeds/dogBreeds.html'),
      chunks: ['dogBreeds'],
    }),
    new HtmlWebpackPlugin({
      filename: 'favorites.html',
      title: "Favorites",
      template: path.resolve(__dirname, './src/favorites/favorites.html'),
      chunks: ['favorites'],
    })
  ],
    // 5 
  // Integrate Babel in the build process
  // Define which files to use the loader
  module: {
    // configuration regarding modules
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/, // files to exclude
        use: ['babel-loader']
      },
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    // options for resolving module requests
    extensions: ['*', '.js']  // files to load
  }
};