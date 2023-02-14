# day07

## 详情页

### 1. 轮播图

1. 父组件传递数据

```html
<ImageList :skuImageList="skuInfo.skuImageList" />
```

2. 子组件声明接受

```js
props: {
  skuImageList: {
    type: Array,
    required: true,
  },
}
```

3. 子组件遍历展示

```html
<div class="swiper-slide" v-for="(img, index) in skuImageList" :key="img.id">
  <img :src="img.imgUrl" />
</div>
```

4. 完成轮播

```js
import Swiper, { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

export default {
  name: "ImageList",
  props: {
    skuImageList: {
      type: Array,
      required: true,
    },
  },
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        new Swiper(this.$refs.swiperRef, {
          modules: [Navigation],
          // 左右翻页
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 5, // 每页显示几张轮播图
          slidesPerGroup: 5, // 每次轮播几张图片
        });
      });
    },
  },
};
```

### 2. 鼠标移入，让图片高亮

1. 父组件定义数据

```js
data() {
  return {
    // 选中图片下标
    currentImgIndex: 0,
  };
},
```

2. 给子组件双向绑定数据

```html
<ImageList
  :skuImageList="skuInfo.skuImageList"
  :currentImgIndex.sync="currentImgIndex"
/>
```

3. 初始化，让图片高亮

```html
<img
  :class="{
    active: currentImgIndex === index,
  }"
  :src="img.imgUrl"
/>
```

4. 鼠标移入，改变图片高亮

```html
<div
  class="swiper-slide"
  v-for="(img, index) in skuImageList"
  :key="img.id"
  @mouseenter="setCurrentImgIndex(index)"
></div>
```

```js
methods: {
  setCurrentImgIndex(index) {
    this.$emit("update:currentImgIndex", index);
  },
},
```

### 3. 将图片数据传递给 Zoom 组件使用

1. 父组件传递数据

```html
<Zoom :image="skuInfo.skuImageList[currentImgIndex]" />
```

2. 子组件声明接受

```js
props: {
  image: {
    type: Object,
    default: () => ({})
  },
},
```

3. 子组件使用

```html
<img :src="image.imgUrl" />
<!-- 绑定事件区域 -->
<div class="event"></div>
<div class="big">
  <img :src="image.imgUrl" />
</div>
```

4. 问题：

- Detail 组件报错：`TypeError: Cannot read properties of undefined (reading '0')`
- ImageList 组件报错：`Invalid prop: type check failed for prop "skuImageList". Expected Array, got Undefined `

解决：原因是一上来 skuInfo 是一个空对象，空对象读取数据就是 undefined

```js
data() {
  return {
    categoryView: {},
    skuInfo: {
      skuImageList: [], // 给数据一个初始化值，就不是undefined了
    },
    spuSaleAttrList: [],
    currentImgIndex: 0,
  };
},
```

### 4. 放大镜

```vue
<template>
  <div class="spec-preview">
    <img :src="image.imgUrl" />
    <!-- 绑定事件区域 -->
    <div class="event" @mousemove="move"></div>
    <div class="big">
      <img
        :src="image.imgUrl"
        :style="{
          left: -2 * left + 'px',
          top: -2 * top + 'px',
        }"
      />
    </div>
    <!-- 小绿 -->
    <div
      class="mask"
      :style="{
        left: left + 'px',
        top: top + 'px',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "SZoom",
  props: {
    image: {
      type: Object,
      // default: () => {}, // undefined
      // default: () => { return {} }, // object
      default: () => ({}), // object
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
    };
  },
  methods: {
    move(e) {
      let left = e.offsetX - 100;
      let top = e.offsetY - 100;

      if (left < 0) left = 0;
      else if (left > 200) left = 200;

      if (top < 0) top = 0;
      else if (top > 200) top = 200;

      this.left = left;
      this.top = top;
    },
  },
};
</script>
```

### 5. InputNumber

1. 定义 InputNumber 静态组件

2. 引入&注册&使用

3. 父组件定义商品数量数据

```js
data() {
  return {
    skuNum: 1
  }
}
```

4. 给子组件双向绑定数据

```vue
<InputNumber v-model="skuNum" />
```

5. 完成 InputNumber

```vue
<template>
  <div class="controls">
    <input
      autocomplete="off"
      class="itxt"
      :value="currentValue"
      @blur="handleInputBlur"
    />
    <button
      class="plus"
      @click="setCurrentValue(1)"
      :disabled="currentValue === max"
    >
      +
    </button>
    <button
      class="mins"
      @click="setCurrentValue(-1)"
      :disabled="currentValue === min"
    >
      -
    </button>
  </div>
</template>

<script>
/*
  1. 有最小值和最大值
  2. 输入小于最小值，等于最小值
  3. 输入大于最大值，等于最大值
  4. 输入小数，取整
  5. 输入非数字，变成之前的值
*/
export default {
  name: "InputNumber",
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    setCurrentValue(val) {
      this.currentValue += val;
    },
    handleInputBlur(e) {
      this.currentValue = e.target.value;
    },
  },
  watch: {
    currentValue(newVal, oldVal) {
      const { min, max } = this;
      // 输入小数，取整
      let value = Math.round(newVal);
      // 输入小于最小值，等于最小值
      if (value < min) value = min;
      // 输入大于最大值，等于最大值
      if (value > max) value = max;
      // 输入非数字，变成之前的值
      if (Number.isNaN(value)) {
        value = oldVal;
      }
      // 更新currentValue的值
      this.currentValue = value;

      this.$emit("input", value);
    },
  },
};
</script>
```

## 注册

### 1. 注册的表单校验

1. 文档

- 整体使用文档：https://vee-validate.logaretm.com/v3/guide/forms.html#validate-before-submit
- 表单校验规则文档： https://vee-validate.logaretm.com/v3/guide/rules.html#importing-the-rules

2. 下载

```
npm i vee-validate@3
```

3. 注册组件

```js
import { ValidationObserver, ValidationProvider } from "vee-validate";

components: {
  ValidationObserver,
  ValidationProvider,
},
```

4. 使用组件

```html
<ValidationObserver v-slot="{ handleSubmit }">
  <form @submit.prevent="handleSubmit(submit)">
    <!-- 内部放置表单项 -->
  </form>
</ValidationObserver>
```

```js
methods: {
  submit() {}
}
```

5. 定义表单校验规则

```js
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

// const phoneReg = /^1[3-9][0-9]{9}$/;
const phoneReg =
  /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;

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
  message: "手机号不合符规范",
});
```

6. 定义表单项

```html
<!-- 
  ValidationProvider
    name 表单项的名称（建议和数据名称一致，数据名称和发送请求的参数名称一致）
    rules 表单校验规则（表单校验规则需要通过extend方法定义）
    v-slot="{ errors }" 得到表单校验失败的错误信息
    tag="div" 渲染成什么元素
    mode="lazy" 触发表单校验的时机（失去焦点）
  -->
<ValidationProvider
  class="content"
  name="phone"
  rules="phoneRequired|phone"
  v-slot="{ errors }"
  tag="div"
  mode="lazy"
>
  <label>手机号:</label>
  <input type="text" placeholder="请输入你的手机号" />
  <span class="error-msg">{{ errors[0] }}</span>
</ValidationProvider>
```

7. 收集数据

```js
data() {
  return {
    phone: "",
    code: "",
    password: "",
    rePassword: "",
    isAgree: false,
  }
}
```

```html
<input type="text" placeholder="请输入你的手机号" v-model="user.phone" />
```

### 2. 完成注册的表单校验


1. 定义表单校验规则

```js
import { ValidationProvider, ValidationObserver, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

// const phoneReg = /^1[3-9][0-9]{9}$/;
const phoneReg =
  /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/;

const codeReg = /^[0-9]{6}$/;

const passwordReg = /^[0-9A-Za-z_]{6,18}$/;

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

extend("codeRequired", {
  ...required,
  message: "请输入验证码",
});

extend("code", {
  validate(val) {
    return codeReg.test(val);
  },
  message: "验证码不符合规范",
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

extend("rePasswordRequired", {
  ...required,
  message: "请输入确认密码",
});

extend("rePassword", {
  validate(val, { password }) {
    return password === val;
  },
  message: "两次密码输入不一致",
  params: ["password"], // 声明接受参数
});

extend("isAgree", {
  validate(val) {
    return val;
  },
  message: "请同意xxx用户协议",
});
```

2. 完成表单校验

```html
<ValidationProvider
  class="content"
  name="phone"
  rules="phoneRequired|phone"
  v-slot="{ errors }"
  tag="div"
  mode="lazy"
>
  <label>手机号:</label>
  <input type="text" placeholder="请输入你的手机号" v-model="phone" />
  <span class="error-msg">{{ errors[0] }}</span>
</ValidationProvider>
<ValidationProvider
  class="content"
  name="code"
  rules="codeRequired|code"
  v-slot="{ errors }"
  tag="div"
  mode="lazy"
>
  <label>验证码:</label>
  <input type="text" placeholder="请输入验证码" v-model="code" />
  <button class="getcode">获取验证码</button>
  <span class="error-msg">{{ errors[0] }}</span>
</ValidationProvider>
<ValidationProvider
  class="content"
  name="password"
  rules="passwordRequired|password"
  v-slot="{ errors }"
  tag="div"
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
  class="content"
  name="rePassword"
  :rules="`rePasswordRequired|rePassword:${password}`"
  v-slot="{ errors }"
  tag="div"
  mode="lazy"
>
  <label>确认密码:</label>
  <input
    type="text"
    placeholder="请输入确认密码"
    v-model="rePassword"
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
```