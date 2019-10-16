const path = require('path')

module.exports = {
  // pages: {
  //   index: {
  //     // page的入口
  //     entry: app.entry,
  //     // 模板来源
  //     template: 'public/index.html',
  //     // 在 dist/index.html 的输出
  //     filename: 'index.html',
  //     chunks: ['chunk-vendors', 'chunk-common', 'index']
  //   }
  // },
  devServer: {
    port: 8080
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        views: path.join(__dirname, 'src/views')
      }
    }
  }
}
