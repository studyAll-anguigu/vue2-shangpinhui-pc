/**
 * 使用分别导出方式
 * 使用二次封装过的axios ： 因为不每次请求都要做重复的判断处理
 *
 * **/
// 引入二次封装的axios
import request from '@/utils/request';

// 获取首页三级分类
export const repgetBaseCategoryList = () => {
  return request({
    method: 'get',
    url: '/product/getBaseCategoryList', // 因为封装axios时，已经添加了baseURL = '/api'  ,因此这里的地址不需要添加/api
  });
};
