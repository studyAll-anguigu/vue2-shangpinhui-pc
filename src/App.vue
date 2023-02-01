<template>
  <div>
    <XHeader></XHeader>
    <!-- 展示路由组件 -->
    <router-view></router-view>
    <XFooter></XFooter>
  </div>
</template>
<script>
import XFooter from '@/components/Footer';
import XHeader from '@/components/Header';

export default {
  components: { XFooter, XHeader },
};
</script>

<style lang="less"></style>
