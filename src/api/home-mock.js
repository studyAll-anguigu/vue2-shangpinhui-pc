import requestMock from '@/utils/request-mock';

// 获取首页banner图片
export const reqGetHomeBanner = () => {
  return requestMock({
    method: 'get',
    url: '/getHomeBanner',
  });
};
