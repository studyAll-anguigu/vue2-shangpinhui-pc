import request from '@/utils/request';

// 获取搜索商品列表
export const reqGetSearchGoodsList = (params) => {
  return request({
    method: 'post',
    url: '/list',
    data: {
      ...params,
    },
  });
};
