<template>
  <div>
    <TypeNav />
  </div>
</template>
<script>
import TypeNav from '@/components/TypeNav';
export default {
  name: 'XSearch',
  data() {
    return {};
  },
  components: { TypeNav },
  mounted() {
    console.log('search页面收到的params:', this.$route.query);
  },
};
</script>
<style scoped></style>
