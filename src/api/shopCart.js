import request from '@/utils/request';

// 购物车相关

// 添加到购物车
export const addToCart = (skuId, skuNum) => {
  return request({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};

// 获取购物车列表
export const reqGetCartList = () => {
  return request({
    method: 'get',
    url: '/cart/cartList',
  });
};
