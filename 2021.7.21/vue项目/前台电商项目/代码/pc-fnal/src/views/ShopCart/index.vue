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
        <ul class="cart-list" v-for="cart in cartList" :key="cart.id">
          <li class="cart-list-con1">
            <!-- <input type="checkbox" v-model="cart.isChecked" /> -->
            <input
              type="checkbox"
              :checked="cart.isChecked"
              @change="updateCartChecked(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img v-lazy="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <!-- <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li> -->
          <li class="cart-list-con4">
            <span class="price">{{ cart.cartPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a @click="count(cart)" class="mins">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
            />
            <a @click="add(cart)" class="plus">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.cartPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delCart(cart)">删除</a>
            <br />
            <a>移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ totalNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  reqGetCartList,
  reqUpdateCartChecked,
  reqAddCart,
  reqDelCart,
} from "../../api/shopcart";

/*
  1. 用户未登录
    发送请求时携带请求头参数：userTempId，用户临时id
      用户临时id需要客户端自己生成，特点：唯一的
    添加购物车，服务器会将数据保存在临时id上
    获取购物车列表，服务器通过临时id，找到之前添加的购物车数据，返回

  2. 用户已经登陆
    登陆成功，服务器会返回一个cookie
    客户端发送请求时会自动携带上cookie
    cookie就是当前用户的唯一标识
    添加购物车，服务器就能知道数据添加给哪个用户
    获取购物车列表，服务器就能知道哪个用户的购物车数据
    总结：cookie会自动携带，客户端不需要做其他操作

    登陆成功，服务器会返回一个token
    客户端发送请求时会手动携带上token（位于请求头）
    token就是当前用户的唯一标识
    添加购物车，服务器就能知道数据添加给哪个用户
    获取购物车列表，服务器就能知道哪个用户的购物车数据
    总结：麻烦一些，需要手动加上token参数才行

  当同时有userTempId和token时，自动将userTempId中的购物车数据添加到token上
*/

export default {
  name: "ShopCart",
  data() {
    return {
      cartList: [],
      isUpdateGoodsCount: false,
    };
  },
  async mounted() {
    try {
      const cartList = await reqGetCartList();
      this.cartList = cartList[0].cartInfoList;
    } catch (e) {
      console.log(e);
    }
  },
  computed: {
    totalNum() {
      return this.cartList
        .filter((cart) => cart.isChecked)
        .reduce((p, c) => {
          return p + c.skuNum;
        }, 0);
    },
    totalPrice() {
      return this.cartList
        .filter((cart) => cart.isChecked)
        .reduce((p, c) => {
          return p + c.skuNum * c.cartPrice;
        }, 0);
    },
  },
  methods: {
    // 更新商品isChecked
    async updateCartChecked(cart) {
      try {
        // 发送请求，更新checked状态
        // const isChecked = cart.isChecked === 1 ? 0 : 1;
        const isChecked = 1 - cart.isChecked;
        await reqUpdateCartChecked(cart.skuId, isChecked);
        // 改变isChecked的值
        cart.isChecked = isChecked;
      } catch (e) {
        console.log(e);
      }
    },
    // 更新商品数量
    async add(cart) {
      // if (this.isUpdateGoodsCount) {
      //   return;
      // }
      // this.isUpdateGoodsCount = true;
      await reqAddCart(cart.skuId, 1);
      cart.skuNum++;
      // this.isUpdateGoodsCount = false;
    },
    async count(cart) {
      // if (this.isUpdateGoodsCount) {
      //   return;
      // }
      // this.isUpdateGoodsCount = true;
      // const { skuNum } = cart;
      if (cart.skuNum === 1) return;
      cart.skuNum--;
      if (cart.skuNum <= 0) {
        return (cart.skuNum = 1);
      }
      await reqAddCart(cart.skuId, -1);

      // this.isUpdateGoodsCount = false;
    },
    // 删除单个商品
    async delCart(cart) {
      if (window.confirm(`您确认要删除 ${cart.skuName} 商品吗？`)) {
        const { skuId } = cart;
        await reqDelCart(skuId);
        this.cartList = this.cartList.filter((cart) => cart.skuId !== skuId);
      }
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
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 45%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 350px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
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
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

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
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>