# day10

## Dialog 禁用滚动条

```js
watch: {
  visible: {
    handler(newVal) {
      if (newVal) {
        // 禁用滚动条
        document.documentElement.style.overflow = "hidden";
        return;
      }
      // 不禁用
      document.documentElement.style.overflow = "auto";
    },
    immediate: true,
  },
},
beforeDestroy() {
  document.documentElement.style.overflow = "auto";
},
```

## 支付功能

### 1. 获取&展示支付二维码

1. 定义接口函数

```js
// 获取支付二维码
export const reqGetPayQRCode = (orderId) => {
  return request({
    url: `/payment/weixin/createNative/${orderId}`,
  });
};
```

2. 点击立即支付获取支付地址

```html
<a class="btn" @click="pay">立即支付</a>
```

```js
methods: {
  async pay() {
    this.visible = true;

    const orderId = this.$route.query.orderId;

    // 获取支付地址（微信）
    const res = await reqGetPayQRCode(orderId);
    console.log(res);
  },
},
```

3. 下载包

```
npm i qrcode
```

4. 将支付地址转化为二维码

```js
import QRCode from "qrcode";

data() {
  return {
    codeUrl: ""
  }
},
methods: {
  async pay() {
    this.visible = true;

    const orderId = this.$route.query.orderId;

    // 获取支付地址（微信）
    const res = await reqGetPayQRCode(orderId);

    // 将支付地址转化成二维码图片
    const codeUrl = await QRCode.toDataURL(res.codeUrl);

    this.codeUrl = codeUrl;
  },
}
```

5. 二维码展示

```html
<dialog title="微信支付" :visible.sync="visible" width="30%">
  <!-- 默认插槽：在中间内容区展示 -->
  <img :src="codeUrl" alt="支付二维码" />
  <!-- 具名插槽：在底部展示 -->
  <!-- <template v-slot:footer> -->
  <template #footer>
    <div>
      <button>支付遇到问题</button>
      <button>已完成支付</button>
    </div>
  </template>
</dialog>
```

### 2. 支付成功自动跳转到支付成功页面

当使用微信扫码支付成功时，微信服务器会通知目标服务器支付结果，但是客户端不知道。

而 HTTP 协议不允许服务器向客户端发送请求。

解决：使用 ajax 轮询。客户端不断向服务器发送请求，查询订单的支付状态，一旦成功就跳转走。

1. 定义接口函数

```js
// 查询订单支付状态
export const reqQueryPayStatus = (orderId) => {
  return request({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
  });
};
```

2. 设置定时器

```js
methods: {
  async pay() {
    this.visible = true;

    const orderId = this.$route.query.orderId;

    // 获取支付地址（微信）
    const res = await reqGetPayQRCode(orderId);

    // 将支付地址转化成二维码图片
    const codeUrl = await QRCode.toDataURL(res.codeUrl);

    this.codeUrl = codeUrl;

    // 清除之前的定时器
    clearInterval(this.timeId);
    // 开启新的定时器
    this.timeId = setInterval(async () => {
      await reqQueryPayStatus(orderId);
      // 支付成功了
      this.$router.push("/paysuccess");
    }, 10000);
  },
},
```

3. 卸载前清除定时器

```js
beforeDestroy() {
  clearInterval(this.timeId);
},
```

## 项目优化

### 1. 路由懒加载

```js
// 将所有组件都打包到一个js文件中
// import Home from "@/views/Home";
// import Search from "@/views/Search";
// import Login from "@/views/Login";
// import Register from "@/views/Register";
// import Detail from "@/views/Detail";
// import AddCartSuccess from "@/views/AddCartSuccess";
// import ShopCart from "@/views/ShopCart";
// import Trade from "@/views/Trade";
// import Pay from "@/views/Pay";
// import PaySuccess from "@/views/PaySuccess";
// import Center from "@/views/Center";

/*
  路由懒加载
    功能：需要使用哪个组件，才会加载哪个组件
    实现：
      1. 将路由组件单独打包成一个js文件
      2. 按需加载：需要使用哪个组件，才会加载哪个组件
*/

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home');
const Search = () => import(/* webpackChunkName: "Search" */ '@/views/Search');
const Login = () => import(/* webpackChunkName: "Login" */ '@/views/Login');
const Register = () =>
  import(/* webpackChunkName: "Register" */ '@/views/Register');
const Detail = () => import(/* webpackChunkName: "Detail" */ '@/views/Detail');
const AddCartSuccess = () =>
  import(/* webpackChunkName: "AddCartSuccess" */ '@/views/AddCartSuccess');
const ShopCart = () =>
  import(/* webpackChunkName: "ShopCart" */ '@/views/ShopCart');
const Trade = () => import(/* webpackChunkName: "Trade" */ '@/views/Trade');
const Pay = () => import(/* webpackChunkName: "Pay" */ '@/views/Pay');
const PaySuccess = () =>
  import(/* webpackChunkName: "PaySuccess" */ '@/views/PaySuccess');
const Center = () => import(/* webpackChunkName: "Center" */ '@/views/Center');
```

### 2. 图片懒加载

1. 下载

```
npm i vue-lazyload@1
```

2. 引入&安装

```js
import VueLazyload from 'vue-lazyload';

// 安装插件就会全局注册指令v-lazy
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 需要准备两个图片
  error: '/images/error.jpg',
  loading: '/images/loading.jpeg',
  attempt: 1,
});
```

3. 使用

```html
<img v-lazy="xxx" />
```

## 我的订单

1. Header 路由跳转

```html
<router-link class="header__top-nav-item" to="/center"> 我的订单 </router-link>
```

2. 定义接口函数

```js
import request from '@/utils/request';

// 获取订单列表
export const reqGetOrderList = (page, limit) => {
  return request({
    url: `/order/auth/${page}/${limit}`,
  });
};
```

3. 组件发送请求，更新数据

```js
import { reqGetOrderList } from "@/api/order";

async mounted() {
  const res = await reqGetOrderList(this.currentPage, this.pageSize);
  this.total = res.total;
  this.orderList = res.records;
},
data() {
  return {
    currentPage: 1,
    pageSize: 5,
    total: 0,
    orderList: [],
  };
},
```

4. 数据动态展示

```html
<table class="order-item" v-for="order in orderList" :key="order.id">
  <thead>
    <tr>
      <th colspan="5">
        <span class="ordertitle">
          {{ order.createTime }} 订单编号： {{ order.outTradeNo }}
          <span class="pull-right delete">
            <img src="./images/delete.png" />
          </span>
        </span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(goods, index) in order.orderDetailList" :key="goods.id">
      <!-- 展示商品详情，可能有多个 -->
      <td width="60%">
        <div class="typographic">
          <img v-lazy="goods.imgUrl" style="width: 100px; height: 100px" />
          <a class="block-text">{{ goods.skuName }}</a>
          <span>x {{ goods.skuNum }}</span>
          <a href="#" class="service">售后申请</a>
        </div>
      </td>
      <!-- 只需要展示一个 -->
      <template v-if="index === 0">
        <td :rowspan="order.orderDetailList.length" width="8%" class="center">
          {{ order.consignee }}
        </td>
        <td :rowspan="order.orderDetailList.length" width="13%" class="center">
          <ul class="unstyled">
            <li>总金额¥{{ order.totalAmount }}</li>
            <li>在线支付</li>
          </ul>
        </td>
        <td :rowspan="order.orderDetailList.length" width="8%" class="center">
          <a href="#" class="btn"> {{ order.orderStatusName }} </a>
        </td>
        <td :rowspan="order.orderDetailList.length" width="13%" class="center">
          <ul class="unstyled">
            <li>
              <a href="mycomment.html" target="_blank">评价|晒单</a>
            </li>
          </ul>
        </td>
      </template>
    </tr>
  </tbody>
</table>
```

5. 引入&使用分页器

```js
import Pagination from "@/components/Pagination";

components: {
  Pagination,
},
```

```html
<Pagination
  :current-page="currentPage"
  :pageSize="pageSize"
  :total="total"
  @current-change="handleCurrentChange"
  @size-change="handleSizeChange"
/>
```

6. 完成分页查询

```js
mounted() {
  this.getOrderList();
},
methods: {
  async getOrderList() {
    const res = await reqGetOrderList(this.currentPage, this.pageSize);
    this.total = res.total;
    this.orderList = res.records;
  },
  handleCurrentChange(currentPage) {
    this.currentPage = currentPage;
    this.getOrderList();
  },
  handleSizeChange(pageSize) {
    this.pageSize = pageSize;
    this.getOrderList();
  },
},
```

## 登录鉴权

需求：

1. 登录了才能访问购物车、支付、我的订单等页面
2. 其他页面有没有登录都能访问

### 1. 添加全局路由导航守卫

有很多页面都需要登录鉴权，为了复用，在路由导航守卫中完成。

```js
const router = new VueRouter({
  // ...
});

router.beforeEach((to, from, next) => {});

export default router;
```

### 2. 完成基本功能

```js
// 需要登录才能访问的路由名称数组
const auth_list = [
  'AddCartSuccess',
  'ShopCart',
  'Trade',
  'Pay',
  'PaySuccess',
  'Center',
];

// 全局路由前置守卫：每次路由跳转都会触发
router.beforeEach((to, from, next) => {
  /*
    假设 /home 跳转到 /search
      to 代表 /search（要去路由对象 / route对象）
      from 代表 /home（从哪来的路由对象）
      next 是一个函数，必须要调用
        next() 放行，路由就会跳转到to路由对应的地址
        next('/home') / next({ name: 'Home' }) 路由跳转到其他地址

    需求：
      没有登录，不能访问购物车、支付、我的订单等页面，去登录页面先登录
  */
  if (auth_list.includes(to.name)) {
    // 在，看是否登录
    if (store.state.user.token) {
      next();
    } else {
      next({
        name: 'Login',
      });
    }
  } else {
    // 不在
    next();
  }
});
```

### 3. 登出时页面刷新

```html
<span @click="logout">退出登录</span>
```

```js
async logout() {
  await this.$store.dispatch("user/logout");
  // 刷新页面
  window.location.reload();
},
```

### 4. 加入购物车时，也要鉴权

```js
// 加入购物车
async addToCart() {
  if (!this.$store.state.user.token) {
    this.$router.push({
      name: "Login",
    });
    return;
  }
  // ...
}
```

### 5. 跳转到登陆页面时，一旦登录成功，跳转回之前想要访问的页面

1. 跳转到登陆页面时，添加 redirect 参数

```js
// 加入购物车
async addToCart() {
  if (!this.$store.state.user.token) {
    this.$router.push({
      name: "Login",
      query: {
        redirect: this.$route.path,
      },
    });
    return;
  }
  // ...
}
```

```js
// 全局路由前置守卫：每次路由跳转都会触发
router.beforeEach((to, from, next) => {
  if (auth_list.includes(to.name)) {
    if (store.state.user.token) {
      next();
    } else {
      next({
        name: 'Login',
        // 携带参数
        query: {
          redirect: to.path,
        },
      });
    }
  } else {
    next();
  }
});
```

2. 登录成功跳转到 redirect 地址

```js
async submit() {
  await this.$store.dispatch("user/login", {
    phone: this.phone,
    password: this.password,
  });

  this.$router.replace(this.$route.query.redirect || "/home");
},
```

## ES6 模块化语法

### 1. 引入 import

1. `import xxx from 'xxx'` ：引入暴露 default 属性上的内容 。整体是一个对象，对象里面有 default 属性。暴露的内容就在 default 属性。

2. `import { xxx } from 'xxx'` ：引入暴露对象上的 xxx 内容。整体是一个对象，所有的暴露内容都在对象里面。

3. `import * as xxx from 'xxx'` ：引入暴露的所有内容 。体是一个对象，所有的暴露内容都在对象里面。

### 2. 暴露 export

1. 默认暴露

暴露 default 属性，属性的值就是真正暴露的内容

2. 分别暴露

直接在对象暴露内容

3. 统一暴露

直接在对象暴露内容

### 3. 结论：

1. 如果模块采用默认暴露：`import xxx from 'xxx'`

2. 如果模块采用分别/统一暴露：

- 如果需要引入模块部分内容：`import { xxx } from 'xxx'`
- 如果需要引入模块全部内容：`import * as xxx from 'xxx'`

## 汇总 API 接口

1. 汇总

```js
// 负责汇总所有api接口函数
// import * as home from "./home";
// import * as detail from "./detail";
// import * as order from "./order";
// import * as pay from "./pay";
// import * as search from "./search";
// import * as shopcart from "./shopcart";
// import * as user from "./user";

// export { home, detail, order, pay, search, shopcart, user };

// 引入home模块暴露的所有内容命名为home，将其分别暴露出去
export * as home from './home';
export * as detail from './detail';
export * as order from './order';
export * as pay from './pay';
export * as search from './search';
export * as shopcart from './shopcart';
export * as user from './user';
```

2. 在 Vue 的原型对象上添加属性（为了让所有组件都能访问）

```js
import * as api from './api';
Vue.prototype.$api = api;
```

3. 组件使用

```js
// 不需要引入了
// import { reqGetOrderList } from "@/api/order";

async getOrderList() {
  const res = await this.$api.order.reqGetOrderList(
    this.currentPage,
    this.pageSize
  );
  this.total = res.total;
  this.orderList = res.records;
},
```
