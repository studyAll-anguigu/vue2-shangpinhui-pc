<template>
  <div>search</div>
</template>
<script>
export default {
  name: 'XSearch',
  data() {
    return {};
  },
  mounted() {
    console.log('search页面收到的params:', this.$route.query);
  },
};
</script>
<style scoped></style>
