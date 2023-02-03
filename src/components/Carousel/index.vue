<template>
  <div class="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="./images/banner1.jpg" alt="banner" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner2.jpg" alt="banner" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner3.jpg" alt="banner" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner3.jpg" alt="banner" />
      </div>
    </div>
    <div class="swiper-pagination"></div>

    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <div class="swiper-scrollbar"></div>
  </div>
</template>
<script>
// API文档：https://swiperjs.com/swiper-api#autoplay
// 例子：https://swiperjs.com/demos/145-css-mode/core

// 完整引入swiper
import 'swiper/swiper-bundle.esm.js';
import 'swiper/swiper-bundle.min.css';
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';

export default {
  name: 'XCarousel',
  components: {},
  mounted() {
    new Swiper('.swiper', {
      autoplay: {
        delay: 2000, // 完全切换进入的时间
        pauseOnMouseEnter: true, // 鼠标进入时，停止播放
        disableOnInteraction: false, // 设置为false，自动播放将不会在用户交互(滑动)后被禁用，每次交互后都会重新启动
      },
      speed: 1000, //切换的速度
      loop: true, // 循环播放
      modules: [Pagination, Navigation, Autoplay],
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    });
  },
};
</script>
<style scoped></style>
