# day08

## 注册

### 1.倒计时功能

1. 手机号符合规范，才能点击发送验证码按钮（按钮禁用效果）

```html
<button class="getcode" type="button" :disabled="isBtnDisabled">
  获取验证码
</button>
```

```js
computed: {
  // 获取验证码按钮禁用功能
  isBtnDisabled() {
    return !phoneReg.test(this.phone);
  },
},
```

2. 点击按钮，倒计时功能

- 绑定点击事件

```html
<button
  class="getcode"
  type="button"
  :disabled="isBtnDisabled"
  @click="getCode"
>
  获取验证码
</button>
```

- 设置倒计时

```js
data() {
  return {
    time: 61
  }
},
methods: {
  getCode() {
    // 1. 发送请求，获取验证码
    // 2. 倒计时效果 setInterval setTimeout
    this.time--;

    this.timeId = setInterval(() => {
      this.time--;
      if (this.time <= 0) {
        this.time = 61;
        clearInterval(this.timeId);
      }
    }, 1000);
  },
}
```

- 倒计时效果展示

```html
<button
  class="getcode"
  type="button"
  :disabled="isBtnDisabled"
  @click="getCode"
>
  {{ time < 61 ? `还剩${time}s可重新发送` : "获取验证码" }}
</button>
```

- 倒计时期间内，按钮禁用

```js
computed: {
  // 获取验证码按钮禁用功能
  isBtnDisabled() {
    // 3. 倒计时期间内，按钮禁用
    return !phoneReg.test(this.phone) || this.time < 61;
  },
},
```

3. 发送请求，获取验证码

- 定义接口函数

```js
import request from "@/utils/request";

// 获取验证码
export const reqGetCode = (phone) => {
  return request({
    url: `/user/passport/sendCode/${phone}`,
  });
};
```

- 组件引入，发送请求，获取验证码

```js
import { reqGetCode } from "@/api/user";

// 获取验证码
async getCode() {
  // 1. 发送请求，获取验证码
  const code = await reqGetCode(this.phone);
  console.log(code); // 正常验证码是不会响应给前端的。
  // 2. 倒计时效果 setInterval setTimeout
  this.time--;

  this.timeId = setInterval(() => {
    this.time--;
    if (this.time <= 0) {
      this.time = 61;
      clearInterval(this.timeId);
    }
  }, 1000);
},
```

### 2. 完成注册

1. 定义接口函数

```js
// 注册
export const reqRegister = (data) => {
  return request({
    method: "POST",
    url: `/user/passport/register`,
    data,
  });
};
```

2. 发送请求，注册

```js
import { reqGetCode, reqRegister } from "@/api/user";

async submit() {
  // 表单校验成功了
  const { phone, code, password } = this;
  // 注册（注册没有响应）
  await reqRegister({ phone, code, password });
  // 跳转到登录页面
  this.$router.push("/login");
},
```

## 登录

### 1. 表单校验

```js
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "SLogin",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    submit() {},
  },
};
```

```html
<ValidationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(submit)">
    <ValidationProvider
      class="input-text clearFix"
      name="phone"
      rules="phoneRequired|phone"
      v-slot="{ errors }"
      tag="div"
      mode="lazy"
    >
      <span></span>
      <input type="text" placeholder="邮箱/用户名/手机号" v-model="phone" />
      <i style="color: red">{{ errors[0] }}</i>
    </ValidationProvider>
    <ValidationProvider
      class="input-text clearFix"
      name="password"
      rules="passwordRequired|password"
      v-slot="{ errors }"
      tag="div"
      mode="lazy"
    >
      <span class="pwd"></span>
      <input type="text" placeholder="请输入密码" v-model="password" />
      <i style="color: red">{{ errors[0] }}</i>
    </ValidationProvider>
    <button class="btn">登&nbsp;&nbsp;录</button>
  </form>
</ValidationObserver>
```

### 2. 复用表单校验规则

1. 定义复用的表单校验规则

```js
// utils/common-rules.js
import { extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

export const phoneReg =
  /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;

export const passwordReg = /^[0-9A-Za-z_]{6,18}$/;

// 定义表单校验规则
extend("phoneRequired", {
  ...required,
  message: "请输入手机号",
});

extend("phone", {
  validate(val) {
    // val校验表单的表单数据
    // 返回true表单校验通过，返回false表单校验失败
    return phoneReg.test(val);
  },
  message: "手机号不符合规范",
});

extend("passwordRequired", {
  ...required,
  message: "请输入密码",
});

extend("password", {
  validate(val) {
    return passwordReg.test(val);
  },
  message: "密码不符合规范",
});
```

2. 注册组件使用

```js
// 引入就会加载js的所有内容
import { phoneReg } from "@/utils/common-rules";
// 同时需要删除复用的内容
```

3. 登录组件使用

```js
import "@/utils/common-rules";
```

### 3. 完成基本登录

1. 定义接口函数

```js
// 登录
export const reqLogin = (phone, password) => {
  return request({
    method: "POST",
    url: `/user/passport/login`,
    data: {
      phone,
      password,
    },
  });
};
```

2. 发送请求，登录

```js
import { reqLogin } from "@/api/user";

async submit() {
  /*
    {
      name: "13013131313",
      nickName: "13013131313",
      token: "2fda1721c3834bad9282339d3510c7e2" // 代表用户的唯一标识
    }
  */
  const res = await reqLogin(this.phone, this.password);
  console.log(res);
},
```

### 4. 使用 localStorage 存储用户数据

```js
async submit() {
  const user = await reqLogin(this.phone, this.password);
  localStorage.setItem("user", JSON.stringify(user));
},
```

### 5. 使用 vuex 存储用户数据

localStorage 是硬盘存储，所以才能持久化，读写速度比较慢。

而用户数据我们将来需要频繁使用，希望读写速度更快，所以使用 vuex 管理。

1. 定义 vuex 主模块

```js
// store/index.js
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {},
});
```

2. 在 main.js 中应用

```js
import store from "./store";

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
```

3. 定义 vuex 模块，管理用户数据

```js
export default {
  // 开启命名空间，所有vuex模块的内容都是独立，不会互相影响。
  // 不开启命名空间，所有vuex模块的actions/mutations命名空间是共享的
  namespaced: true,
  // 多个模块（至少两个）共享的数据
  // 当前模块管理的状态数据
  state: {},
  // 只读的计算属性数据
  getters: {},
  // 发送请求的操作（负责与后端进行交互）
  actions: {},
  // 直接修改vuex数据方法
  mutations: {},
};
```

4. 汇总 vuex 模块

```js
import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";

Vue.use(Vuex);

export default new Vuex.Store({
  // 汇总模块
  modules: {
    user,
  },
});
```

5. 定义 vuex 模块的细节

```js
import { reqLogin } from "@/api/user";

// 从本地读取数据
const initState = JSON.parse(localStorage.getItem("user")) || {
  token: "",
  nickName: "",
};

export default {
  // 开启命名空间，所有vuex模块的内容都是独立，不会互相影响。
  // 不开启命名空间，所有vuex模块的actions/mutations命名空间是共享的
  namespaced: true,
  // 多个模块（至少两个）共享的数据
  // 当前模块管理的状态数据
  // state: {
  //   // 给数据一个初始化值
  //   token: "",
  //   nickName: "",
  // },
  state: initState,
  // 只读的计算属性数据
  getters: {},
  // 发送请求的操作（负责与后端进行交互）
  actions: {
    // action函数接受两个参数：context, 触发action函数传递参数
    // context当前模块对象（state,getters,dispatch,commit）,
    async login({ commit }, { phone, password }) {
      // 发送请求，获取数据
      const user = await reqLogin(phone, password);
      // 触发mutation函数。将数据传递过去，由mutation函数更新数据
      commit("LOGIN", user);
    },
  },
  // 直接修改vuex数据方法
  mutations: {
    // mutation函数接受两个参数：state, 触发mutation函数传递参数
    // state就是当前模块的state数据
    LOGIN(state, user) {
      // 将数据存储在vuex中了
      state.nickName = user.nickName;
      state.token = user.token;
      // 持久化存储
      localStorage.setItem("user", JSON.stringify(user));
    },
  },
};
```

6. 组件使用

```js
async submit() {
  // 触发user模块的login action函数
  // dispatch函数的返回值，看action函数的返回值
  await this.$store.dispatch("user/login", {
    phone: this.phone,
    password: this.password,
  });
},
```

### 6. 使用用户数据

用户数据主要有两个：nickName（用户名）和 token（用户登录标识）

1. nickName（用户名）在 Header 组件展示

```html
<span v-if="$store.state.user.nickName">
  {{ $store.state.user.nickName }}
  <span>退出登录</span>
</span>
<span v-else>
  请
  <router-link to="/login">登录</router-link> |
  <router-link to="/register">免费注册</router-link>
</span>
```

2. token 在封装 axios 函数（request 函数）中使用

因为将来发送请求的接口大部分都需要携带 token 参数，所以在请求拦截器处理

```js
import store from "@/store";

// 请求拦截器
request.interceptors.request.use(
  // 成功的回调
  (config) => {
    // config 是发送请求的配置项
    // 作用：用来添加公共请求参数
    const token = store.state.user.token;
    if (token) config.headers.token = token;

    // 开始进度条
    NProgress.start();

    // 必须返回配置项
    return config;
  }
  // 失败的回调
  // () => {}
);
```

### 7. 退出登录

1. 定义接口函数

```js
// 登出
export const reqLogout = () => {
  return request({
    url: `/user/passport/logout`,
  });
};
```

2. 定义 vuex 的 action 和 mutation

```js
actions: {
  async logout({ commit }) {
    await reqLogout(); // 发送请求，删除服务器token
    commit("LOGOUT");
  },
},
mutations: {
  LOGOUT(state) {
    // 删除浏览器储存的数据
    state.nickName = "";
    state.token = "";

    localStorage.removeItem("user");
  },
},
```

3. 组件使用

```html
<span @click="$store.dispatch('user/logout')">退出登录</span>
```

## 加入购物车功能

1. 引入静态组件&配置路由

```js
import AddCartSuccess from "@/views/AddCartSuccess";

{
  path: "/addcartsuccess",
  component: AddCartSuccess,
  name: "AddCartSuccess",
},
```

2. 定义接口函数

```js
import request from "@/utils/request";

// 加入购物车
export const reqAddToCart = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};
```

3. 组件点击发送请求

```html
<div class="add" @click="addToCart">
  <a>加入购物车</a>
</div>
```

```js
import { reqAddToCart } from "@/api/shopcart";

// 加入购物车
async addToCart() {
  const skuId = this.skuInfo.id;
  const skuNum = this.skuNum;

  await reqAddToCart(skuId, skuNum);

  this.$router.push({
    name: "AddCartSuccess",
    query: {
      skuId,
      skuNum,
    },
  });
},
```

4. 页面数据展示

```js
import { reqGetGoodsDetail } from "@/api/detail";

export default {
  name: "AddCartSuccess",
  async mounted() {
    const { skuInfo } = await reqGetGoodsDetail(this.$route.query.skuId);
    this.skuName = skuInfo.skuName;
    this.skuDefaultImg = skuInfo.skuDefaultImg;
  },
  data() {
    return {
      skuName: "",
      skuDefaultImg: "",
    };
  },
};
```

```html
<div class="left-good">
  <div class="left-pic">
    <img :src="skuDefaultImg" />
  </div>
  <div class="right-info">
    <p class="title">{{ skuName }}</p>
    <p class="attr">数量：{{ $route.query.skuNum }}</p>
  </div>
</div>
<div class="right-gocart">
  <router-link
    :to="{
      name: 'Detail',
      params: {
        id: $route.query.skuId,
      },
    }"
    class="sui-btn btn-xlarge"
  >
    查看商品详情
  </router-link>
  <router-link to="/shopcart">去购物车结算 > </router-link>
</div>
```

## 购物车功能

### 1. 定义接口函数

```js
import request from "@/utils/request";

// 加入购物车(修改商品数量)
export const reqAddToCart = (skuId, skuNum) => {
  return request({
    method: "POST",
    url: `/cart/addToCart/${skuId}/${skuNum}`,
  });
};

// 获取购物车列表
export const reqGetCartList = () => {
  return request({
    url: `/cart/cartList`,
  });
};

// 单选
export const reqUpdateCartIsChecked = (skuId, isChecked) => {
  return request({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
  });
};

// 单个删除
export const reqDelCart = (skuId) => {
  return request({
    method: "DELETE",
    url: `/cart/deleteCart/${skuId}`,
  });
};

// 全选/全不选
export const reqUpdateAllCartIsChecked = (skuIdList, isChecked) => {
  return request({
    method: "POST",
    url: `/cart/batchCheckCart/${isChecked}`,
    data: skuIdList,
  });
};

// 批量删除
export const reqDelAllCart = (skuIdList) => {
  return request({
    method: "POST",
    url: `/cart/batchDeleteCart`,
    data: skuIdList,
  });
};
```
