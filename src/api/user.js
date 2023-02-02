import request from '@/utils/request';

// 用户登录
export const reqUserLogin = (phone, password) => {
  return request({
    method: 'post',
    url: '/user/passport/login',
    data: {
      phone,
      password,
    },
  });
};
