<template>
  <div class="login-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <div class="content">
            <ValidationObserver v-slot="{ handleSubmit }">
              <form
                @submit.prevent="
                  {
                    handleSubmit(login);
                  }
                "
              >
                <ValidationProvider
                  class="input-text clearFix"
                  name="phone"
                  tag="div"
                  mode="lazy"
                  rules="phoneRequired|phone"
                  v-slot="{ errors }"
                >
                  <span></span>
                  <input
                    type="text"
                    placeholder="邮箱/用户名/手机号"
                    v-model="phone"
                  />
                  <i style="color: red">{{ errors[0] }}</i>
                </ValidationProvider>
                <ValidationProvider
                  class="input-text clearFix"
                  name="password"
                  tag="div"
                  mode="lazy"
                  rules="passwordRequired|password"
                  v-slot="{ errors }"
                >
                  <span class="pwd"></span>
                  <input
                    type="text"
                    placeholder="请输入密码"
                    v-model="password"
                  />
                  <i style="color: red">{{ errors[0] }}</i>
                </ValidationProvider>
                <button class="btn">登&nbsp;&nbsp;录</button>
              </form>
            </ValidationObserver>
            <div class="call clearFix">
              <router-link class="register" to="/register"
                >立即注册</router-link
              >
            </div>
          </div>
        </div>
      </div>
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
import { ValidationObserver, ValidationProvider } from 'vee-validate';
// import { reqUserLogin } from '@/api/user';
// 引入相关的校验规则
import '@/utils/commonRules';

export default {
  name: 'XLogin',
  components: { ValidationObserver, ValidationProvider },
  data() {
    return {
      phone: '13713504691',
      password: '123456',
    };
  },
  methods: {
    async login() {
      // 因为user模块的，调用其他模块的action，前面需要加模块名
      // 按规范写，一般遵守一个原则就是，数据在哪里，就在哪里修改。
      // 所以修改vuex数据，就去到vuex修改。
      await this.$store.dispatch('user/login', {
        phone: this.phone,
        password: this.password,
      });
      this.$router.push({
        name: 'Home',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    background-color: #e93854;

    .login {
      width: 1200px;
      height: 487px;
      margin: 0 auto;
      background: url(./images/loginbg.png) no-repeat;
    }

    .loginform {
      width: 420px;
      height: 306px;
      box-sizing: border-box;
      background: #fff;
      float: right;
      top: 45px;
      position: relative;
      padding: 20px;

      .tab {
        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #ddd;
            box-sizing: border-box;
            text-decoration: none;
          }

          .current {
            border-bottom: none;
            border-top-color: #28a3ef;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 380px;
        height: 316px;
        box-sizing: border-box;
        border-top: none;
        padding: 18px;

        form {
          margin: 15px 0 18px 0;
          font-size: 12px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(./images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 302px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              padding-top: 6px;
              padding-bottom: 6px;
              font-size: 14px;
              line-height: 22px;
              padding-right: 8px;
              padding-left: 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              float: left;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #e1251b;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }
      }
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
