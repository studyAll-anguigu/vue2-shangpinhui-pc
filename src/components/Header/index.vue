<template>
  <div class="header">
    <div class="header-top">
      <div class="header-top-main">
        <div class="header-top-left">
          尚品汇欢迎您！
          <span v-if="!$store.state.usersInfo?.token"
            >请 <router-link to="/login">登录</router-link> |
            <router-link to="/register">免费注册</router-link>
          </span>
          <span v-else>
            {{ $store.state.usersInfo.nickName }}
            <button @click="logout">退出</button>
          </span>
        </div>
        <div class="header-nav">
          <span>我的订单</span>
          <span>我的购物车</span>
          <span>我的尚品汇</span>
          <span>尚品汇会员</span>
          <span>企业采购</span>
          <span>关注尚品汇</span>
          <span>合作招商</span>
          <span>商家后台</span>
        </div>
      </div>
    </div>
    <div class="header-bottom">
      <router-link to="/home"
        ><img src="@/assets/logo.png" alt=""
      /></router-link>
      <form @submit.prevent="toSeach">
        <input type="text" v-model="keyword" />
        <button>搜索</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XHeader',
  data() {
    return {
      keyword: '',
    };
  },
  created() {
    console.log('store.state:', this.$store.state);
  },
  methods: {
    toSeach() {
      // this.$router.push : 如果使用这个方式的话，当重复点击进入相同路径的页面的时候，会报错的。但不影响功能的使用。
      this.$router.history.push({
        name: 'Search',
        query: {
          ...this.$route.query, // 保留当前路由下 的其他query参数 。并且注意顺序
          keyword: this.keyword,
        },
      });
    },
    // 退出登录
    logout() {
      console.log('退出');
      this.$router.push({
        name: 'Login',
      });
    },
  },
};
</script>
<style lang="less" scoped>
.header {
  display: flex;
  flex-direction: column;
}
.header-top {
  background: #eaeaea;
  display: flex;
  justify-content: center;
}
.header-top-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-width: 1200px;
  padding: 5px;
  font-size: 13px;
  color: #666;
}

.header-nav span {
  border-right: 1px solid #666;
  margin-right: 5px;
  padding-right: 5px;
  &:last-child {
    border-right: none;
  }
}
.header-bottom {
  display: flex;
  min-width: 1200px;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
}

.header-bottom form input {
  width: 400px;
  border: 2px solid red;
  outline: none;
  padding: 5px 10px;
}
.header-bottom form button {
  width: 70px;
  height: 32px;
  border: none;
  background: red;
  color: #fff;
}
</style>
