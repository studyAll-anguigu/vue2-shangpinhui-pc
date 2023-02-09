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

// 注册
export const reqRegister = (phone, password, code) => {
  return request({
    method: 'post',
    url: '/user/passport/register',
    data: {
      phone,
      password,
      code,
    },
  });
};

// 请求验证码
export const reqGetCode = (phone) => {
  return request({
    method: 'get',
    url: `/user/passport/sendCode/${phone}`,
  });
};
