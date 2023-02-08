<template>
  <div class="register-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>
        注册新用户
        <span class="go"
          >我有账号，去 <a href="login.html" target="_blank">登录</a>
        </span>
      </h3>
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(onSubmit)">
          <ValidationProvider
            name="phone"
            rules="phoneRequired|phone"
            v-slot="{ errors }"
            tag="div"
            mode="lazy"
            class="content"
          >
            <label>手机号:</label>
            <input type="text" placeholder="请输入你的手机号" v-model="phone" />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            name="code"
            rules="codeRequired|code"
            v-slot="{ errors }"
            tag="div"
            class="content"
            mode="lazy"
          >
            <label>验证码:</label>
            <input type="text" placeholder="请输入验证码" v-model="code" />
            <button class="getcode">获取验证码</button>
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            name="password"
            rules="passwordRequired|password"
            v-slot="{ errors }"
            tag="div"
            class="content"
            mode="lazy"
          >
            <label>登录密码:</label>
            <input
              type="text"
              placeholder="请输入你的登录密码"
              v-model="password"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            name="repassword"
            :rules="`repasswordRequired|repassword:${password}`"
            v-slot="{ errors }"
            tag="div"
            class="content"
            mode="lazy"
          >
            <label>确认密码:</label>
            <input
              type="text"
              placeholder="请输入确认密码"
              v-model="repassword"
            />
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <ValidationProvider
            class="controls"
            name="isAgree"
            rules="isAgree"
            v-slot="{ errors }"
            tag="div"
            mode="lazy"
          >
            <input name="m1" type="checkbox" v-model="isAgree" />
            <span>同意协议并注册《尚品汇用户协议》</span>
            <span class="error-msg">{{ errors[0] }}</span>
          </ValidationProvider>
          <div class="btn">
            <button>完成注册</button>
          </div>
        </form>
      </ValidationObserver>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>尚品汇社区</li>
      </ul>
      <div class="address">地址：北京市昌平区宏福科技园综合楼6层</div>
      <div class="beian">京ICP备19006430号</div>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';
import { required } from 'vee-validate/dist/rules';

// 校验phone是否有值
// 写法一： 不要修改默认的错误提示文本
// extend('email', email);

// 写法2： 修改默认提示的文本值
extend('phoneRequired', {
  ...required,
  message: '请输入手机号',
});
// 校验手机号是否符合规范
extend('phone', {
  validate: (val) => {
    const phoneReg =
      /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;
    return phoneReg.test(val);
  },
  message: '请输入正确的手机号',
});

// 验证码
extend('codeRequired', {
  ...required,
  message: '请输入验证码',
});
extend('code', {
  validate: (val) => {
    const codeReg = /^[0-9]{6}$/;
    return codeReg.test(val);
  },
  message: '请输入正确的验证码',
});

// 登录密码
extend('passwordRequired', {
  ...required,
  message: '请输入密码',
});
extend('password', {
  validate: (val) => {
    const reg = /^[0-9A-Za-z]{6,18}$/;
    return reg.test(val);
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

// 勾选协议
extend('isAgree', {
  validate: (val) => {
    return val === true;
  },
  message: '请勾选同意协议',
});

export default {
  name: 'XRegister',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      phone: '',
      code: '',
      password: '',
      repassword: '',
      isAgree: false,
    };
  },
  methods: {
    onSubmit() {
      alert('Form has been submitted!');
    },
  },
};
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    height: 445px;
    border: 1px solid rgb(223, 223, 223);
    margin: 0 auto;

    h3 {
      background: #ececec;
      margin: 0;
      padding: 6px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 20.04px;
      line-height: 30.06px;

      span {
        font-size: 14px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 14px;
        width: 96px;
        text-align: right;
        display: inline-block;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }

    .getcode {
      height: 38px;
      margin-left: 10px;
      padding: 5px;
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #e4e4e4;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }
}
</style>
