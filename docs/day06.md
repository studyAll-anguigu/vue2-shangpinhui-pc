# day06

## 分页器

### 1. 基本功能

1. 父组件传递数据给 Pagination 使用

```vue
<Pagination
  :current-page="searchOptions.pageNo"
  :page-size="searchOptions.pageSize"
  :page-sizes="[5, 10, 15, 20]"
  :total="total"
/>
```

2. 子组件声明接受

```js
props: {
  // 外面传递prop属性其实是 current-page
  // 内部可以通过小驼峰声明接受 currentPage
  currentPage: {
    type: Number,
    default: 1,
  },
  pageSize: {
    type: Number,
    default: 5,
  },
  pageSizes: {
    type: Array,
    default: () => [5, 10, 15, 20],
  },
  total: {
    type: Number,
    default: 0,
  },
},
```

3. 子组件使用

```html
<select class="s-pagination__sizes">
  <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">
    {{ pageSize }} 条/页
  </option>
</select>

<span class="s-pagination__total">共 {{ total }} 条</span>
```

4. 计算总页数

```js
computed: {
  // 总页数
  totalPages() {
    return Math.ceil(this.total / this.pageSize);
  },
}
```

5. 使用总页数

```html
<li class="number">{{ totalPages }}</li>
```

### 2. 中间按钮的计算

```js
// 中间按钮（排除开头1，结尾总页面）
startEnd() {
  /*
    场景1：currentpage 正常
      1 ... 3 4 [5] 6 7 ... 34

      计算结果：
        start = 5 - 2 = 3
        end = 3 + 4 = 7

    场景2： currentpage 偏小
      1 [2] 3 4 5 6 ... 34
      [1] 2 3 4 5 6 ... 34

      计算结果：
        start = 2 - 2 = 0 < 2 = 2
        end = 2 + 4 = 6

    场景3： currentpage偏大
      1 ... 29 30 31 32 [33] 34

      计算结果：
        start = 33 - 2 = 31
        end = 31 + 4 = 35 > 33 = 33

    场景4:  总页数 小于 7时
      1 2 [3] 4 5

    场景5： 当页数只有1-2页时
      1 [2]

  */
  const { currentPage, totalPages } = this;

  // 解决：场景4问题
  if (totalPages <= 7) {
    return {
      start: 2,
      end: totalPages - 1,
    };
  }

  // 中间按钮开头
  let start = currentPage - 2;

  // start有最小值：2
  if (start < 2) start = 2;

  // const end = currentPage + 2;
  // 中间按钮的结尾
  let end = start + 4;

  // end有最大值
  if (end > totalPages - 1) {
    // 一旦end计算错误，start也会计算错误
    // 修改end的值
    end = totalPages - 1;
    // 修改start的值
    start = end - 4;
  }

  return {
    start,
    end,
  };
},
```

### 3. 遍历展示中间按钮数据

```
1 ... 3 4 [5] 6 7 ... 34
1 [2] 3 4 5 6 ... 34
1 ... 29 30 31 32 [33] 34
1 2 [3] 4
```

通过以上的场景，我们推导出中间按钮要遍历的数量为：end - start + 1

```html
<li
  v-for="(item, index) in startEnd.end - startEnd.start + 1"
  :key="startEnd.start + index"
  class="number"
>
  {{ startEnd.start + index }}
</li>
```

### 4. 向左/右翻页

1. 绑定点击事件

```html
<button type="button" class="btn-prev number" @click="prev"></button>
<button type="button" class="btn-next number" @click="next"></button>
```

2. 设置回调函数

```js
methods: {
  prev() {
    this.currentPage--;
  },
  next() {
    this.currentPage++;
  },
},
```

此时遇到问题：props 数据是只读的，不能直接修改

3. 定义新的 data 数据

```js
data() {
  return {
    myCurrentPage: this.currentPage,
    myPageSize: this.pageSize,
  };
},
```

4. 将所有使用 props 的地方修改为 data 数据

```js
totalPages() {
  // 使用myPageSize
  return Math.ceil(this.total / this.myPageSize);
},
startEnd() {
  // 使用myCurrentPage
  const { myCurrentPage, totalPages } = this;
  if (totalPages <= 7) {
    return {
      start: 2,
      end: totalPages - 1,
    };
  }
  let start = myCurrentPage - 2;
  if (start < 2) start = 2;
  let end = start + 4;
  if (end > totalPages - 1) {
    end = totalPages - 1;
    start = end - 4;
  }
  return {
    start,
    end,
  };
},
```

5. 完成回调函数

```js
methods: {
  prev() {
    this.myCurrentPage--;
  },
  next() {
    this.myCurrentPage++;
  },
},
```

### 5. 让当前页码的按钮高亮

```html
<li
  :class="{
    number: true,
    active: myCurrentPage === 1,
  }"
>
  1
</li>

<li
  v-for="(item, index) in startEnd.end - startEnd.start + 1"
  :key="startEnd.start + index"
  :class="{
    number: true,
    active: myCurrentPage === startEnd.start + index,
  }"
>
  {{ startEnd.start + index }}
</li>

<li
  :class="{
    number: true,
    active: myCurrentPage === totalPages,
  }"
>
  {{ totalPages }}
</li>
```

### 6. 解决总页数为 0 或 1 时的问题（场景 5）

问题：当总页数为 0 或 1 时，计算中间按钮遍历数量为负数，遍历报错，功能出现问题。

解决：当总页数为 0 或 1 时，让计算中间按钮遍历数量为 0 即可。

```js
startEnd() {
  const { myCurrentPage, totalPages } = this;
  // 解决问题
  if (totalPages <= 1) {
    return {
      start: 2,
      end: 1,
    };
  }
  if (totalPages <= 7) {
    return {
      start: 2,
      end: totalPages - 1,
    };
  }
  let start = myCurrentPage - 2;
  if (start < 2) start = 2;
  let end = start + 4;
  if (end > totalPages - 1) {
    end = totalPages - 1;
    start = end - 4;
  }
  return {
    start,
    end,
  };
},
```

### 7. 左右翻页禁用效果

```html
<button
  type="button"
  class="btn-prev number"
  :disabled="myCurrentPage === 1"
  @click="prev"
>
  <i class="iconfont icon-arrow-left-bold"></i>
</button>

<button
  type="button"
  class="btn-next number"
  :disabled="myCurrentPage >= totalPages"
  @click="next"
>
  <i class="iconfont icon-arrow-right-bold"></i>
</button>
```

```css
.btn-prev,
.btn-next {
  cursor: pointer;
  margin: 0;
  outline: none;
  border: none;
  &:disabled {
    color: #c0c4cc;
    cursor: not-allowed;
  }
}
```

### 8. 点击页码跳转至某页

```html
<li
  :class="{
    number: true,
    active: myCurrentPage === 1,
  }"
  @click="myCurrentPage = 1"
>
  1
</li>

<li
  v-for="(item, index) in startEnd.end - startEnd.start + 1"
  :key="startEnd.start + index"
  :class="{
    number: true,
    active: myCurrentPage === startEnd.start + index,
  }"
  @click="myCurrentPage = startEnd.start + index"
>
  {{ startEnd.start + index }}
</li>

<li
  :class="{
    number: true,
    active: myCurrentPage === totalPages,
  }"
  @click="myCurrentPage = totalPages"
>
  {{ totalPages }}
</li>
```

### 9. 省略号显示&隐藏

```html
<li class="number iconfont icon-elipsis" v-if="startEnd.start > 2"></li>

<li
  class="number iconfont icon-elipsis"
  v-if="startEnd.end < totalPages - 1"
></li>
```

### 10. 更新每页条数

```html
<select class="s-pagination__sizes" v-model="myPageSize">
  <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">
    {{ pageSize }} 条/页
  </option>
</select>
```

### 11. 完成分页搜索

1. 父组件给子组件绑定事件

```html
<Pagination
  :current-page="searchOptions.pageNo"
  :page-size="searchOptions.pageSize"
  :page-sizes="[5, 10, 15, 20]"
  :total="total"
  @size-change="handleSizeChange"
  @current-change="handleCurrentChange"
/>
```

2. 父组件设置回调

```js
handleSizeChange(pageSize) {
  this.searchOptions.pageSize = pageSize;
  this.searchGoodsList();
},
handleCurrentChange(currentPage) {
  this.searchOptions.pageNo = currentPage;
  this.searchGoodsList();
},
```

3. 子组件触发事件

```js
watch: {
  myCurrentPage(currentPage) {
    this.$emit("current-change", currentPage);
  },
  myPageSize(pageSize) {
    this.$emit("size-change", pageSize);
  },
},
```

4. 问题：每页条数发生变化，可能会导致当前页码超过了 totalPages

```js
myPageSize(pageSize) {
  // 每页条数发生变化，可能会导致当前页码超过了totalPages
  if (this.myCurrentPage > this.totalPages) {
    this.myCurrentPage = this.totalPages;
  }
  this.$emit("size-change", pageSize);
},
```

### 12. 优化分页搜索

连续点击下一页，会持续触发事件从而发送请求。（短时间内发送大量请求）

连续点击下一页一般只有最后一页我们需要，其他都不需要，所以使用防抖优化。

1. 下载包

文档：https://www.lodashjs.com/docs/lodash.debounce#_debouncefunc-wait0-options

```
npm i lodash
```

2. 引入

```js
// import _ from "lodash"; // 完整引入
import debounce from "lodash/debounce"; // 按需引入
```

3. 使用

```js
handleCurrentChange: debounce(
  function (currentPage) {
    this.searchOptions.pageNo = currentPage;
    this.searchGoodsList();
  },
  200,
  { maxWait: 5000 }
),
```
