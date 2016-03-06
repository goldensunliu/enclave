var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var settings = require('./settings.js')
var stringSafetyNet = require('./utils').stringSafetyNet
var HotReloader = new webpack.HotModuleReplacementPlugin();

var liveReloadPort
var liveReloadServer

if (JSON.parse(settings.live)) {
  liveReloadPort = 'webpack-dev-server/client?http://localhost:' + settings.port
  liveReloadServer = 'webpack/hot/dev-server'
} else {
  liveReloadPort = null
  liveReloadServer = null
}

var entryArr = [
  liveReloadPort,
  liveReloadServer,
  '../../' + stringSafetyNet(settings.entry, 'src/App.js')
].filter(function(item) {
  return !!item && item
})

console.log('the entryarr is!', entryArr)

var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: '../../' + stringSafetyNet(settings.index, 'index.html'),
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  entry: entryArr,
  output: {
    path: '../../' + stringSafetyNet(settings.output, 'dist'),
    filename: "index_bundle.js"
  },
  module: {
    loaders: [
      {test: /\.js$/, exclude: /node_modules/, loader: "react-hot!babel"}
    ]
  },
  plugins: [HTMLWebpackPluginConfig, HotReloader],
  devServer: {
    contentBase: '../../' + stringSafetyNet(settings.output, 'dist'),
    hot: true,
  }
}
