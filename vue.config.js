module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        'views': '@/views',
        'components': '@/components',
        'assets': '@/assets',
        'router': '@/router',
        'api': '@/api',
        'utls': '@/utls'
      }
    },
  },



  // 代理服务器
  devServer: {
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn",
      },
    }
  }

}