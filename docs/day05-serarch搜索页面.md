# day05

## 搜索页面

### 1. 属性搜索

1. 父组件绑定事件

```html
<!-- 搜索器 -->
<SearchSelector
  :trademarkList="trademarkList"
  :attrsList="attrsList"
  @searchTrademark="searchTrademark"
  @searchProp="searchProp"
/>
```

```js
// 属性搜索
searchProp(prop) {
  this.searchOptions.props.push(prop);
  this.searchGoodsList();
},
```

2. 子组件触发事件

```html
<li
  v-for="(attrValue, index) in attr.attrValueList"
  :key="index"
  @click="searchProp(attr.attrId, attrValue, attr.attrName)"
>
  <a>{{ attrValue }}</a>
</li>
```

```js
searchProp(attrId, attrValue, attrName) {
  this.$emit("searchProp", `${attrId}:${attrValue}:${attrName}`);
},
```

### 2. 解决搜索的重复条件问题

```js
// 品牌搜索
searchTrademark(tm) {
  // 如果点击的是同一个品牌，就不重新搜索了
  if (this.searchOptions.trademark === tm) return;
  this.searchOptions.trademark = tm;
  this.searchGoodsList();
},
// 属性搜索
searchProp(prop) {
  if (this.searchOptions.props.includes(prop)) return;
  this.searchOptions.props.push(prop);
  this.searchGoodsList();
},
```

### 3. 搜索条件的展示

```html
<li class="with-x" v-if="$route.query.categoryName">
  分类：{{ $route.query.categoryName }}<i>×</i>
</li>
<!-- 关键字 -->
<li class="with-x" v-if="$route.query.keyword">
  关键字：{{ $route.query.keyword }}<i>×</i>
</li>
<!-- 品牌 -->
<li class="with-x" v-if="searchOptions.trademark">
  品牌：{{ searchOptions.trademark.split(":")[1] }}<i>×</i>
</li>
<!-- 属性 -->
<li class="with-x" v-for="(prop, index) in searchOptions.props" :key="prop">
  {{ prop.split(":")[2] }}: {{ prop.split(":")[1] }}<i>×</i>
</li>
```

### 4. 搜索条件的删除

```html
<!-- 分类 -->
<li class="with-x" v-if="$route.query.categoryName">
  分类：{{ $route.query.categoryName }}<i @click="delCategory">×</i>
</li>
<!-- 关键字 -->
<li class="with-x" v-if="$route.query.keyword">
  关键字：{{ $route.query.keyword }}<i @click="delKeyword">×</i>
</li>
<!-- 品牌 -->
<li class="with-x" v-if="searchOptions.trademark">
  品牌：{{ searchOptions.trademark.split(":")[1] }}
  <i @click="delTrademark">×</i>
</li>
<!-- 属性 -->
<li class="with-x" v-for="(prop, index) in searchOptions.props" :key="prop">
  {{ prop.split(":")[2] }}: {{ prop.split(":")[1] }}
  <i @click="delProp(index)">×</i>
</li>
```

```js
// 删除分类参数
delCategory() {
  this.$router.push({
    name: "Search",
    query: {
      keyword: this.$route.query.keyword,
    },
  });
},
// 删除关键字参数
delKeyword() {
  this.$router.push({
    name: "Search",
    query: {
      ...this.$route.query,
      keyword: undefined, // undefined参数不会再页面显示
    },
  });
},
// 删除品牌参数
delTrademark() {
  this.searchOptions.trademark = "";
  this.searchGoodsList();
},
// 删除属性参数
delProp(index) {
  this.searchOptions.props.splice(index, 1);
  this.searchGoodsList();
},
```

## 排序搜索

### 1. 介绍

排序搜索参数 order，它分为两部分组成：

1. orderType

- 1：综合
- 2：价格

2. orderFlag

- asc：升序
- desc：降序

### 2. 引入字体图标使用

1. 去阿里巴巴矢量图标库找图标，下载到本地使用

https://www.iconfont.cn/

2. 引入 iconfont.css 和字体文件

3. main.js 中引入 iconfont.css, 让字体图标生效

4. 在 Search 组件使用字体图标

### 3. 排序高亮显示

1. 绑定事件

```html
<li @click="setOrder('1')">综合</li>

<li @click="setOrder('2')">价格</li>
```

**注意数据类型是字符串**

2. 指定回调函数

```js
// 设置排序
setOrder(orderType) {
  const [, oldOrderFlag] = this.searchOptions.order.split(":");
  this.searchOptions.order = `${orderType}:${oldOrderFlag}`;
},
```

3. 通过 vue 开发者调试工具可以查看数据是否更新到位

注意：有时候 vue 开发者调试工具更新不会及时显示，要刷新一下

4. 设置类名 active

```html
<li
  :class="{
    active: searchOptions.order.split(':')[0] === '1',
  }"
>
  <a>综合</a>
</li>

<li
  :class="{
    active: searchOptions.order.split(':')[0] === '2',
  }"
>
  <a>价格</a>
</li>
```

### 4. 排序图标切换

总结：

1. 点击相同的，取反
2. 点击不同的，用 desc

```js
// 设置排序
setOrder(orderType) {
  let [oldOrderType, oldOrderFlag] = this.searchOptions.order.split(':');
  /*
    点击相同的取反
    点击不同的降序
  */
  if (oldOrderType === orderType) {
    oldOrderFlag = oldOrderFlag === "asc" ? "desc" : "asc";
  } else {
    oldOrderFlag = "desc";
  }
  // 更新了搜索条件
  this.searchOptions.order = `${orderType}:${oldOrderFlag}`;
}
```

3. 设置图标显示&隐藏

```html
<li
  @click="setOrder('1')"
  :class="{ active: searchOptions.order.split(':')[0] === '1' }"
>
  <a>
    综合
    <i
      class="iconfont icon-direction-up"
      v-show="searchOptions.order.split(':')[0] === '1'"
    ></i>
  </a>
</li>

<li
  @click="setOrder('2')"
  :class="{ active: searchOptions.order.split(':')[0] === '2' }"
>
  <a>
    价格
    <i
      class="iconfont icon-direction-up"
      v-show="searchOptions.order.split(':')[0] === '2'"
    ></i>
  </a>
</li>
```

4. 设置图标升序降序

```html
<li
  @click="setOrder('1')"
  :class="{ active: searchOptions.order.split(':')[0] === '1' }"
>
  <a>
    综合
    <span
      :class="[
        'iconfont',
        `icon-direction-${
          searchOptions.order.split(':')[1] === 'asc'
            ? 'up'
            : 'down'
        }`,
      ]"
      v-show="searchOptions.order.split(':')[0] === '1'"
    ></span>
  </a>
</li>

<li
  @click="setOrder('2')"
  :class="{ active: searchOptions.order.split(':')[0] === '2' }"
>
  <a>
    价格
    <span
      :class="[
        'iconfont',
        `icon-direction-${
          searchOptions.order.split(':')[1] === 'asc'
            ? 'up'
            : 'down'
        }`,
      ]"
      v-show="searchOptions.order.split(':')[0] === '2'"
    ></span>
  </a>
</li>
```

### 5. 使用计算属性优化

`searchOptions.order.split(':')` 使用了太多次了，使用计算属性优化

1. 定义计算属性

```js
computed: {
  order() {
    return this.searchOptions.order.split(":");
  }
},
```

2. 使用

```html
<li @click="setOrder('1')" :class="{ active: order[0] === '1' }">
  <a>
    综合
    <span
      :class="[
        'iconfont',
        `icon-direction-${
          order[1] === 'asc' ? 'up' : 'down'
        }`,
      ]"
      v-show="order[0] === '1'"
    ></span>
  </a>
</li>

<li @click="setOrder('2')" :class="{ active: order[0] === '2' }">
  <a>
    价格
    <span
      :class="[
        'iconfont',
        `icon-direction-${
          order[1] === 'asc' ? 'up' : 'down'
        }`,
      ]"
      v-show="order[0] === '2'"
    ></span>
  </a>
</li>
```

```js
// 设置排序
setOrder(orderType) {
  let [oldOrderType, oldOrderFlag] = this.order;
  /*
    点击相同的取反
    点击不同的降序
  */
  if (oldOrderType === orderType) {
    oldOrderFlag = oldOrderFlag === "asc" ? "desc" : "asc";
  } else {
    oldOrderFlag = "desc";
  }
  // 更新了搜索条件
  this.searchOptions.order = `${orderType}:${oldOrderFlag}`;
}
```

### 6. 请求数据展示

```js
// 设置排序
setOrder(orderType) {
  let [oldOrderType, oldOrderFlag] = this.order;
  /*
    点击相同的取反
    点击不同的降序
  */
  if (oldOrderType === orderType) {
    oldOrderFlag = oldOrderFlag === "asc" ? "desc" : "asc";
  } else {
    oldOrderFlag = "desc";
  }
  // 更新了搜索条件
  this.searchOptions.order = `${orderType}:${oldOrderFlag}`;
  // 获取数据展示
  this.searchGoodsList();
}
```

## 分页搜索

### 1. 使用 element-ui 分页器完成

1. 安装 element-ui

- `vue add element`
- 选择按需加载（Import on demand）和中文（zh-CN）
- 将 App.vue 修改的内容，撤销掉（改回原来写的内容）

2. 引入分页器组件

```js
// plugins/element.js
import Vue from "vue";
import { Pagination } from "element-ui";

// 对组件进行全局注册
Vue.use(Pagination);
```

3. 使用

```html
<el-pagination
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
  :current-page="searchOptions.pageNo"
  :page-sizes="[5, 10, 15, 20]"
  :page-size="searchOptions.pageSize"
  layout="prev, pager, next, sizes, total"
  :total="total"
  background
>
</el-pagination>
```

```js
data() {
  return {
    // 其他省略
    total: 0
  }
},
methods: {
  async searchGoodsList() {
    const res = await reqSearchGoodsList({
      ...this.searchOptions,
      ...this.$route.query,
    });
    this.attrsList = res.attrsList;
    this.goodsList = res.goodsList;
    this.trademarkList = res.trademarkList;
    this.total = res.total; // 更新总数
  },
  // 当页码发送变化触发的函数
  handleCurrentChange(currentPage) {
    this.searchOptions.pageNo = currentPage;
    this.searchGoodsList();
  },
  // 当每页条数发生触发的函数
  handleSizeChange(pageSize) {
    this.searchOptions.pageSize = pageSize;
    this.searchGoodsList();
  },
}
```

### 2. 自己定义分页器

1. 定义分页器组件，Search 使用

- components/Pagination/index.vue
- Search 组件引入-注册-使用

2. 定义 Pagination 静态组件

```vue
<template>
  <div class="s-pagination">
    <button type="button" class="btn-prev number">
      <i class="iconfont icon-arrow-left-bold"></i>
    </button>

    <ul class="s-pager">
      <li class="number">1</li>
      <li class="number iconfont icon-elipsis"></li>
      <li class="number">3</li>
      <li class="number">4</li>
      <li class="number active">5</li>
      <li class="number">6</li>
      <li class="number">7</li>
      <li class="number iconfont icon-elipsis"></li>
      <li class="number">10</li>
    </ul>

    <button type="button" disabled="disabled" class="btn-next number">
      <i class="iconfont icon-arrow-right-bold"></i>
    </button>

    <select class="s-pagination__sizes">
      <option value="5">5条/页</option>
      <option value="10">10条/页</option>
      <option value="15">15条/页</option>
    </select>

    <span class="s-pagination__total">共 400 条</span>
  </div>
</template>

<script>
export default {
  name: "SPagination",
};
</script>

<style lang="less" scoped>
.s-pagination {
  display: flex;
  align-items: center;
  white-space: nowrap;
  padding: 2px 5px;
  color: #303133;
  font-weight: 700;
}

.s-pager {
  display: flex;
}

.number {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  text-align: center;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  &:hover:not(.active, .btn-next, .btn-prev) {
    color: #e1251b;
  }
}
.active {
  background-color: #e1251b;
  color: #fff;
}

.btn-prev,
.btn-next {
  cursor: pointer;
  margin: 0;
  outline: none;
  border: none;
}

.s-pagination__sizes {
  outline: none;
  margin: 0 20px;
  height: 28px;
}

.s-pagination__total {
  font-weight: 400;
  color: #606266;
  font-size: 13px;
}
</style>
```
