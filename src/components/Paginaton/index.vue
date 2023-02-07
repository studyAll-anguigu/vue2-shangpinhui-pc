<template>
  <div class="x-pagination">
    <!-- 前一页按钮 -->
    <button
      type="button"
      class="btn-prev"
      @click="prev"
      :disabled="myCurrentPage === 1"
    >
      <i class="iconfont icon-arrow-left-bold"></i>
    </button>
    <ul class="x-pager">
      <li
        :class="['number', myCurrentPage === 1 ? 'active' : '']"
        @click="myCurrentPage = 1"
      >
        1
      </li>
      <li class="number" v-if="startEnd.start > 2">
        <i class="iconfont icon-elipsis"></i>
      </li>
      <template>
        <li
          v-for="(page, index) in midlePagesNumber"
          :class="[
            'number',
            myCurrentPage === startEnd.start + index ? 'active' : '',
          ]"
          :key="startEnd.start + index"
          @click="myCurrentPage = startEnd.start + index"
        >
          {{ startEnd.start + index }}
        </li>
      </template>
      <li class="number" v-if="startEnd.end < totalPages - 1">
        <i class="iconfont icon-elipsis"></i>
      </li>
      <li
        class="number"
        :class="['number', myCurrentPage === this.totalPages ? 'active' : '']"
        @click="myCurrentPage = totalPages"
        v-if="totalPages > 1"
      >
        {{ totalPages }}
      </li>
    </ul>
    <!-- 后一页按钮 -->
    <button
      type="button"
      class="btn-next"
      @click="next"
      :disabled="myCurrentPage === totalPages"
    >
      <i class="iconfont icon-arrow-right-bold"></i>
    </button>
    <!-- 切换每页记录条数 -->
    <span class="x-pagination__sizes">
      <select v-model="currentPageSize">
        <option
          :value="numer"
          v-for="(numer, index) in pageSizeList"
          :key="index"
        >
          {{ numer }}页/条
        </option>
      </select>
    </span>
    <!-- 跳转到某一页 -->
    <span class="x-pagination__jump">
      前往
      <div class="x-input x-pagination__editor is-in-pagination">
        <input
          type="number"
          autocomplete="off"
          min="1"
          max="4"
          class="x-input__inner"
        />
      </div>
      页
    </span>

    <span class="x-pagination__total">共 {{ total }} 条</span>
  </div>
</template>

<script>
/*  
总结：

1、渲染中间分页的按钮 
目的 : 计算中间按钮遍历时开始值 和 结束 值，注意  ：  排除第一页 和最后一页。 这两个已经写死了
          
        场景1： 正常情况
          1 ... 3 4 [5] 6 7 ... 34

          计算结果：
            start = 5 - 2 = 3
            end = 3 + 4 = 7

        场景2： 当前页码是 第1 、2、3页时
          1 [2] 3 4 5 6 ... 34
          [1] 2 3 4 5 6 ... 34

          计算结果：
            start = 2 - 2 = 0 < 2 = 2
            end = 2 + 4 = 6

        场景3：当前页 时在最后三页中的其中 一页
          1 ... 29 30 31 32 [33] 34

          计算结果：
            start = 33 - 2 = 31
            end = 31 + 4 = 35 > 33 = 33

        场景4: 总页数少时 （少于7页）
          1 2 [3] 4 5

        场景5： 总页数只有 1，2页
          1 [2]
          [1]
*/
export default {
  name: 'XPagination',
  props: {
    // 记录总数
    total: {
      type: Number,
      required: true,
    },
    // 每页记录条数
    pageSize: {
      type: Number,
      required: true,
    },
    // 当前页码
    currentPage: {
      type: Number,
      required: true,
    },
    // 页码的数组
    pageSizeList: {
      type: Array,
    },
  },
  data() {
    return {
      currentPageSize: 5, // 默认每页记录条数
      myCurrentPage: this.currentPage,
      myPageSize: this.pageSize,
    };
  },
  computed: {
    // 总页码数
    totalPages() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 中间按钮
    startEnd() {
      // 场景1 ： 正常场景 ， 中间显示5个按钮
      let start = this.myCurrentPage - 2; // 默认从 第二个元素开始  start = 1-2 = -1
      if (start < 2) start = 2; // start的最小值

      let end = start + 4;
      // // end的最大值 , end > 总页数
      if (end >= this.totalPages) {
        end = this.totalPages - 1; // 让end一直等于最大值
        start = end - 4;
      }

      // 场景4 ： 少于 7个
      if (this.totalPages < 7) {
        start = 2;
        end = this.totalPages - 1;
      }
      if (this.totalPages < 2) {
        start = 2;
        end = 1;
      }

      return {
        start,
        end,
      };
    },
    // 需要遍历几次
    midlePagesNumber() {
      return this.startEnd.end - this.startEnd.start + 1;
    },
  },

  watch: {
    // 监听 每页记录条数
    currentPageSize: {
      handler(newvalue) {
        // 触发父组件改变 每页记录条数的事件
        // console.log('监听到了pagesize的变化：', newvalue);
        this.$emit('changeSize', newvalue);
        // 只要执行了改变页码，就让它从第一页开始显示。
        this.myCurrentPage = 1;
      },
    },
    myCurrentPage(currenpage) {
      // console.log('监听到了currentPage的变化', currenpage);
      this.myCurrentPage = currenpage;
      this.$emit('changePage', currenpage);
    },
  },
  methods: {
    // 上一页
    prev() {
      console.log('pre');
      if (this.myCurrentPage < 1) return false;
      this.$emit('changePage', this.myCurrentPage--);
    },
    // 下一页
    next() {
      console.log('next');
      if (this.myCurrentPage > this.totalPages) return false;
      this.$emit('changePage', this.myCurrentPage++);
    },
  },
};
</script>

<style lang="less" scoped>
.x-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
}
.x-pager {
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
  font-weight: 700;
  cursor: pointer;
  &:hover:not(.active) {
    background: #409eff;
    color: #fff;
  }
}
.active {
  background-color: #e1251b;
  color: #fff;
}
.btn-prev,
.btn-next {
  margin: 0 5px;
  background-color: #f4f4f5;
  color: #606266;
  min-width: 30px;
  border-radius: 2px;
  outline: none;
  border: none;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  &:disabled {
    background-color: #fff;
    cursor: not-allowed;
  }
}
.x-pagination__jump {
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-weight: 400;
  color: #606266;
  margin-right: 15px;
}

.x-pagination__sizes {
  margin: 0 10px 0 0;
  font-weight: 400;
  color: #606266;
}
select {
  outline: none;
  border: 1px solid #ddd;
  height: 28px;
  option {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding: 0 15px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    width: 100%;
  }
}
</style>
