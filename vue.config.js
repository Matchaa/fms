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
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        components: path.join(__dirname, 'src/components'),
        views: path.join(__dirname, 'src/views')
      }
    }
  },
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(path.resolve(__dirname, 'src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  }
}
