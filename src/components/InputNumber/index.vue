<template>
  <div class="controls">
    <input
      autocomplete="off"
      class="itxt"
      :value="currentNum"
      @blur="setCurrentNumber"
    />
    <div class="button">
      <button
        class="plus"
        @click="updateNumber(1)"
        :disabled="currentNum === max"
      >
        +
      </button>
      <button
        class="mins"
        @click="updateNumber(-1)"
        :disabled="currentNum === min"
      >
        -
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputNumber',
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
  },
  data() {
    return {
      currentNum: this.min,
    };
  },
  methods: {
    // 点击按钮
    updateNumber(number) {
      this.currentNum += number;
      this.$emit('input', this.currentNum); // 触发组件绑定的unput事件
    },
    setCurrentNumber(e) {
      this.currentNum = e.target.value;
    },
  },
  watch: {
    currentNum(newValue, oldValue) {
      const { min, max } = this;
      let num = Math.round(newValue);

      // 如果输入大于最大值，则等于最大值
      if (num > max) num = max;
      if (num < min) num = min;

      // 如果输入非数字类型，则 NAN ，就让它等于上一次正确是值
      if (Number.isNaN(num)) {
        num = oldValue;
      }

      this.currentNum = num;
      // 触发父组件的ingput事件
      this.$emit('input', this.currentNum);
    },
  },
};
</script>

<style lang="less" scoped>
.controls {
  width: 50px;
  position: relative;
  margin-right: 15px;
  display: flex;
  .button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .itxt {
    width: 38px;
    height: 37px;
    border: 1px solid #ddd;
    color: #555;
    float: left;
    text-align: center;
    outline: none;
  }

  .plus,
  .mins {
    width: 15px;
    text-align: center;
    height: 17px;
    background: #f1f1f1;
    color: #666;
    border: 1px solid #ccc;
    cursor: pointer;
    &:disabled {
      cursor: not-allowed;
      color: #ddd;
    }
  }

  .mins {
    right: -8px;
    top: 19px;
    border-top: 0;
  }
}
</style>
