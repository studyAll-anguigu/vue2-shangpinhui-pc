<template>
  <div class="x-pagination">
    <!-- 前一页 -->
    <button type="button" class="btn-prev">
      <i class="iconfont icon-arrow-left-bold"></i>
    </button>
    <ul class="x-pager">
      <li class="number">1</li>
      <li class="number">2</li>
      <li class="number">3</li>
      <li class="number"><i class="iconfont icon-elipsis"></i></li>
      <li class="number">7</li>
      <li class="number">8</li>
      <li class="number">9</li>
      <li class="number">10</li>
      <li class="number"><i class="iconfont icon-elipsis"></i></li>
      <li class="number active">20</li>
    </ul>
    <!-- 后一页 -->
    <button type="button" disabled="disabled" class="btn-next">
      <i class="iconfont icon-arrow-right-bold"></i>
    </button>
    <!-- 切换每页记录条数 -->
    <span class="x-pagination__sizes">
      <select>
        <option value="5">5页/条</option>
        <option value="10">10页/条</option>
        <option value="15">15页/条</option>
        <option value="20">20页/条</option>
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

    <span class="x-pagination__total">共 400 条</span>
  </div>
</template>

<script>
export default {
  name: 'XPagination',
  data() {
    return {
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
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
.x-pagination__jump {
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
