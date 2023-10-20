// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  lintOnSave:false,
  css: {
    loaderOptions: {
      postcss: {
        postcssOptions:{
          plugins: [
            //
            require('postcss-pxtorem')({//这里是配置项，详见官方文档
              rootValue: 37.5, // 换算的基数
              selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
              propList: ['*'],
            }),
          ]
        }
      }
  }
  },
};
