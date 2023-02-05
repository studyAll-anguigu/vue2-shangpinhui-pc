import requestMock from '@/utils/request-mock';

// 获取首页banner图片
export const reqGetHomeBanner = () => {
  return requestMock({
    method: 'get',
    url: '/getHomeBanner',
  });
};

/***
 * 注意：
 *  这里的请求函数和url时我们临时模拟，等真正后端接口开发好之后，
 *  我们需要把请求函数换成我们封装好的request函数，
 *  url要换成真实的接口地址。
 *
 * **/
