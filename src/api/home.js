/**
 * 使用分别导出方式
 * 使用二次封装过的axios ： 因为不每次请求都要做重复的判断处理
 *
 * **/
// 引入二次封装的axios
import request from '@/utils/request';
import requestMock from '@/utils/request-mock';

// 获取首页三级分类
export const repgetBaseCategoryList = () => {
  return request({
    method: 'get',
    url: '/product/getBaseCategoryList', // 因为封装axios时，已经添加了baseURL = '/api'  ,因此这里的地址不需要添加/api
  });
};

/***
 * 注意：
 *  这里的请求函数和url时我们临时模拟，等真正后端接口开发好之后，
 *  我们需要把请求函数换成我们封装好的request函数，
 *  url要换成真实的接口地址。
 *
 * **/

// 获取首页banner图片
export const reqGetHomeBanner = () => {
  return requestMock({
    method: 'get',
    url: '/getHomeBanner',
  });
};

// 获取home页面的floors楼层的数据
export const reqGetHomeFloors = () => {
  return requestMock({
    method: 'get',
    url: '/getHomeFloors',
  });
};
