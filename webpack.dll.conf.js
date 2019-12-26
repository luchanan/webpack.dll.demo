const path = require('path')
const webpack = require('webpack')
const FileManagerPlugin = require('filemanager-webpack-plugin')
const dllPath = 'static/js/vendor' // 保存目录
module.exports = {
  entry: {
    // 提取的文件
    libs: ['vue', 'vue-router', 'vuex', 'axios', 'element-ui', 'moment', 'lodash']
  },
  output: {
    path: path.join(__dirname, dllPath),
    filename: '[name].[hash:8].dll.js',
    library: '[name]_[hash]'
  },
  plugins: [
    new FileManagerPlugin({
      onStart: [
        {
          delete: [
            path.join(__dirname, dllPath)
          ]
        }
      ]
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, dllPath, '[name]-manifest.json'),
      name: '[name]_[hash]', // 要与output.library一致
      context: process.cwd()
    })
  ]
}