<template>
  <div class="swiper" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in imglist" :key="img.id">
        <img :src="img.imgUrl" alt="banner" />
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
// import 'swiper/swiper-bundle.min.css';
// import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';

// 按需引入 模块 以及 对应的样式
import Swiper, { Pagination, Navigation, Autoplay } from 'swiper';
import 'swiper/css'; // 默认导出的swiper
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

export default {
  name: 'XCarousel',
  props: {
    imglist: {
      type: Array, // 指定接收数据的类型为数组
      required: true, //不需要传数据过来
    },
  },
  components: {},
  mounted() {},
  watch: {
    imglist: {
      handler(newValue) {
        // console.log('crousel监听到了数据变化', this.imglist);
        // 数据为空时，退出
        if (!newValue.length) return;

        this.$nextTick(() => {
          new Swiper(this.$refs.swiper, {
            loop: true, // 循环播放
            modules: [Pagination, Navigation, Autoplay],
            autoplay: {
              pauseOnMouseEnter: true, // 鼠标进入时，停止播放
              disableOnInteraction: false, // 设置为false，自动播放将不会在用户交互(滑动)后被禁用，每次交互后都会重新启动
            },
            // 左右箭头
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            // 指示灯（小圆点）
            pagination: {
              el: '.swiper-pagination',
              type: 'bullets',
            },
          });
        });
      },
      immediate: true,
    },
  },
};
</script>
<style scoped></style>
<!-- 
总结：
1、获取数据
在mounted阶段new Swiper
- 存在问题： 拿不到数
- 原因：
    与渲染顺序有关。
    这里拿不到不到数据，因为根据vue的渲染顺序，是先渲染子组件，再渲染它的父组件（自内向外渲染）。
    而在渲染这个组件时，imglist的数据来自父亲，可这时候父组件还没有走到发送请求数据那个阶段，因此imglist传过来是一个空数组
    那么这里的imglist 就是一个空数组
- 如何解决？
    既然在mounted阶段拿不到，那我们就通过watch属性来监听数据的变化。
    虽然第一次还是一个空数组，没有数据。
    但是只要它的父组件执行完毕时，就会改变imglist 的值，那么就会触发更新子组件的内容
    子组件也监听到了imglist的数据变化，就会执行响应的操作。那么我们就是拿到真实的数据去渲染了。

2、图片渲染
  - 存在问题：拿到数据了，但是img的还是报 404 的错误，显示不出来。
  - 原因：这个与图片是否被打包成功的原因。一开始并没有发起请求，数据没有回来，则图片就不会被打包。
          因为在父组件中我们是通过 v-for遍历组件而已并没有真正引用img （没有像 <img src='xxxxx'>形式引用）
          所以没有打包img，
  - 解决方案：
          把存放img图片的文件放到public文件下。
          因为public文件下的内容，不管有没有使用，都会被打包出去。并且是会原样输出，不会变的。
        
3、 轮播图小圆点指示灯，第一次滚动到最后一个时就不会变了问问题。
  - 原因 ： 更新数据操作是同步的，但是更新页面操作时异步的。
  - 解决方法：
      把new swiper放在 this.$nextTick函数里面。
      等页面真正渲染完成之后，在执行函数里面的操作
      
-4、 拓展：
his.$nextTicl()函数的作用：主要把函数里面的操作放入回调队列里面。并没有直接修改数据的功能，
仅仅把函数里面的操作放入一个异步回到队列，先执行其它同步的任务后，在执行这个函数的操作。


4、多次服用crousel组件时，其他服用的轮播图不会自动播放。
- 现象： 除了第一个轮播正常，其他轮播不正常。
- 原因： crousel组件只会触发一次,只有第一次引用这个crousel组件时，才会触发。
- 解决 ： 开启立即执行，immdeiate:true


5、我们只服用了三次，但是复发了四次监听
- 原因： 第一个组件触发了两次，第一个渲染没有值的时候也触发了一次
- 解决方案： 判断数组是否为空

6、复用组件时，指示灯显示顺序错乱
- 现象：所有复用的轮播图都能正常自动轮播切换，但是轮播图底部对应的指示灯就出现了混乱，顺序对不上。
- 原因：因为 new Swiper 我们使用类名，如果我们使用类名的话。就是把所有使用了该类名的的轮播都会拿来创建。
- 解决方案： 使用ref ，拿到真实的dom元素，ref类似id，都是唯一的数据。
-->
