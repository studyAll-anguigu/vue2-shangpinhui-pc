<template>
  <div class="swiper" ref="swiperEl">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(img, index) in skuImageList"
        :key="img.id"
      >
        <img
          :src="img.imgUrl"
          :class="{
            active: currenImgIndex === index,
          }"
          @mouseenter="setCurrenImgIndex(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
export default {
  name: 'ImageList',
  props: {
    skuImageList: {
      type: Array,
      default: () => [], // 默认一个空数组
    },
    currenImgIndex: {
      type: Number,
      required: true,
    },
  },
  mounted() {},
  watch: {
    skuImageList() {
      this.$nextTick(() => {
        console.log('图片列表', this.skuImageList);
        new Swiper(this.$refs.swiperEl, {
          modules: [Navigation],
          // 左右箭头
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          slidesPerView: 5, // 一页显示5张轮播图片
          slidesPerGroup: 1, // 每次滚动时，滚动一张图片
          spaceBetween: 10,
        });
      });
    },
  },
  methods: {
    setCurrenImgIndex(index) {
      this.$emit('setCurrenImgIndex', index);
    },
  },
};
</script>

<style lang="less" scoped>
.swiper {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;
    // margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
