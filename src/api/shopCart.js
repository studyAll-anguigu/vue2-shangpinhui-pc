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

// 切换商品选中状态 ，单个商品切换
export const reqUpdateOnecheckCart = (skuId, isChecked) => {
  return request({
    method: 'get',
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  });
};

// 批量选中购物车 /  全选与全不选
// skuIdList  数组  代表修改的商品id列表     请求体参数
// isChecked  要修改的状态   1代表选中  0代表未选中
export const reqBatchCheckCart = (isChecked, skuIdList) => {
  return request({
    method: 'post',
    url: `/cart/batchCheckCart/${isChecked}`,
    data: skuIdList,
  });
};

// 添加到购物车(对已有物品进行数量改动)

export const reqUpdateSkuNum = (skuId, skuNum) => {
  return request({
    method: 'post',
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};
