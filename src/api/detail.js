// 商品详情相关的数据
import request from '@/utils/request';

// 获取商品详情信息
export const reqGetGoodsDetail = (skuId) => {
  return request({
    method: 'get',
    url: `/item/${skuId}`,
  });
};
