// 存放公共的校验规则
import { extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// 手机号正则
export const phoneReg =
  /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
//密码正则
export const passwordReg = /^[0-9A-Za-z]{6,18}$/;

extend('phoneRequired', {
  ...required,
  message: '请输入手机号',
});
// 校验手机号是否符合规范
extend('phone', {
  validate: (val) => {
    return phoneReg.test(val);
  },
  message: '请输入正确的手机号',
});

// 登录密码
extend('passwordRequired', {
  ...required,
  message: '请输入密码',
});
extend('password', {
  validate: (val) => {
    return passwordReg.test(val);
  },
  message: '请输入正确的密码',
});

// 确认密码
extend('repasswordRequired', {
  ...required,
  message: '请输入确认密码',
});
extend('repassword', {
  validate: (val, pw) => {
    return pw.password === val; // 判断跟密码是否相同
  },
  message: '两次输入的密码不一致',
  params: ['password'], // 生民接受参数
});
