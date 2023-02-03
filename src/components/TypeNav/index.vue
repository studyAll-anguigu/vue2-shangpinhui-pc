<!-- 
总结：

  1。关于三级目录跳转问题
  实现跳转的方式： routerLink , 编程时导航 ，  事件委托

  区别：
  - routerLink ：
    - 把a标签换成编程时导航组件，并结合to属性实现路由跳转。 
    - 存在问题：会重复生成太多的routerLink组件，性能速度上不怎么好
  - 编程时导航：
    - 使用a标签，并且给a标签绑定点击事件click ， 使用this.$router.push({name:'Search',query:{....参数}})
    - 存在问题 ：同时帮帮太多的点击事件了。
  - 事件委托 ：
    - 使用编程时导航，并且结合事件委托，把跳转路由点击事件绑定在它们的 【父元素】身上。
    - 特点： 只绑定一次事件，点击子元素，都可以触发这个事件。
    
    - 事件委托原理 ： 判断元素是否在父元素的管辖范围内。 若在，则触发父元素绑定的事件，若不在则不会触发。
 -->
<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div class="nav-left">
        <h2 class="all">全部商品分类</h2>
        <div class="sort">
          <div class="all-sort-list2" @click="toSearch">
            <div
              class="item"
              v-for="c1 in baseCategoryList"
              :key="c1.categoryId"
            >
              <h3>
                <a
                  :data-name="c1.categoryName"
                  :data-id="c1.categoryId"
                  data-level="1"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <div class="item-list clearfix">
                <div
                  class="subitem"
                  v-for="c2 in c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-name="c2.categoryName"
                        :data-id="c2.categoryId"
                        data-level="2"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-name="c3.categoryName"
                          :data-id="c3.categoryId"
                          data-level="3"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { repgetBaseCategoryList } from '@/api/home';
export default {
  name: 'TypeNav',
  data() {
    return {
      baseCategoryList: [],
    };
  },
  mounted() {
    this.getBaseCategoryList();
  },
  methods: {
    // 获取三级目录列表
    async getBaseCategoryList() {
      const result = await repgetBaseCategoryList();
      this.baseCategoryList = result.slice(0, 15); // 只要15条记录
    },
    // 点击三级目录跳转到搜 索页面
    toSearch(e) {
      // 获取自定义属性的值
      const { id, name, level } = e.target.dataset;
      // 判断是否点击空白区域
      if (!id) return;
      this.$router.push({
        name: 'Search',
        query: {
          categoryName: name,
          [`category${level}Id`]: id,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;
            width: 100%;
            a {
              color: #333;
              display: block;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            h3 {
              background: #e1251b;
              a {
                color: #fff;
              }
            }
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
