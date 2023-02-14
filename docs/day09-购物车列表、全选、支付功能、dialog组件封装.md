# day09

## 购物车

### 1. 购物车数据展示

1. 定义 vuex 模块

```js
export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {},
  mutations: {},
};
```

2. 汇总模块

```js
import shopcart from "./modules/shopcart";

// 汇总模块
modules: {
  user,
  shopcart,
},
```

3. 定义 vuex 模块的内容

```js
import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import shopcart from "./modules/shopcart";

Vue.use(Vuex);

export default new Vuex.Store({
  // state: {},
  // getters: {},
  // actions: {},
  // mutations: {},
  // 汇总模块
  modules: {
    user,
    shopcart,
  },
});
```

4. 组件使用

```js
import { mapState, mapActions } from "vuex";
import InputNumber from "@/components/InputNumber";

export default {
  name: "ShopCart",
  components: {
    InputNumber,
  },
  mounted() {
    // 触发getCartList action函数
    this.getCartList();
  },
  computed: {
    // state和getters映射到computed中
    ...mapState("shopcart", ["cartList"]),
  },
  methods: {
    // action和mutation映射到methods中
    ...mapActions("shopcart", ["getCartList"]),
  },
};
```

5. 数据展示

```html
<ul class="cart-list" v-for="cart in cartList" :key="cart.id">
  <li class="cart-list-con1">
    <input type="checkbox" name="chk_list" :checked="cart.isChecked" />
  </li>
  <li class="cart-list-con2">
    <img :src="cart.imgUrl" />
    <div class="item-msg">{{ cart.skuName }}</div>
  </li>
  <li class="cart-list-con4">
    <span class="price">{{ cart.skuPrice }}</span>
  </li>
  <li class="cart-list-con5">
    <InputNumber v-model="cart.skuNum" />
  </li>
  <li class="cart-list-con6">
    <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
  </li>
  <li class="cart-list-con7">
    <a href="#none" class="sindelet">删除</a>
    <br />
  </li>
</ul>
```

### 2. 单选

1. 定义 vuex 模块内容

```js
actions: {
  // 2. 单选
  async updateCartIsChecked({ commit }, { skuId, isChecked }) {
    // 发送请求更新服务器数据
    await reqUpdateCartIsChecked(skuId, isChecked);
    // 触发mutation，更新客户端数据
    commit("UPDATE_CART_IS_CHECKED", { skuId, isChecked });
  },
},
mutations: {
  UPDATE_CART_IS_CHECKED(state, { skuId, isChecked }) {
    state.cartList.find((cart) => cart.skuId === skuId).isChecked = isChecked;
  },
}
```

2. 将 actions 映射到组件内使用

```js
methods: {
  // action和mutation映射到methods中
  ...mapActions("shopcart", ["getCartList", "updateCartIsChecked"]),
},
```

3. 页面使用

```vue
<input
  type="checkbox"
  name="chk_list"
  :checked="cart.isChecked"
  @change="
    updateCartIsChecked({
      // 注意：必须是skuId不是id
      skuId: cart.skuId,
      // 1 - 0 = 1 (0 -> 1)
      // 1 - 1 = 0 (1 -> 0)
      isChecked: 1 - cart.isChecked,
    })
  "
/>
```

### 3. 全选/全不选

1. 定义 vuex 模块内容

```js
getters: {
  isAllChecked(state) {
    return state.cartList.every((cart) => cart.isChecked);
  },
},
actions: {
  // 3. 全选/全不选
  async updateAllCartIsChecked({ commit, state }, isChecked) {
    // 1. 找出所有需要更新的商品
    // 需要得到部分需要更新的商品（长度变，值不变，用filter）
    // 在vuex完成这个事，能让外面使用者更简单
    const skuIdList = state.cartList
      .filter((cart) => {
        return cart.isChecked !== isChecked;
      })
      .map((cart) => cart.skuId);
    // 2. 发送请求，更新服务器数据
    await reqUpdateAllCartIsChecked(skuIdList, isChecked);
    // 3. 触发mutations，更新客户端数据
    commit("UPDATE_ALL_CART_IS_CHECKED", { skuIdList, isChecked });
  },
},
mutations: {
  UPDATE_ALL_CART_IS_CHECKED(state, { skuIdList, isChecked }) {
    state.cartList.forEach((cart) => {
      if (skuIdList.includes(cart.skuId)) {
        cart.isChecked = isChecked;
      }
      // 最简单的就是无脑更新。反正如果更新的值一样也不会有问题
      // cart.isChecked = isChecked;
    });
  },
}
```

2. 将 actions / getters 映射到组件内使用

```js
import { mapState, mapActions, mapGetters } from "vuex";

computed: {
  // state和getters映射到computed中
  ...mapState("shopcart", ["cartList"]),
  ...mapGetters("shopcart", ["isAllChecked"]),
},
methods: {
  // action和mutation映射到methods中
  ...mapActions("shopcart", [
    "getCartList",
    "updateCartIsChecked",
    "updateAllCartIsChecked",
  ]),
},
```

3. 页面使用

```vue
<input
  class="chooseAll"
  type="checkbox"
  :checked="isAllChecked"
  @change="updateAllCartIsChecked(1 - isAllChecked)"
/>
```

### 4. 单个删除

1. 定义 vuex 模块内容

```js
import {
  reqGetCartList,
  reqUpdateCartIsChecked,
  reqUpdateAllCartIsChecked,
  reqDelCart,
} from "@/api/shopcart";

actions: {
  // 4. 单个删除
  async delCart({ commit }, skuId) {
    await reqDelCart(skuId);
    commit("DEL_CART", skuId);
  },
},
mutations: {
  DEL_CART(state, skuId) {
    state.cartList = state.cartList.filter((cart) => cart.skuId !== skuId);
  },
},
```

2. 将 actions 映射到组件内使用

```js
methods: {
  // action和mutation映射到methods中
  ...mapActions("shopcart", [
    "getCartList",
    "updateCartIsChecked",
    "updateAllCartIsChecked",
    "delCart",
  ]),
},
```

3. 页面使用

```vue
<a class="sindelet" @click="delCart(cart.skuId)">删除</a>
```

### 5. 批量删除

1. 定义 vuex 模块内容

```js
actions: {
  // 5. 批量删除
  async delAllCart({ commit, state }) {
    const skuIdList = state.cartList
      // isChecked为1返回true，会保留下来
      .filter((cart) => cart.isChecked)
      .map((cart) => cart.skuId);
    await reqDelAllCart(skuIdList);
    commit("DEL_ALL_CART");
  },
},
mutations: {
  DEL_ALL_CART(state) {
    state.cartList = state.cartList.filter((cart) => !cart.isChecked);
  },
}
```

2. 将 actions 映射到组件内使用

```js
methods: {
  // action和mutation映射到methods中
  ...mapActions("shopcart", [
    "getCartList",
    "updateCartIsChecked",
    "updateAllCartIsChecked",
    "delCart",
    "delAllCart",
  ]),
},
```

3. 页面使用

```vue
<a @click="delAllCart">删除选中的商品</a>
```

### 6. 更新商品数量

1. 定义 vuex 模块内容

```js
import {
  reqGetCartList,
  reqUpdateCartIsChecked,
  reqUpdateAllCartIsChecked,
  reqDelCart,
  reqDelAllCart,
  reqAddToCart,
} from "@/api/shopcart";

actions: {
  // 6. 修改商品数量
  async updateCartSkuNum({ commit }, { skuId, skuNum }) {
    await reqAddToCart(skuId, skuNum);
    commit("UPDATE_CART_SKU_NUM", { skuId, skuNum });
  },
},
mutations: {
  UPDATE_CART_SKU_NUM(state, { skuId, skuNum }) {
    // 需要加上需要更新的数量
    state.cartList.find((cart) => cart.skuId === skuId).skuNum += skuNum;
  },
}
```

2. 将 actions 映射到组件内使用

```js
methods: {
  ...mapActions("shopcart", [
    "getCartList",
    "updateCartIsChecked",
    "updateAllCartIsChecked",
    "delCart",
    "delAllCart",
    "updateCartSkuNum",
  ]),
}
```

3. 页面使用

```vue
<!-- <InputNumber v-model="cart.skuNum" /> -->
<InputNumber
  :value="cart.skuNum"
  @input="
    updateCartSkuNum({
      skuId: cart.skuId,
      // 比如当前值是2，我点击+，需要变成3
      // 那么对于服务器来说是数量+1，而不是+3，所以需要$event - cart.skuNum
      skuNum: $event - cart.skuNum,
    })
  "
/>
```

此时存在问题：

- 连续点击发送太多的请求
- 连续点击值不对

4. 解决

```js
import debounce from "lodash/debounce";

methods: {
  // action和mutation映射到methods中
  ...mapActions("shopcart", [
    "getCartList",
    "updateCartIsChecked",
    "updateAllCartIsChecked",
    "delCart",
    "delAllCart",
    "updateCartSkuNum",
  ]),
  // 使用防抖只让最后一次生效，只会发送一次请求
  updateSkuNum: debounce(function (skuId, skuNum) {
    this.updateCartSkuNum({
      skuId,
      skuNum,
    });
  }, 200),
},
```

```vue
<InputNumber
  :value="cart.skuNum"
  @input="updateSkuNum(cart.skuId, $event - cart.skuNum)"
/>
```

### 7. 显示商品数量和总价

1. 定义 vuex 模块内容

```js
getters: {
  isCheckedNum(state) {
    return state.cartList.reduce((p, c) => {
      return p + (c.isChecked ? c.skuNum : 0);
    }, 0);
  },
  totalPrice(state) {
    return state.cartList.reduce((p, c) => {
      return p + (c.isChecked ? c.skuNum * c.cartPrice : 0);
    }, 0);
  },
},
```

2. 将 getters 映射到组件内使用

```js
computed: {
  ...mapGetters("shopcart", ["isAllChecked", "isCheckedNum", "totalPrice"]),
},
```

3. 页面使用

```vue
<div class="chosed">
  已选择
  <span>{{ isCheckedNum }}</span>
  件商品
</div>
<div class="sumprice">
  <em>总价（不含运费） ：</em>
  <i class="summoney">{{ totalPrice }}</i>
</div>
```

## 支付功能

### 1. 引入&配置路由

1. 引入支付相关的路由静态组件

2. 配置路由

```js
import Trade from "@/views/Trade";
import Pay from "@/views/Pay";
import PaySuccess from "@/views/PaySuccess";
import Center from "@/views/Center";

{
  path: "/trade",
  component: Trade,
  name: "Trade",
},
{
  path: "/pay",
  component: Pay,
  name: "Pay",
},
{
  path: "/paysuccess",
  component: PaySuccess,
  name: "PaySuccess",
},
{
  path: "/center",
  component: Center,
  name: "Center",
},
```

### 2. 点击结算，跳转到订单交易页

1. 绑定点击事件

```html
<a class="sum-btn" @click="toTrade">结算</a>
```

2. 全局配置 Message 组件

```js
// plugin/element.js
import Vue from "vue";
import { Message } from "element-ui";

Vue.prototype.$message = Message;
```

3. 组件使用

```js
toTrade() {
  if (this.isCheckedNum === 0) {
    // 没有选中任何商品
    this.$message.warning("请选中至少一个商品");
    return;
  }
  this.$router.push("/trade");
},
```

### 3. 订单交易页数据展示

1. 定义接口函数

```js
import request from "@/utils/request";

// 获取订单交易页信息
export const reqGetTradeInfo = () => {
  return request({
    url: `/order/auth/trade`,
  });
};
```

2. 发送请求，更新数据

```js
import { reqGetTradeInfo } from "@/api/pay";

async mounted() {
  this.tradeInfo = await reqGetTradeInfo();
},
data() {
  return {
    tradeInfo: {},
  };
},
```

3. 数据展示

```html
<ul
  class="list clearFix"
  v-for="goods in tradeInfo.detailArrayList"
  :key="goods.skuId"
>
  <li>
    <img :src="goods.imgUrl" :alt="goods.skuName" class="goods-img" />
  </li>
  <li>
    <p>{{ goods.skuName }}</p>
    <h4>7天无理由退货</h4>
  </li>
  <li>
    <h3>￥{{ goods.orderPrice }}</h3>
  </li>
  <li>X {{ goods.skuNum }}</li>
  <li>有货</li>
</ul>
```

### 4. 收集订单备注

1. 定义数据

```js
data() {
  return {
    tradeInfo: {},
    orderComment: "",
  };
},
```

2. 收集数据

```html
<textarea
  placeholder="建议留言前先与商家沟通确认"
  class="remarks-cont"
  v-model="orderComment"
></textarea>
```

### 5. 点击提交订单，生成订单，跳转支付页面

1. 定义接口函数

```js
// 提交订单
export const reqSubmitOrder = ({ tradeNo, ...data }) => {
  return request({
    method: "POST",
    url: `/order/auth/submitOrder`,
    params: { tradeNo },
    data,
  });
};
```

2. 绑定事件

```html
<a class="subBtn" @click="submitOrder">提交订单</a>
```

3. 指定回调

```js
async submitOrder() {
  const { tradeNo, detailArrayList } = this.tradeInfo;

  const orderId = await reqSubmitOrder({
    tradeNo,
    consignee: "静哥",
    consigneeTel: "13800000000",
    deliveryAddress: "广东省深圳市宝安区草围村洗脚城",
    paymentWay: "ONLINE",
    orderComment: this.orderComment,
    orderDetailList: detailArrayList,
  });

  this.$router.push({
    name: "Pay",
    query: {
      orderId,
    },
  });
},
```

## 封装 dialog 组件

### 1. 静态组件

```vue
<template>
  <div class="dialog" v-show="visible">
    <!-- 遮罩层 -->
    <div class="dialog-mask"</div>
    <!-- 内容区 -->
    <div class="dialog-wrap" :style="{ width }">
      <!-- 头部 -->
      <div class="dialog-header">
        <div class="dialog-title">{{ title }}</div>
        <div class="dialog-close">X</div>
      </div>
      <!-- 内容区 -->
      <div class="dialog-content">
        <!-- 显示默认插槽的内容 -->
        <slot />
      </div>
      <!-- 底部 -->
      <div class="dialog-footer">
        <!-- 显示具名插槽的内容 -->
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: "50%",
    },
  },
};
</script>

<style lang="less" scoped>
.dialog {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
}

.dialog-wrap {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
}

.dialog-header {
  display: flex;
  justify-content: space-between;
}

.dialog-title {
  font-size: 18px;
}

.dialog-close {
  font-size: 14px;
  color: #999;
  cursor: pointer;
  &:hover {
    color: red;
  }
}

.dialog-content {
  padding: 20px 0;
  font-size: 16px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
```

### 2. 显示&隐藏切换

1. 绑定事件

```html
<!-- 遮罩层 -->
<div class="dialog-mask" @click="close"></div>

<div class="dialog-close" @click="close">X</div>
```

2. 设置回调

```js
methods: {
  close() {
    this.$emit("update:visible", false);
  },
},
```

### 3. 添加过渡效果

1. 包裹 transition 组件

```html
<transition name="dialog">xxx</transition>
```

2. 定义样式

```css
/* 显示 - 隐藏 */
.dialog-leave {
  .dialog-mask {
    opacity: 1;
  }
  .dialog-wrap {
    transform: translateY(0);
    opacity: 1;
  }
}

.dialog-leave-active {
  transition: all 0.3s;
  .dialog-mask {
    transition: all 0.3s;
  }
  .dialog-wrap {
    transition: all 0.3s;
  }
}

.dialog-leave-to {
  .dialog-mask {
    opacity: 0;
  }
  .dialog-wrap {
    transform: translateY(-100px);
    opacity: 0;
  }
}
/* 隐藏 - 显示 */
.dialog-enter {
  .dialog-mask {
    opacity: 0;
  }
  .dialog-wrap {
    transform: translateY(-100px);
    opacity: 0;
  }
}

.dialog-enter-active {
  transition: all 0.3s;
  .dialog-mask {
    transition: all 0.3s;
  }
  .dialog-wrap {
    transition: all 0.3s;
  }
}

.dialog-enter-to {
  .dialog-mask {
    opacity: 1;
  }
  .dialog-wrap {
    transform: translateY(0);
    opacity: 1;
  }
}
```
