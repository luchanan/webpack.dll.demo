const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')
const dllPath = 'static/js/vendor' // 保存目录
module.exports = {
  configureWebpack: config => {
    config.plugins.push(
      new CopyWebpackPlugin([{ from: 'static/', to: 'static' }]),
      new webpack.DllReferencePlugin({
        context: process.cwd(),
        manifest: require(`./${dllPath}/libs-manifest.json`)
      }),
      // new HtmlWebpackPlugin(), // don't use it
      new AddAssetHtmlPlugin({
        publicPath: `${config.output.publicPath}${dllPath}`,
        outputPath: `${config.output.publicPath}${dllPath}`,
        filepath: path.resolve(__dirname, `./${dllPath}/*.dll.js`)
      })
    )
  },
  chainWebpack: config => {
    config.plugins.delete('preload')
    config.plugins.delete('prefetch') // 移除 prefetch 插件
    config.plugin('html').tap(([args]) => [Object.assign(args, {
      template: path.resolve('index.html'),
      filename: 'index.html'
    })])
  },
  devServer: {
    open: true
  }
}
