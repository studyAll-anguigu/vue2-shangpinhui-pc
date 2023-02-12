// 订单支付相关的ipa
import request from '@/utils/request';

// 获取交易页信息
export const reqTradeInfo = () => {
  return request({
    method: 'get',
    url: `/order/auth/trade`,
  });
};

// 获取订单列表
export const reqOrderList = (page = 1, limit = 5) => {
  return request({
    method: 'get',
    url: `/order/auth/${page}/${limit}`,
  });
};
