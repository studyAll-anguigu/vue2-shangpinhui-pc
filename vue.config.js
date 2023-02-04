const { defineConfig } = require('@vue/cli-service');
const setupMock = require('./src/mock/index');
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
    // 提供在服务器内部执行所有其他中间件之前执行自定义中间件的能力。 这可以用来定义自定义处理程序
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      // 模块化，给devServer添加路由
      setupMock(devServer.app);
      // 直接写在这里
      // devServer.app.get('/mock/getHomeBanner', function (req, res) {
      //   res.json({
      //     code: 200,
      //     message: '成功',
      //     succuss: true,
      //     data: [
      //       {
      //         id: '1',
      //         imgUrl: '/images/banner1.jpg',
      //       },
      //       {
      //         id: '2',
      //         imgUrl: '/images/banner2.jpg',
      //       },
      //       {
      //         id: '3',
      //         imgUrl: '/images/banner3.jpg',
      //       },
      //       {
      //         id: '4',
      //         imgUrl: '/images/banner4.jpg',
      //       },
      //     ],
      //   });
      // });
    },
  },
});
