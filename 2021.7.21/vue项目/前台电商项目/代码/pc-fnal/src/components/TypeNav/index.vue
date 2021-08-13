<template>
  <div class="type-nav">
    <div class="container" @mouseleave="isShow = false">
      <h2 class="all" @mouseenter="isShow = true">全部商品分类</h2>
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
      <!-- 
        1. 数据动态展示：三级分类
        2. 点击分类可以跳转到search路由，同时携带两个query参数
          categoryName
          category1Id/category2Id/category3Id
          - 使用router-link跳转
            问题：生成几百个组件，性能不好
          - 使用编程式导航
            不会生成几百个组件了
            问题：绑定了几百个事件，太多了
          - 使用事件委托
            给外层的父级元素绑定点击事件，通过e.target来获取触发事件的目标元素

          显示&隐藏
            首页：全要显示，不能隐藏
            搜索：
              默认隐藏
              移入显示 移出隐藏

            1. v-show="$route.path === '/' || isShow"
            2. @mouseenter="isShow = true"
               @mouseenter="isShow = false"
       -->
      <div class="sort" v-show="$route.path === '/' || isShow">
        <div class="all-sort-list2" @click="toSearch">
          <div class="item bo" v-for="c1 in categoryList" :key="c1.categoryId">
            <!-- 一级分类 -->
            <h3>
              <!-- <router-link
                :to="{
                  name: 'Search', // 命名路由
                  query: {
                    categoryName: c1.categoryName,
                    category1Id: c1.categoryId,
                  },
                }"
              >
                {{ c1.categoryName }}
              </router-link> -->
              <!-- <a @click="toSearch(c1.categoryName, c1.categoryId, 1)">
                {{ c1.categoryName }}
              </a> -->
              <a
                :data-categoryName="c1.categoryName"
                :data-categoryId="c1.categoryId"
                :data-level="1"
              >
                {{ c1.categoryName }}
              </a>
            </h3>
            <div class="item-list clearfix">
              <div
                class="subitem"
                v-for="c2 in c1.categoryChild"
                :key="c2.categoryId"
              >
                <dl class="fore">
                  <!-- 二级分类 -->
                  <dt>
                    <!-- <router-link
                      :to="{
                        name: 'Search', // 命名路由
                        query: {
                          categoryName: c2.categoryName,
                          category2Id: c2.categoryId,
                        },
                      }"
                    >
                      {{ c2.categoryName }}
                    </router-link> -->
                    <!-- <a @click="toSearch(c2.categoryName, c2.categoryId, 2)">
                      {{ c2.categoryName }}
                    </a> -->
                    <a
                      :data-categoryName="c2.categoryName"
                      :data-categoryId="c2.categoryId"
                      :data-level="2"
                    >
                      {{ c2.categoryName }}
                    </a>
                  </dt>
                  <dd>
                    <!-- 三级分类 -->
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <!-- <router-link
                        :to="{
                          name: 'Search', // 命名路由
                          query: {
                            categoryName: c3.categoryName,
                            category3Id: c3.categoryId,
                          },
                        }"
                      >
                        {{ c3.categoryName }}
                      </router-link> -->
                      <!-- <a @click="toSearch(c3.categoryName, c3.categoryId, 3)">
                        {{ c3.categoryName }}
                      </a> -->
                      <a
                        :data-categoryName="c3.categoryName"
                        :data-categoryId="c3.categoryId"
                        :data-level="3"
                      >
                        {{ c3.categoryName }}
                      </a>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetCategoryList } from "../../api/category";

export default {
  name: "TypeNav",
  data() {
    return {
      categoryList: [],
      isShow: false,
    };
  },
  async mounted() {
    reqGetCategoryList()
      .then((res) => {
        this.categoryList = res;
      })
      .catch((e) => {
        console.log(e);
      });
  },
  methods: {
    // toSearch(categoryName, categoryId, level) {
    //   this.$router.history.push({
    //     name: "Search",
    //     query: {
    //       categoryName,
    //       [`category${level}Id`]: categoryId,
    //     },
    //   });
    // },
    toSearch(e) {
      // 自定义属性会挂在到DOM元素的dataset
      // 自定义属性会自动转换成小写
      const { categoryname, categoryid, level } = e.target.dataset;
      // 如果点击的是空白区域，那么就获取不到自定义属性，return
      if (!level) return;

      this.$router.history.push({
        name: "Search",
        query: {
          categoryName: categoryname,
          [`category${level}Id`]: categoryid,
        },
        // 携带上params
        params: this.$route.params,
      });
    },
  },
};
</script>

<style lang="less">
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
            margin: 0;

            a {
              display: block;
              height: 100%;
              color: #333;
              padding: 0 20px;
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
            .item-list {
              display: block;
            }
            background-color: yellowgreen;
          }
        }
      }
    }
  }
}
</style>