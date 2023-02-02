import axios from 'axios';
// 使用分别导出方式

// 获取首页三级分类
export const repgetBaseCategoryList = () => {
  return axios({
    method: 'get',
    url: '/api/product/getBaseCategoryList',
  });
};
