<template>
  <div class="footer">
    <div class="footer-main">
      <div class="footer-top">
        <div>
          <span>购物指南</span>
          <span>购物流程</span>
          <span>会员介绍</span>
          <span>生活旅行/团购</span>
          <span>常见问题</span>
          <span>购物指南</span>
        </div>
        <div>
          <span>配送方式</span>
          <span>上门自提</span>
          <span>211限时达</span>
          <span>配送服务查询</span>
          <span>配送费收取标准</span>
          <span>海外配送</span>
        </div>
        <div>
          <span>支付方式</span>
          <span>货到付款</span>
          <span>在线支付</span>
          <span>分期付款</span>
          <span>邮局汇款</span>
          <span>公司转账</span>
        </div>
        <div>
          <span>特色服务</span>
          <span>夺宝岛</span>
          <span>DIY装机</span>
          <span>延保服务</span>
          <span>尚品汇E卡</span>
          <span>尚品汇通信</span>
        </div>
        <div>
          <span>帮助中心</span>
          <span><img src="./images/helper.jpg" alt="" /></span>
        </div>
      </div>
      <div class="footer-bottom">
        <p>
          <span>关于我们</span>
          <span>联系我们</span>
          <span>关于我们</span>
          <span>商家入驻</span>
          <span>营销中心</span>
          <span>友情链接</span>
          <span>关于我们</span>
          <span>营销中心</span>
          <span>友情链接</span>
          <span>关于我们</span>
        </p>
        <p>地址：北京市昌平区宏福科技园综合楼6层</p>
        <p>京ICP备19006430号</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'XFooter',
};
</script>
<style scoped>
.footer {
  background: #eaeaea;
  display: flex;
  justify-content: center;
}

.footer-main {
  min-width: 1200px;
  align-items: center;
  padding: 20px 0px;
}
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  padding-bottom: 35px;
}
.footer-top div {
  display: flex;
  flex-direction: column;
}
.footer-top div span {
  display: block;
  font-size: 12px;
  color: #333;
  margin-top: 5px;
}
.footer-top div span:first-child {
  font-size: 14px;
}

.footer-bottom {
  border-top: 1px solid #ddd;
  padding-top: 10px;
}
.footer-bottom p {
  text-align: center;
  font-size: 13px;
}
.footer-bottom p span {
  border-right: 1px solid #000;
  margin-right: 5px;
  padding-right: 5px;
}

.footer-bottom p span:last-child {
  border-right: none;
}
</style>
