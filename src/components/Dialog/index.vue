<template>
  <!-- 弹框组件 -->
  <div class="diaglog" v-show="visible">
    <div class="mask" @click.self="close">
      <div class="diaglog-content">
        <div class="dialog-header">
          <span class="dialog-title">{{ title }}</span>
          <span class="dialog-close" @click="close">X</span>
        </div>
        <div class="dialog-content">
          <!-- 中间内容 -->
          <slot></slot>
        </div>
        <div class="dialog-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XDiglog',
  props: {
    title: {
      type: String,
      default: '标题',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: '50%',
    },
  },
  watch: {
    visible: {
      handler(newVal) {
        console.log('visible：', newVal);
        // 弹框出来时，禁用外面的滚动条
        if (newVal) {
          document.documentElement.style.overflow = 'hidden';
        } else {
          document.documentElement.style.overflow = 'auto';
        }
      },
      immediate: true,
    },
  },
  data() {
    return {};
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto';
  },
};
</script>

<style lang="less" scoped>
.diaglog {
  position: relative;
}
.mask {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  border: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.diaglog-content {
  width: 30%;
  background: #fff;
  padding: 20px;
  border-radius: 5px;
}
.dialog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.dialog-title {
  font-size: 18px;
  color: #666;
}
.dialog-close {
  font-size: 16px;
  color: gray;
  &:hover {
    cursor: pointer;
    color: red;
  }
}
.dialog-content {
  margin: 30px 0px;
  font-size: 14px;
}
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button {
    font-size: 14px;
    padding: 5px 20px;
    background: #409eff;
    color: #fff;
    border: none;
    border-radius: 5px;
    outline: none;
    margin-left: 5px;
  }
}
</style>
