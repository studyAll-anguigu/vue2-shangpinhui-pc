// 订单支付相关的ipa
import request from '@/utils/request';

// 获取交易页信息 (核心订单信息)
export const reqTradeInfo = () => {
  return request({
    method: 'get',
    url: `/order/auth/trade`,
  });
};

// 提交订单
/**
 * tradeNo  交易编号(拼接在路径中)
 * consignee  收件人姓名
 * consigneeTel  收件人电话
 * deliveryAddress  收件地址
 * paymentWay  支付方式 (ONLINE代表在线)
 * orderComment   订单备注
 * orderDetailList   存储多个商品对象的数组
 *
 * **/
export const reqSubmitOrder = ({ tradeNo, ...data }) => {
  return request({
    method: 'post',
    url: `order/auth/submitOrder`,
    params: {
      tradeNo,
    },
    data: data,
  });
};

// 获取订单列表
export const reqOrderList = (page = 1, limit = 5) => {
  return request({
    method: 'get',
    url: `/order/auth/${page}/${limit}`,
  });
};
