<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked"
              @change="upOnechecked($event, cart.skuId)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <!-- 
              $event:  这里就是value属性绑定的值
              变动的值，需要减去原来的skuNum,否则服务器以为增加或减少你传过去的值
             -->
            <InputNumber
              :value="cart.skuNum"
              @input="
                updateSkuNum({
                  skuId: cart.skuId,
                  newValue: $event,
                  oldValue: cart.skuNum,
                })
              "
            />
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delOneCart(cart.skuId)">删除</a>
            <br />
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          @change="updateAllchecked"
          :checked="isAllChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="delBatchCart(batchDeleteSkuIdList)">删除选中的商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNums }} </span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney"> {{ totalPrice }} </i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputNumber from '@/components/InputNumber';
import { mapState, mapActions, mapGetters } from 'vuex';
import { debounce } from 'lodash';
export default {
  name: 'ShopCart',
  data() {
    return {};
  },
  components: { InputNumber },
  computed: {
    // 把vuex中shopCart模块下的cartInfoList 数据映射到 当前组件的计算属性中。
    // 在当前组件中可以通过this.cartInfoList 使用数据
    ...mapState('shopCart', ['cartInfoList']),

    // 把vuex中的所有格gegters映射到当前组件
    ...mapGetters('shopCart', [
      'isAllChecked',
      'batchDeleteSkuIdList',
      'totalNums',
      'totalPrice',
    ]),
  },
  mounted() {
    //方法1、 直接触发vuex中的action    获取购物测列表
    // this.$store.dispatch('shopCart/getCartList');

    // 方法2、 调用通过mapActions映射进来的方法取 获取数据 （推荐，最好） 。
    this.getCartList();
    console.log('已选总数', this.totalNums);
  },
  methods: {
    // 将vuex中的actinn映射到当前组件的methoss中，当前组件通过this.xxxx调用方法
    ...mapActions('shopCart', [
      'getCartList',
      'UpdateOnecheckCart',
      'UpdateAllcheckCart',
      'updateCartSkuNum',
      'delOneCart',
      'delBatchCart',
    ]),

    // 防抖优化，只触发最后一次，避免多次连续改变时，改变的值不对
    updateSkuNum: debounce(function (args) {
      this.updateCartSkuNum(args);
    }, 200),

    // 单个商品 选 与 取消勾选
    upOnechecked(e, skuId) {
      this.UpdateOnecheckCart({ skuId, isChecked: e.target.checked });
    },
    // 全选 、  全不选
    updateAllchecked(e) {
      let target = e.target.checked;
      this.UpdateAllcheckCart(target);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }
  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;
      & > div {
        float: left;
      }
      .cart-th1 {
        width: 25%;
        input {
          vertical-align: middle;
        }
        span {
          vertical-align: middle;
        }
      }
      .cart-th2 {
        width: 25%;
      }
      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }
    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;
      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
        & > li {
          float: left;
        }
        .cart-list-con1 {
          width: 15%;
        }
        .cart-list-con2 {
          width: 35%;
          img {
            width: 82px;
            height: 82px;
            float: left;
          }
          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }
        .cart-list-con5 {
          width: 17%;
          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }
          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
            text-decoration: none;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }
  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;
        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
          text-decoration: none;
          &hover {
            color: white !important;
          }
        }
      }
    }
  }
}
</style>
