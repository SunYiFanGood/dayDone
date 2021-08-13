<template>
  <div>
    <TypeNav />

    <div class="main">
      <div class="py-container">
        <!-- 搜索条件 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- keyword -->
            <li
              class="with-x"
              v-show="$route.params.keyword"
              @click="delKeyword"
            >
              {{ $route.params.keyword }}<i>×</i>
            </li>
            <!-- categoryName -->
            <li
              class="with-x"
              v-show="$route.query.categoryName"
              @click="delCategoryName"
            >
              {{ $route.query.categoryName }}<i>×</i>
            </li>
            <!-- trademark -->
            <li class="with-x" v-show="options.trademark" @click="delTrademark">
              {{ options.trademark.split(":")[1] }}<i>×</i>
            </li>
            <!-- props -->
            <li
              class="with-x"
              v-for="(prop, index) in options.props"
              :key="prop"
              @click="delProp(index)"
            >
              {{ `${prop.split(":")[2]}:${prop.split(":")[1]}` }}<i>×</i>
            </li>
          </ul>
        </div>

        <!-- 
          搜索条件选择器 
          props
          自定义事件
        -->
        <!-- <SearchSelector :search="search" /> -->

        <SearchSelector @search="search" :options="options" />

        <!-- 商品列表 -->
        <div class="details clearfix">
          <!-- 商品列表头部：排序功能 -->
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{
                    active: order.orderName === '1',
                  }"
                  @click="setOrder('1')"
                >
                  <a>
                    <span>综合</span>
                    <span
                      v-show="order.orderName === '1'"
                      :class="[
                        'iconfont',
                        order.orderType === 'asc'
                          ? 'icon-direction-up'
                          : 'icon-direction-down',
                      ]"
                    >
                    </span>
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
                  :class="{
                    active: order.orderName === '2',
                  }"
                  @click="setOrder('2')"
                >
                  <a>
                    <span>价格</span>
                    <span
                      v-show="order.orderName === '2'"
                      :class="[
                        'iconfont',
                        order.orderType === 'asc'
                          ? 'icon-direction-up'
                          : 'icon-direction-down',
                      ]"
                    ></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品列表详情 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link
                      :to="{
                        name: 'Detail',
                        params: {
                          id: goods.id,
                        },
                      }"
                    >
                      <img v-lazy="goods.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <div class="fr page">
            <!-- <Pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[100, 200, 300, 400]"
              :page-size="100"
              :total="400"
            /> -->

            <!-- 
              v-bind:xxx.sync
              .sync修饰符
                即会传递xxx数据，又会传递一个更新数据的事件 update:xxx 
                这个事件不需要定义，只要触发就会更新xxx数据
             -->
            <Pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="options.pageNo"
              :page-sizes="[5, 10, 15, 20]"
              :page-size.sync="options.pageSize"
              :total="total"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import TypeNav from "../../components/TypeNav";
import SearchSelector from "./SearchSelector/SearchSelector";
import Pagination from "../../components/Pagination";

export default {
  name: "Search",
  // 组件导航守卫
  // beforeRouteEnter(to, from, next) {
  //   console.log(to, from);
  //   next();
  // },
  data() {
    return {
      // 搜索条件
      options: {
        // category1Id: "",
        // category2Id: "",
        // category3Id: "",
        // categoryName: "",
        // keyword: '',
        props: [],
        trademark: "",
        // 1 综合  2 价格
        // asc 升序 desc 降序
        order: "1:desc",
        pageNo: 1, // 当前页码
        pageSize: 5, // 每页条数
      },
    };
  },
  computed: {
    ...mapState("search", ["goodsList", "total"]),
    order() {
      // 例如：['1', 'desc'] [orderName, orderType]
      const [orderName, orderType] = this.options.order.split(":");

      return {
        orderName,
        orderType,
      };
    },
  },
  methods: {
    ...mapActions("search", ["searchGoodsList"]),
    search(newOptions = {}) {
      // console.log(newOptions); // 可能得到trademark和prop数据
      /*
        考虑如何获取搜索条件
          1. category3Id: "61",
             categoryName: "手机",
            this.$route.query

          2. keyword: "",
            this.$route.params

          3. trademark: ""
            子组件SearchSelector点击获取trademark
            通过自定义事件机制传递给Search组件使用

          4. props: [],
            子组件SearchSelector点击获取prop
            通过自定义事件机制传递给Search组件使用

        如何整合所有数据?
          
          需求：前面点击过的数据要保留下来，作为下一次请求的数据要携带上
          例如：先点击了品牌（按照品牌去搜索数据），
               在点击属性（按照品牌和属性一起去搜索）
               在点击另外一个属性（按照品牌和两个属性一起去搜索）
          问题：
            1. newOptions.prop , 我们需要的是props
               将多个prop整合成一个props，发送请求携带上
            2. 需要保存之前的搜索条件，下次搜索时应该再上一次的基础上去搜索
          解决：
            需要将之前的搜索条件给存储起来，下一次搜索的时候就可以使用了
      */

      // 整合一个统一的搜索条件
      // 将旧条件和新条件合并
      const options = {
        // 之前的搜索条件
        ...this.options,
        // 新的搜索条件
        // 利用对象的特点，重名属性后面会覆盖前面的
        ...newOptions, // prop和trademark
      };

      // 发送请求需要的参数是props
      // 得到的参数是prop
      // 将prop添加到props中才行

      // 特殊处理：prop
      if (newOptions.prop) {
        options.props.push(newOptions.prop);
        // 删除多余的属性
        delete options.prop;
      }

      // 将新的搜索条件存储起来
      // 更新
      this.options = options;

      // 按照新条件去搜索
      this.searchGoodsList({
        ...options,
        // 每次搜索时都使用最新的数据进行搜索
        // categoryName category1Id category2Id category3Id
        ...this.$route.query,
        // keyword
        ...this.$route.params,
      });
    },

    /*
      问题：当页面的搜索条件发生变化（query、params、删除条件）
      不会重新搜索
      解决：
        1. 当 query、params 发生变化，重新搜索  
          监视$route
        2. 删除条件
          手动调用搜索方法
    */
    // 删除搜索条件
    delKeyword() {
      // $route $router $store props数据等，都是只读数据
      this.$router.history.push({
        name: "Search",
        query: this.$route.query,
        // 不传params，自然params就会被清空了～
      });
    },
    delCategoryName() {
      this.$router.history.push({
        name: "Search",
        params: this.$route.params,
        // 不传query，自然query就会被清空了～
      });
    },
    delTrademark() {
      this.options.trademark = "";
      this.search();
    },
    delProp(index) {
      this.options.props.splice(index, 1);
      this.search();
    },

    // 设置排序
    setOrder(orderName) {
      if (this.order.orderName === orderName) {
        // 第二次点击，如果点击的是相同的orderName,orderType要取反
        this.options.order = `${orderName}:${
          this.order.orderType === "asc" ? "desc" : "asc"
        }`;
      } else {
        // 如果点击的是不同的orderName,orderType默认为desc
        this.options.order = `${orderName}:desc`;
      }

      this.search();
    },

    // 当当前页码发生变化时触发的
    handleCurrentChange(pageNo) {
      this.search({
        pageNo,
      });
    },
    // 当每页条数发生变化时触发的
    handleSizeChange(pageNo, pageSize) {
      this.search({
        pageNo,
        pageSize,
      });
    },
  },
  mounted() {
    this.search();
  },
  watch: {
    // 监视$route，当路径发生变化就会触发（query、params）
    $route() {
      this.search();
    },
  },
  components: {
    SearchSelector,
    TypeNav,
    Pagination,
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

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
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
                    margin-left: -5px;
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
        height: 66px;
        overflow: hidden;
      }
    }
  }
}
</style>