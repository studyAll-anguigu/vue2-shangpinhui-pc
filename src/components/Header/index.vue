<template>
  <div class="header">
    <div class="header-top">
      <div class="header-top-main">
        <span class="header-top-left">
          尚品汇欢迎您！ 请 <router-link to="/login">登录</router-link> |
          <router-link to="/register">免费注册</router-link>
        </span>
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
      <img src="@/assets/logo.png" alt="" />
      <form>
        <input type="text" />
        <button>搜索</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XHeader',
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
  padding-top: 20px;
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
