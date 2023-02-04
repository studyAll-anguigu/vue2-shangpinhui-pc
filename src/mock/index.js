/**
 * 总结：
 * 这个mock文件下面的数据都是用来模拟数据的，不是真正使用到的数据。
 *
 * 1、为什么需要这个模拟数据？
 *    主要是可能会遇到，后端还没有开发好，而前端有需要数据支撑来实现我们功能的开发。
 *    因此我们就需要自己去模拟一些数据辅助我们开发。
 *
 * 2、如何实现模拟数据？
 *    根目新建mock文件夹，并最好根据数据类别分不同模块存放早/mock/modles文件夹下，最后在
 *    mock/index.js文件合并mock/models/下的导出的所有模块
 *
 * **/

// 因为mock下的内容是在node中运行的，还是使用commondjs的规范
const homeMock = require('./models/home.js');
const testMock = require('./models/test.js');

// 合并所有模块
const modules = [...homeMock, ...testMock];

/**
 * 遍历modles，将里面的每一项都编程一个一个后端接口
 * app在调用setupMock时传进来。app就是 vue.config.js文件中 devServer.app
 *
 * app.get("/mock/getHomeBanners", (req, res) => {
 *      res.json(response)
 * })
 * **/

const setupMock = (app) => {
  modules.forEach((modle) => {
    // app[modle.method.toLowerCase()]  :  对象添加属性的写法，因为属性是变量，因此只能使用【】的形式。
    app[modle.method.toLowerCase()](modle.url, (req, res) => {
      res.json(modle.response);
    });
  });
};

module.exports = setupMock;
