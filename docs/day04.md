# day04

## floor 数据动态展示

### 1. 搭建 floor 的 mock

```js
// mock/modules/home.js
{
  method: "get",
  url: "/mock/getHomeFloors",
  response: {
    code: 200,
    message: "",
    success: true,
    data: [
      {
        id: "001",
        name: "家用电器",
        keywords: [
          "节能补贴",
          "4K电视",
          "空气净化器",
          "IH电饭煲",
          "滚筒洗衣机",
          "电热水器",
        ],
        imgUrl: "/images/floor-1-1.png",
        navList: [
          {
            url: "http://www.atguigu.com",
            text: "热门",
          },
          {
            url: "http://www.atguigu.com",
            text: "大家电",
          },
          {
            url: "http://www.atguigu.com",
            text: "生活电器",
          },
          {
            url: "http://www.atguigu.com",
            text: "厨房电器",
          },
          {
            url: "http://www.atguigu.com",
            text: "应季电器",
          },
          {
            url: "http://www.atguigu.com",
            text: "空气/净水",
          },
          {
            url: "http://www.atguigu.com",
            text: "高端电器",
          },
        ],
        carouselList: [
          {
            id: "0011",
            imgUrl: "/images/floor-1-b01.png",
          },
          {
            id: "0012",
            imgUrl: "/images/floor-1-b02.png",
          },
          {
            id: "0013",
            imgUrl: "/images/floor-1-b03.png",
          },
        ],
        recommendList: [
          "/images/floor-1-2.png",
          "/images/floor-1-3.png",
          "/images/floor-1-5.png",
          "/images/floor-1-6.png",
        ],
        bigImg: "/images/floor-1-4.png",
      },
      {
        id: "002",
        name: "手机通讯",
        keywords: [
          "高通骁龙",
          "16核处理器",
          "超高性价比",
          "鸿蒙系统",
          "以旧换新",
          "免费升级",
        ],
        imgUrl: "/images/1_floor-1-1.png",
        navList: [
          {
            url: "http://www.atguigu.com",
            text: "安卓机皇",
          },
          {
            url: "http://www.atguigu.com",
            text: "热销爆品",
          },
          {
            url: "http://www.atguigu.com",
            text: "性价比之王",
          },
          {
            url: "http://www.atguigu.com",
            text: "华为钜惠",
          },
          {
            url: "http://www.atguigu.com",
            text: "小米黑科技",
          },
          {
            url: "http://www.atguigu.com",
            text: "老人机",
          },
          {
            url: "http://www.atguigu.com",
            text: "极致奢华",
          },
        ],
        carouselList: [
          {
            id: "0011",
            imgUrl: "/images/1_floor-1-b01.png",
          },
          {
            id: "0012",
            imgUrl: "/images/1_floor-1-b02.png",
          },
          {
            id: "0013",
            imgUrl: "/images/1_floor-1-b03.png",
          },
        ],
        recommendList: [
          "/images/1_floor-1-2.png",
          "/images/1_floor-1-3.png",
          "/images/1_floor-1-5.png",
          "/images/1_floor-1-6.png",
        ],
        bigImg: "/images/1_floor-1-4.png",
      },
    ],
  },
},
```

> 重启服务器才能生效

### 2. 定义请求接口函数

```js
// src/api/home.js
// 获取首页楼层数据接口
export const reqGetHomeFloors = () => {
  return requestMock({
    url: "/getHomeFloors",
  });
};
```

### 3. 组件发送请求，获取数据

```js
// Home组件
import { reqGetHomeFloors } from "@/api/home";

async mounted() {
  this.floors = await reqGetHomeFloors();
},
data() {
  return {
    floors: [],
  };
},
```

### 4. 将数据遍历展示&传递给子组件

1. 父组件遍历数据

```vue
<Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
```

2. 子组件声明接受

```js
props: {
  floor: {
    type: Object,
    required: true,
  },
},
```

### 5. 数据动态展示

```vue
<template>
  <div class="floor">
    <div class="py-container">
      <div class="title clearfix">
        <h3 class="fl">{{ floor.name }}</h3>
        <div class="fr">
          <ul class="nav-tabs clearfix">
            <li
              class="active"
              v-for="(nav, index) in floor.navList"
              :key="index"
            >
              <a :href="nav.url">{{ nav.text }}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tab-content">
        <div class="tab-pane">
          <div class="floor-1">
            <div class="blockgary">
              <ul class="jd-list">
                <li v-for="(keyword, index) in floor.keywords" :key="index">
                  {{ keyword }}
                </li>
              </ul>
              <img :src="floor.imgUrl" />
            </div>
            <div class="floorBanner">
              <!-- swiper -->
              <Carousel :imageList="floor.carouselList" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[0]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[1]" />
              </div>
            </div>
            <div class="split center">
              <img :src="floor.bigImg" />
            </div>
            <div class="split">
              <span class="floor-x-line"></span>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[2]" />
              </div>
              <div class="floor-conver-pit">
                <img :src="floor.recommendList[3]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
```

## 轮播图组件问题

### 1. 问题一：Floor 组件中轮播图没法轮播

根本原因：轮播图没有触发 watch，从而没有 new Swiper，就没有轮播的功能

详细原因：

1. 为什么 ListContainer 中 Carousel 能触发？

因为 ListContainer 不是 v-for 遍历渲染的，所以初始化就会渲染，里面的子组件 Carousel 也进行了初始化渲染，只是数据是空。

后面发送请求，获取并更新新数据，会触发第二次渲染，此时数据发送了变化，触发 watch

2. 为什么 Floor 组件中 Carousel 没有触发？

因为 Floor 是 v-for 遍历渲染的，一上来没有数据，就不会遍历生成 Floor 组件。

后面发送请求，获取并更新新数据，才会进行渲染，此时 Floor 组件才完成初始化渲染，里面的子组件 Carousel 也进行了初始化渲染，数据只有第一次，没有变化，不会触发 watch

解决：让监视属性第一次就要触发

```js
// Carousel组件
watch: {
  imageList: {
    handler(imageList) {
      // 里面代码不变，此处省略
    },
    immediate: true, // 让监视属性第一次就触发
  },
},
```

### 2. 问题二：第一个轮播图触发了两次监视属性

原因：

- 第一个轮播图初始化渲染没有数据，（immediate: true）触发一次
- 后面请求得到数据，数据发生变化，又触发一次
- 触发两次就会 new 两次 Swiper，导致轮播出现 bug

解决：只能 new 一次 Swiper

```js
watch: {
  imageList: {
    handler(newVal) {
      // 首页最上面轮播图new两次，导致有bug
      // 每个轮播图只能new一次
      if (!newVal.length) return;

      this.$nextTick(() => {
        new Swiper('.swiper', {
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
      });
    },
  },
},
```

### 3. 问题三：所有轮播图还是有问题

原因：所有轮播图共享同一个类名：`.swiper`, 导致 new Swiper 时对所有轮播图都生效了，就会有 bug

解决：

- 每个容器只能 new 一次 Swiper，功能才是正常的
- 方案一：取不同类名
- 方案二：用 ref

用不同类名未来还是有重复的风险，而 ref 不会

- 给元素绑定 ref 属性

```html
<div class="swiper" ref="swiperRef"></div>
```

- 使用

```js
watch: {
  imageList: {
    handler(newVal) {
      if (!newVal.length) return;
      this.$nextTick(() => {
        // ref只能获取到自己组件的ref对应DOM元素，其他组件即使名称一致也是获取不到的
        new Swiper(this.$refs.swiperRef, {
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
      });
    },
    immediate: true,
  },
},
```

## TypeNav 显示&隐藏

### 1. Search 组件渲染 TypeNav

TypeNav 组件进行了全局注册，所以可以直接使用

```vue
<template>
  <div>
    <TypeNav />
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav";

export default {
  // 组件名称：将来vue开发者调试工具能看到
  name: "SSearch",
  components: {
    TypeNav,
  },
};
</script>
```

### 2. TypeNav 默认隐藏，移入显示，移出隐藏

1. 默认隐藏

```js
data() {
  return {
    isShow: false
  }
}
```

```vue
<div class="sort" v-if="isShow"></div>
```

2. 移入显示，移出隐藏

```vue
<div class="nav-left" @mouseleave="isShow = false">
  <h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
</div>
```

### 3. 首页要一直显示

```vue
<div class="sort" v-if="$route.path === '/home' || isShow"></div>
```

## 点击搜索携带 keyword 参数

### 1. 收集 keyword 数据

```js
data() {
  return {
    keyword: ''
  }
}
```

```html
<input type="text" class="header-search-input" v-model="keyword" />
```

### 2. 点击携带参数

```js
toSearch() {
  this.$router.push({
    name: "Search",
    query: {
      keyword: this.keyword,
    },
  });
}
```

### 3. 解决重复点击报错

VueRouter 提供的跳转路由方法（push），如果重复跳转到同一个路径，会报错

改用 history 上的 push 方法，就不会报错了

```js
this.$router.history.push({
  name: "Search",
  query: {
    keyword: this.keyword,
  },
});
```

## 同时携带分类和关键字参数

### 1. 携带分类参数的同时，携带关键字参数

```js
// TypeNav组件
toSearch(e) {
  const { id, name, level } = e.target.dataset;

  if (!name) return;

  this.$router.history.push({
    name: "Search",
    query: {
      categoryName: name,
      [`category${level}Id`]: id,
      ...this.$route.query
    },
  });
},
```

### 2. 携带关键字参数的同时，携带分类参数

```js
toSearch() {
  this.$router.history.push({
    name: "Search",
    query: {
      keyword: this.keyword,
      ...this.$route.query
    }
  });
},
```

### 3. 问题一：关键字参数一开始有值，后面没有值，搜索时关键字参数不变

```js
toSearch() {
  const query = {
    // 读取当前的query参数，如果有query参数，携带上，，没有就不携带
    ...this.$route.query,
    keyword: this.keyword,
  };
  if (!this.keyword) {
    // 删除对象的属性
    delete query.keyword;
  }
  this.$router.history.push({
    name: "Search",
    query,
  });
},
```

### 4. 问题二：分类参数多次点击，可能会携带多个分类 id

```js
toSearch(e) {
  const { id, name, level } = e.target.dataset;

  if (!id) return;

  const query = {
    categoryName: name,
    [`category${level}Id`]: id,
  };

  const keyword = this.$route.query.keyword;

  if (keyword) {
    query.keyword = keyword;
  }

  this.$router.push({
    name: "Search",
    query,
  });
},
```

## 搜索页面

### 1. 静态组件

从 项目资料 - 静态组件 中复制 Search 组件内容使用即可

### 2. 数据动态展示

1. 定义请求接口函数

```js
import request from "@/utils/request";

// 搜索商品列表
export const reqSearchGoodsList = (data) => {
  return request({
    method: "POST",
    url: "/list",
    // 在我们项目中，默认情况下：
    // GET请求的参数就是query参数，POST请求参数就是body参数
    data, // body参数，请求体参数
    // params, query参数，查询字符串
  });
};
```

2. 组件发送请求，更新数据

```js
import { reqSearchGoodsList } from "@/api/search";

async mounted() {
  const res = await reqSearchGoodsList({
    pageNo: 1,
    pageSize: 5
  });
  this.attrsList = res.attrsList;
  this.goodsList = res.goodsList;
  this.trademarkList = res.trademarkList;
},
data() {
  return {
    // 品牌列表
    trademarkList: [],
    // 属性列表
    attrsList: [],
    // 商品列表
    goodsList: [],
  }
}
```

3. 数据动态展示

- 品牌数据展示

```html
<SearchSelector :trademarkList="trademarkList" />
```

```js
props: {
  trademarkList: Array,
},
```

```html
<li v-for="tm in trademarkList" :key="tm.tmId">{{ tm.tmName }}</li>
```

- 属性数据展示

```html
<SearchSelector :trademarkList="trademarkList" :attrsList="attrsList" />
```

```js
props: {
  trademarkList: Array,
  attrsList: Array,
},
```

```html
<div class="type-wrap" v-for="attr in attrsList" :key="attr.attrId">
  <div class="fl key">{{ attr.attrName }}</div>
  <div class="fl value">
    <ul class="type-list">
      <li v-for="(attrValue, index) in attr.attrValueList" :key="index">
        <a>{{ attrValue }}</a>
      </li>
    </ul>
  </div>
  <div class="fl ext"></div>
</div>
```

- 商品数据展示

```html
<li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
  <div class="list-wrap">
    <div class="p-img">
      <a><img :src="goods.defaultImg" /></a>
    </div>
    <div class="price">
      <strong>
        <em>¥</em>
        <i>{{ goods.price }}</i>
      </strong>
    </div>
    <div class="attr">
      <a>{{ goods.title }}</a>
    </div>
    <div class="commit">
      <i class="command">已有<span>2000</span>人评价</i>
    </div>
  </div>
</li>
```

### 3. 封装统一搜索函数和搜索条件

```js
mounted() {
  this.searchGoodsList();
},
data() {
  return {
    // 品牌列表
    trademarkList: [],
    // 属性列表
    attrsList: [],
    // 商品列表
    goodsList: [],
    // 存储搜索条件（未来搜索可以使用）
    searchOptions: {
      // 分类和关键字参数，可以通过this.$route.query获取
      // 分类
      // category1Id: "",
      // category2Id: "",
      // category3Id: "",
      // categoryName: "",
      // 关键字
      // keyword: "",
      // 品牌 "品牌id:品牌名称"
      trademark: "",
      // 属性 ["属性id:属性值:属性名"]
      props: [],
      // 排序 （1：综合 2：价格）（asc：升序 desc：降序）
      order: "1:desc",
      // 分页
      pageNo: 1,
      pageSize: 5,
    },
  };
},
methods: {
  // 将来有多次搜索，都要调用搜索函数，封装成函数去使用
  async searchGoodsList() {
    const res = await reqSearchGoodsList({
      ...this.searchOptions, // 品牌、属性、排序、分页参数
      ...this.$route.query, // 分类和关键字参数
    });
    this.attrsList = res.attrsList;
    this.goodsList = res.goodsList;
    this.trademarkList = res.trademarkList;
  },
}
```

### 4. 分类和关键字搜索

```js
// 分类和关键字搜索
watch: {
  $route() {
    this.searchGoodsList();
  },
},
```

### 5. 品牌搜索

1. 父组件绑定事件

```html
<SearchSelector
  :trademarkList="trademarkList"
  :attrsList="attrsList"
  @searchTrademark="searchTrademark"
/>
```

```js
// 搜索品牌
searchTrademark(trademark) {
  // 先更新搜索条件
  this.searchOptions.trademark = trademark;
  // 在搜索
  this.searchGoodsList();
},
```

2. 子组件触发事件

```html
<li v-for="tm in trademarkList" :key="tm.tmId" @click="searchTrademark(tm)">
  {{ tm.tmName }}
</li>
```

```js
searchTrademark(tm) {
  this.$emit("searchTrademark", `${tm.tmId}:${tm.tmName}`);
},
```
