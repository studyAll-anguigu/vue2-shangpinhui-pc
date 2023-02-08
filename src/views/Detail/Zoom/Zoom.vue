<template>
  <div class="spec-preview" @mousemove="handelMouseMove">
    <img :src="imge.imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img
        :src="imge.imgUrl"
        :style="{
          left: -2 * left + 'px',
          top: -2 * top + 'px',
        }"
      />
    </div>
    <div
      class="mask"
      ref="maskEl"
      :style="{
        left: left + 'px',
        top: top + 'px',
      }"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'XZoom',
  props: {
    imge: {
      type: Object,
      required: true,
      default: () => ({}),
    },
  },
  data() {
    return {
      left: 0,
      top: 0,
    };
  },

  methods: {
    handelMouseMove(e) {
      /**
       * 最外面盒子previews盒子 ：
       *    width = 200px
       *    heigth = 200px
       * mask遮罩层  ：
       *      width = 50% 的previews = 100px
       *      heigth = 50% 的previews = 100px
       * 隐藏的大图:
       *      width = 200% 的previews = 400px
       *      heigth = 200% 的previews = 400px
       *
       * 把left 和 top 写在data里面是需要响应式修改
       * **/

      // 获取鼠标数据大图盒子的距离 . 让鼠标一直显示再mask的中间   offsetX - mask自身宽度的一般。
      let left = e.offsetX - 100;
      let top = e.offsetY - 100;

      // 求取最大值
      // 最小 的左上角（0，0）
      if (left < 0) left = 0;
      if (top < 0) top = 0;
      // 最大的 左上角 （200,200）
      if (left > 200) left = 200;
      if (top > 200) top = 200;

      this.left = left;
      this.top = top;
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
