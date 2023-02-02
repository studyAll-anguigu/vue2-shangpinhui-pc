/*
  封装axios函数：
    1. 成功就是成功，失败就是失败（请求失败、功能失败）
    2. 成功得到成功的数据，失败自动提示失败原因
    3. 复用请求地址 /api, 添加公共请求参数
    4. 失败提示的错误信息更准确
    5. 请求添加进度条提示

    拓展：
      请求失败
        error.message 失败原因
          请求超时：timeout of 10ms exceeded
          断网了：Network Error
        error.response.status 响应状态码

        error.response 有值，说明服务器有响应，响应结果是失败的
        error.response 没有值，说明请求在客户端就中断了（服务器没有返回响应），结果失败
   

*/
import axios from 'axios';
// 引入进度条
import NProgress from 'nprogress';
// 关闭进度条加载圈
NProgress.configure({ showSpinner: false });

const request = axios.create({
  baseURL: '/api', //`baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
  headers: {}, // 自定义请求头
  timeout: 20000, // 默认值是 `0` (永不超时)
});

const errObj = {
  401: '未授权',
  403: '禁止访问',
  404: '您找的资源不存在',
  407: '登录过期',
  500: '服务器错误',
};

// 请求拦截器
request.interceptors.request.use(
  // 第一个参数：请求成功时的处理回调。
  // 参数： config，就是请求配置
  (config) => {
    // console.log('config:', config);
    NProgress.start(); // 开始进度条
    return config; // 必须返回config
  },
  // 第二个参数：请求失败时的处理回调： 这里的错误处理永远不会被调用，因为axios底层中，不会执行这里的代码
  () => {}
);

// 响应拦截器
request.interceptors.response.use(
  //第1个参数：响应成功时的处理 。  2xx 范围内的状态码都会触发该函数。
  // 只有功能状态code=200时，才返回成功的状态，否则就返回失败的状态
  (response) => {
    // console.log('respone:', response);
    NProgress.done(); // 结束进度条
    if (response.data.code === 200) {
      return response.data.data;
    } else {
      return Promise.reject(response.data.message);
    }
  },

  //第2个参数： 响应失败时的处理。 超出 2xx 范围的状态码都会触发该函数 ，需要返回一个失败的promise实例
  (error) => {
    NProgress.done(); // 结束进度条
    let errorMessage = '未知错误，请联系管理员处理';
    if (error.response) {
      errorMessage = errObj[error.response.status];
    } else {
      if (error.message.indexOf('timeout') > -1) {
        errorMessage = '网络不稳定，请切换其他网络或稍等一会再发送';
      }
      if (error.message.indexOf('Network') > -1) {
        errorMessage = '没有检测到网络，请连接网络';
      }
    }
    alert(errorMessage);
  }
);

export default request;
