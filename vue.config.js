module.exports = {
  devServer: {
    overlay: { // 让我们的浏览器关闭掉遮盖层的错误代码提示
      warning: false,
      errors: false
    },
    proxy: {
      // '/api': {
      //     target: 'https://mall.sogou.com',
      //     changeOrigin:true
      // },
      '/info': {
        target: 'http://47.105.51.234:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/info': ''
        }
      },
      // "/ajax": {
      //     target: 'https://mall.sogou.com',
      //     changeOrigin:true,
      //     pathRewrite: {
      //         "^/ajax":''
      //     }
      // },
        "/ajax": {
          target: 'http://open.api.tianyancha.com/services/open/mr/abnormal/2.0',
          changeOrigin:true,
          pathRewrite: {
              "^/ajax":''
          }
      },
    }
  },
  lintOnSave: false, // 直接关闭eslint检查
  configureWebpack: {
    resolve: {
      alias: {
        assets: '@/assets',
        con: '@/components', // src/components ==>@components ==> con
        views: '@/views'
      }
    }
  }
}
