// 订单相关api
import request from '@/utils/request';

// 获取订单列表
export const reqGetOrderList = (page, limit) => {
  return request({
    method: 'get',
    url: `/order/auth/${page}/${limit}`,
  });
};
