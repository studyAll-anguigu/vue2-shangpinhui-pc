<template>
  <div>
    <XHeader></XHeader>
    <div class="app-container">
      <!-- 展示路由组件 -->
      <router-view></router-view>
    </div>

    <!-- 如果是login和resgister就不显示 -->
    <XFooter v-if="!$route.meta.isHideFooter"></XFooter>
  </div>
</template>
<script>
import XFooter from '@/components/Footer';
import XHeader from '@/components/Header';

export default {
  name: 'App',
  components: { XFooter, XHeader },
};
</script>

<style lang="less">
.app-container {
  min-height: 42vh;
}
</style>
