<template>
  <div class="outer">
    <!-- 三级分类导航 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--面包屑导航-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <span href="#">全部结果</span>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类栏目 -->
            <li
              class="with-x"
              @click="delCatagory"
              v-if="$route.query.categoryName"
            >
              分类：{{ $route.query.categoryName }}<i>×</i>
            </li>
            <!-- 关键字 -->
            <li class="with-x" v-if="$route.query.keyword" @click="delKeyword">
              关键字：{{ $route.query.keyword }}<i>×</i>
            </li>
            <!-- 品牌 -->
            <li
              class="with-x"
              v-if="this.searchOptons.trademark"
              @click="delTrademark"
            >
              品牌：{{ this.searchOptons.trademark.split(':')[1] }}<i>×</i>
            </li>
            <!-- 属性 -->
            <li
              class="with-x"
              v-for="(prop, index) in this.searchOptons.props"
              :key="prop"
              @click="delAttr(index)"
            >
              属性：{{ prop.split(':')[2] }} - {{ prop.split(':')[1] }}<i>×</i>
            </li>
          </ul>
        </div>

        <!-- 搜索器 -->
        <SearchSelector
          :attrsList="attrsList"
          :trademarkList="trademarkList"
          @serchtrademark="serchtrademark"
          @serchAttr="serchAttr"
        />

        <!--商品展示区-->
        <div class="details clearfix">
          <!-- 列表操作区 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="[this.orderStr[0] === '1' ? 'active' : '']"
                  @click="setOrder('1')"
                >
                  <a>
                    综合
                    <i
                      v-show="this.orderStr[0] === '1'"
                      :class="[
                        'iconfont',
                        `icon-direction-${
                          this.orderStr[1] === 'asc' ? 'up' : 'down'
                        }`,
                      ]"
                    ></i>
                  </a>
                </li>
                <li>
                  <a>销量</a>
                </li>
                <li>
                  <a>新品</a>
                </li>
                <li>
                  <a>评价</a>
                </li>
                <li
                  :class="[this.orderStr[0] === '2' ? 'active' : '']"
                  @click="setOrder('2')"
                >
                  <a
                    >价格<i
                      v-show="this.orderStr[0] === '2'"
                      :class="[
                        'iconfont',
                        `icon-direction-${
                          this.orderStr[1] === 'asc' ? 'up' : 'down'
                        }`,
                      ]"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="sizes, prev, pager, next"
            :total="1000"
          >
          </el-pagination> -->
          <Paginaton
            :total="total"
            :pageSize="searchOptons.pageSize"
            :currentPage="searchOptons.pageNo"
            :pageSizeList="[5, 10, 15, 20, 50, 100]"
            @changeSize="handleSizeChange"
            @changePage="handleCurrentChange"
          ></Paginaton>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TypeNav from '@/components/TypeNav';
import SearchSelector from '@/views/Search/SearchSelector';
import Paginaton from '@/components/Paginaton';
import { reqGetSearchGoodsList } from '@/api/search';
export default {
  name: 'XSearch',
  data() {
    return {
      attrsList: [], // 属性列表
      goodsList: [], // 商品列表
      trademarkList: [], // 品牌列表
      searchOptons: {
        props: [], // 商品属性的数组: ["属性ID:属性值:属性名"]
        trademark: '', // 品牌: "ID:品牌名称"    示例: "1:苹果"
        order: '1:desc', // 排序方式 .  排序类型(type)=>  1: 综合 2: 价格;   排序标识(flag)=>  asc: 升序  desc: 降序
        pageNo: 1, // 页码
        pageSize: 5, // 每页条数
      },
      total: 0,
    };
  },
  components: { TypeNav, SearchSelector, Paginaton },
  mounted() {
    this.getSearchGoodsList();
  },
  computed: {
    orderStr() {
      return this.searchOptons.order.split(':');
    },
  },
  watch: {
    $route() {
      // 监听整个route路由对象
      this.getSearchGoodsList();
    },
  },
  methods: {
    // 获取商品列表
    async getSearchGoodsList() {
      console.log('发送搜索请求');
      const res = await reqGetSearchGoodsList({
        ...this.$route.query,
        ...this.searchOptons,
      });
      this.attrsList = res.attrsList;
      this.goodsList = res.goodsList;
      this.trademarkList = res.trademarkList;
      this.total = res.total;
      // console.log('商品列表：', res);
    },

    // 按照品牌搜素商品列表
    serchtrademark(trademarkStr) {
      // 判断当前品牌是否跟已存在的品牌相同，同，则不要重新发送请求
      if (this.searchOptons.trademark === trademarkStr) return;
      // 更新searchOptons信息，只要数据一边，触发watch，就出发搜索请求
      this.searchOptons.trademark = trademarkStr;
      this.getSearchGoodsList();
    },

    // 根据商品属性搜索
    serchAttr(props) {
      // 判断是否已经存在这个属性
      console.log(props, this.searchOptons.props);
      if (this.searchOptons.props.includes(props)) return;
      this.searchOptons.props.push(props);
      this.getSearchGoodsList();
    },

    // 删除分类
    delCatagory() {
      this.$router.history.push({
        name: 'Search',
        query: {
          keyword: this.$route.query.keyword,
        },
      });
    },

    // 删除关键字条件
    delKeyword() {
      this.$route.query.keyword = undefined;
      this.getSearchGoodsList();
    },

    // 删除品牌
    delTrademark() {
      this.searchOptons.trademark = undefined;
      this.getSearchGoodsList();
    },

    // 删除属性
    delAttr(index) {
      this.searchOptons.props.splice(index, 1);
      this.getSearchGoodsList();
    },

    // 排序 搜索
    setOrder(newOrderType) {
      // 排序类型： 1：综合排序 ， 2：价格
      let [oldOrderType, oldOrderFlag] = this.orderStr;
      /**
       * 控制箭头是升序状态还是降序状态
       * - 点击相同元素，则取反
       * - 点击不同元素，默认取desc
       * **/
      if (newOrderType === oldOrderType) {
        // 点击相同元素
        // 如果原来的是asc，则改为desc，
        oldOrderFlag = oldOrderFlag === 'asc' ? 'desc' : 'asc';
      } else {
        // 点击不同元素
        oldOrderFlag = 'desc';
      }
      this.searchOptons.order = `${newOrderType}:${oldOrderFlag}`;
      this.getSearchGoodsList(); //刷新页面
    },

    // 切换每页记录条数处理函数
    handleSizeChange(pagesize) {
      this.searchOptons.pageSize = pagesize;
      this.getSearchGoodsList();
      console.log('改变pagesize', pagesize);
    },
    // 改变当前页码
    handleCurrentChange(page) {
      this.searchOptons.pageNo = page;
      console.log('改变 curentpage ', page);
      this.getSearchGoodsList();
    },
  },
};
</script>
<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;
                border: 1px solid #ddd;
                padding: 10px;
                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: 250px;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 0px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
