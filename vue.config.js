const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://sph-h5-api.atguigu.cn', // 目标服务器地址
        changeOrigin: true, // 允许跨域
        ws: true, //WebSocket
      },
    },
  },
});
