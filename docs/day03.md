# day03

## 三级分类路由跳转

### 1. 使用 router-link 完成跳转

```html
<router-link
  :to="{
    name: 'Search',
    query: {
      category1Id: c1.categoryId,
      categoryName: c1.categoryName,
    },
  }"
>
  {{ c1.categoryName }}
</router-link>

<router-link
  :to="{
    name: 'Search',
    query: {
      category2Id: c2.categoryId,
      categoryName: c2.categoryName,
    },
  }"
>
  {{ c2.categoryName }}
</router-link>

<router-link
  :to="{
    name: 'Search',
    query: {
      category3Id: c3.categoryId,
      categoryName: c3.categoryName,
    },
  }"
>
  {{ c3.categoryName }}
</router-link>
```

问题：生成太多 router-link 组件了，性能不好

### 2. 使用编程式导航优化

```html
<a @click="toSearch(c1.categoryName, c1.categoryId, 1)">
  {{ c1.categoryName }}
</a>

<a @click="toSearch(c2.categoryName, c2.categoryId, 2)">
  {{ c2.categoryName }}
</a>

<a @click="toSearch(c3.categoryName, c3.categoryId, 3)">
  {{ c3.categoryName }}
</a>
```

```js
methods: {
  toSearch(categoryName, categoryId, level) {
    this.$router.push({
      name: "Search",
      query: {
        categoryName,
        [`category${level}Id`]: categoryId,
      },
    });
  },
}
```

问题：绑定了太多 click 事件，占用内存，性能也不好

### 3. 使用事件委托 + 自定义属性解决

- 事件委托给父元素绑定

```html
<div class="all-sort-list2" @click="toSearch"></div>
```

- 子元素通过自定义属性添加数据

```html
<a :data-id="c1.categoryId" :data-name="c1.categoryName" :data-level="1">
  {{ c1.categoryName }}
</a>

<a :data-id="c2.categoryId" :data-name="c2.categoryName" :data-level="2">
  {{ c2.categoryName }}
</a>

<a :data-id="c3.categoryId" :data-name="c3.categoryName" :data-level="3">
  {{ c3.categoryName }}
</a>
```

- 设置跳转回调函数

```js
toSearch(e) {
  // 获取自定义属性的值
  const { id, name, level } = e.target.dataset;

  this.$router.push({
    name: "Search",
    query: {
      categoryName: name,
      [`category${level}Id`]: id,
    },
  });
},
```

### 4. 解决空白区域点击能跳转问题

```js
goSearch(e) {
  const { id, name, level } = e.target.dataset;

  // 因为只有a标签有这三个属性，其他标签没有
  if (!id) return;

  this.$router.push({
    name: "Search",
    query: {
      categoryName: name,
      [`category${level}Id`]: id,
    },
  });
},
```

### 5. 添加一级分类移入效果，扩大点击区域

```css
.item {
  h3 {
    line-height: 30px;
    font-size: 14px;
    font-weight: 400;
    overflow: hidden;
    margin: 0;
    /* 扩大点击区域 */
    a {
      display: block;
      padding: 0 20px;
      color: #333;
    }
  }
}
&:hover {
  /* 移入效果 */
  background-color: #e1251b;
  h3 {
    a {
      color: #fff;
    }
  }
}
```

## 首页静态组件

1. 从 `vue-pc项目资料\静态组件\Home及其子组件_静态` 引入所有组件

需要排除 `TypeNav` 组件（我们已经在 components 中实现了）

2. 修改组件名字成多个单词（解决 eslint 报错）

## 轮播图

### 1. 定义&使用组件

1. components/Carousel/index.vue

2. 在 ListContainer 中使用

```js
import Carousel from "@/components/Carousel";

export default {
  name: "ListContainer",
  components: {
    Carousel,
  },
};
```

```vue
<!-- 
  banner轮播
  注意：需要将之前的swiper结构删除
-->
<Carousel />
```

### 2. 使用 Swiper

1. 下载 Swiper

```
npm i swiper
```

2. swiper 文档

- API 文档：https://swiperjs.com/swiper-api#autoplay
- 例子：https://swiperjs.com/demos/145-css-mode/core

> swiper 官方提供了 vue 专门的用法，但是只能用于 vue3
>
> 我们 vue2 项目暂时不能使用

3. 准备图片资源

将 ListContainer 下面的图片移动到 Carousel 组件中

4. 使用 swiper

```vue
<template>
  <div class="swiper">
    <!-- 轮播图区域 -->
    <div class="swiper-wrapper">
      <!-- 每一个轮播图 -->
      <div class="swiper-slide">
        <img src="./images/banner1.jpg" alt="banner" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner2.jpg" alt="banner" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner3.jpg" alt="banner" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner4.jpg" alt="banner" />
      </div>
    </div>
    <!-- 小圆点 -->
    <div class="swiper-pagination"></div>

    <!-- 左右翻页 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper js和css
import Swiper from "swiper/swiper-bundle.esm.js";
import "swiper/swiper-bundle.min.css";

export default {
  name: "SCarousel",
  mounted() {
    // 等页面DOM渲染完成，才能new Swiper
    new Swiper(".swiper", {
      // 左右翻页
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      // 小圆点
      pagination: {
        el: ".swiper-pagination",
      },
      // 自动轮播
      // autoplay: true,
      autoplay: {
        // delay: 1000,
        pauseOnMouseEnter: true, // 鼠标移入暂停自动轮播
        disableOnInteraction: false, // 操作之后是否需要关闭自动轮播
      },
      // 无限轮播
      loop: true,
    });
  },
};
</script>

<style></style>
```

5. 将其他组件的 swiper 结构删除

Floor 组件中需要删除 swiper 结构，否则轮播可能会有 bug

### 3. 优化 Swiper

之前完整引入的 swiper 的 css 和 js，打包体积太大了

现在按需引入，打包体积更小

```js
// 引入完整Swiper js和css(打包文件更大)
// import Swiper from "swiper/swiper-bundle.esm.js";
// import "swiper/swiper-bundle.min.css";

// 按需引入（打包文件更小）
import Swiper, { Navigation, Pagination, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// ...
new Swiper(".swiper", {
  // 声明使用模块
  modules: [Navigation, Pagination, Autoplay],
});
```

## 模拟数据

当后端程序员还未开发好接口时，此时前端可能需要模拟数据

**在进行模拟数据之前需要找后端程序员要接口返回的数据结构**

我们需要的数据在项目资料的模拟数据中

> 注意，一旦后端接口开发完成，就不能使用 mock 了，要改成真实接口

### 1. 配置脚手架

```js
// vue.config.js
// 在devServer上添加模拟数据功能
onBeforeSetupMiddleware: function (devServer) {
  // 给devServer添加路由
  devServer.app.get("/mock/getHomeBanners", function (req, res) {
    /*
      req 请求对象 （客户端发送给服务器的内容，都在req上）
      res 响应对象 （服务器发送给客户端的内容，都在res上）
    */
    res.json({
      code: 200,
      message: "成功",
      success: true,
      // 模拟数据的数据结构: 问后端
      data: [
        {
          id: "1",
          imgUrl: "/images/banner1.jpg",
        },
        {
          id: "2",
          imgUrl: "/images/banner2.jpg",
        },
        {
          id: "3",
          imgUrl: "/images/banner3.jpg",
        },
        {
          id: "4",
          imgUrl: "/images/banner4.jpg",
        },
      ],
    });
  });
},
```

**配置完成，记得重启服务器生效**

### 2. 定义新的发送请求函数，用来请求 mock 数据

```js
// utils/request-mock.js
const request = axios.create({
  baseURL: "/mock",
  timeout: 20000,
});
```

### 3. 定义轮播图请求接口函数

```js
// api/home.js
import requestMock from "@/utils/request-mock";
// 获取首页轮播图接口
export const reqGetHomeBanners = () => {
  return requestMock({
    url: "/getHomeBanners",
  });
};
```

### 4. 组件发送请求，获取&更新数据

因为 Carousel 组件将来需要复用，不能直接在组件请求数据，会导致复用的其他地方数据一样。

所以在其父组件请求数据，再传递给 Carousel 组件使用

```js
// ListContainer
import { reqGetHomeBanners } from "@/api/home";

async mounted() {
  this.banners = await reqGetHomeBanners();
},
data() {
  return {
    banners: [],
  };
},
```

### 5. 将数据传递给 Carousel 组件

1. 父组件传递数据

```vue
<Carousel :imageList="banners" />
```

2. 子组件声明接受

```js
props: {
  imageList: {
    type: Array,
    required: true,
  },
},
```

3. 子组件使用数据遍历展示

```vue
<div class="swiper-slide" v-for="img in imageList" :key="img.id">
  <img :src="img.imgUrl" alt="banner" />
</div>
```

### 6. 封装 mock 函数

1. 定义 mock 模块

- mock/modules/home.js

```js
// commonjs模块化
module.exports = [
  {
    method: "get",
    url: "/mock/getHomeBanners",
    response: {
      code: 200,
      message: "成功",
      success: true,
      // 模拟数据的数据结构: 问后端
      data: [
        {
          id: "1",
          imgUrl: "/images/banner1.jpg",
        },
        {
          id: "2",
          imgUrl: "/images/banner2.jpg",
        },
        {
          id: "3",
          imgUrl: "/images/banner3.jpg",
        },
        {
          id: "4",
          imgUrl: "/images/banner4.jpg",
        },
      ],
    },
  },
];
```

2. 定义 mock 主模块

```js
// mock/index.js
const home = require("./modules/home");
// 将modules下的所有文件进行汇总
const modules = [...home];

const setupMock = (app) => {
  // 将汇总所有内容变成后端路由
  for (let i = 0; i < modules.length; i++) {
    /*
      module就是每个模块中的对象
        {
          method: "GET",
          url: "/mock/getHomeBanners",
          response: { xxx },
        },

        app.get("/mock/getHomeBanners", (req, res) => {
          res.json(response)
        })
    */
    // 取出单个模块内容
    const module = modules[i];

    // 设置成后端路由
    app[module.method.toLowerCase()](module.url, (req, res) => {
      res.json(module.response);
    });
  }
};

module.exports = setupMock;
```

3. 在 vue.config.js 中使用

```js
const setupMock = require("./mock");

onBeforeSetupMiddleware: function (devServer) {
  setupMock(devServer.app);
},
```

## 图片 404 问题

1. public 下面的资源，不管用不用，都会被打包（原封不动输出）

2. 而 src 下面的资源，必须引用，才会被打包

Carousel 一上来并没有引用轮播图图片，导致图片没有被打包，从而访问不了

解决：将图片放入 public 下面即可

## 轮播图功能出现问题

原因：子组件 mounted 先触发，父组件 mounted 后触发，子组件先 new Swiper，此时请求都还未发送，根本没有数据，渲染轮播图就会出现问题。

解决：等数据回来

```js
watch: {
  imageList() {
    // 等DOM元素更新完成再触发
    new Swiper(".swiper", {
      modules: [Navigation, Pagination, Autoplay],
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      autoplay: {
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      },
    });
  },
},
```

问题：功能还是出现问题

原因：更新数据是同步的，更新用户界面是异步的，数据的确更新了，但是用户界面还未更新，此时还要执行同步代码，new Swiper，页面还未有图片，渲染出错。

解决：等用户界面渲染完成，在 new Swiper

```js
watch: {
    imageList() {
      // 但数据发生变化时触发回调函数
      // 而数据发生变化时说明数据回来了

      // 数据更新是同步的，用户界面更新是异步的
      // 数据已经更新了，但是数据还未渲染成DOM元素

      this.$nextTick(() => {
        // 简单理解：等页面DOM渲染完成，再触发回调函数
        // 真正理解：将回调函数添加到回调队列去
        new Swiper(".swiper", {
          // 声明使用模块
          modules: [Navigation, Pagination, Autoplay],
          // 左右翻页
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          // 小圆点
          pagination: {
            el: ".swiper-pagination",
          },
          // 自动轮播
          // autoplay: true,
          autoplay: {
            // delay: 1000,
            pauseOnMouseEnter: true, // 鼠标移入暂停自动轮播
            disableOnInteraction: false, // 操作之后是否需要关闭自动轮播
          },
          // 无限轮播
          loop: true,
        });
      });
    },
  },
```

> `this.$nextTick`
>
> - 简单理解：等用户界面更新完成，再触发回调函数
> - 真正理解：将回调函数添加到异步队列，等待将来执行
> - 如果是先更新数据，在调用 nextTick 方法的话
>   - 先更新数据对应的更新用户界面的异步操作先进异步队列
>   - nextTick 方法的回调函数后进队列
>   - 队列是先进先出的原则
>   - 所以，先更新用户界面，再触发 nextTick 的回调
