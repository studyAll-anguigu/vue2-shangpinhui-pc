import request from '@/utils/request';

// 购物车相关

// 添加到购物车
export const addToCart = (skuId, skuNum) => {
  return request({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};
