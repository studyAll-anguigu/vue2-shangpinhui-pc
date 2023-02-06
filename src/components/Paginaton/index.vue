<template>
  <div class="x-pagination">
    <!-- 前一页按钮 -->
    <button type="button" class="btn-prev">
      <i class="iconfont icon-arrow-left-bold"></i>
    </button>
    <ul class="x-pager">
      <template v-for="(page, index) in pages">
        <li
          :class="['number', page === currentPage ? 'active' : '']"
          v-if="index <= 5"
          :key="page"
          @click="handleCurrentChange(page)"
        >
          {{ page }}
        </li>
      </template>
      <li class="number"><i class="iconfont icon-elipsis"></i></li>
    </ul>
    <!-- 后一页按钮 -->
    <button type="button" disabled="disabled" class="btn-next">
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
      currentPageSize: 5,
    };
  },
  computed: {
    // // 存放所有页码
    pages() {
      return Math.ceil(this.total / this.pageSize);
    },
  },
  mounted() {
    console.log('pagination pagesize:', this.pageSize);
    console.log('pagination currentPage:', this.currentPage);
    console.log('pagination pageSizeList:', this.pageSizeList);
  },
  watch: {
    total() {
      console.log('pagination total:', this.total);
    },
    currentPageSize: {
      handler(newvalue) {
        // 触发父组件改变 每页记录条数的事件
        this.$emit('changeSize', newvalue);
      },
    },
  },
  methods: {
    handleCurrentChange(crrentPage) {
      // 触发父组件的changePage事件
      this.$emit('changePage', crrentPage);
    },
    // changePageSize(pagesize) {
    //   console.log('pagination,改变了页数', pagesize);
    // },
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
  background-color: #409eff;
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
