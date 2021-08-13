<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
        class="address clearFix"
        v-for="userAddress in userAddressList"
        :key="userAddress.id"
        @click="selectUserAddress(userAddress.id)"
      >
        <span
          :class="{
            username: true,
            selected: userAddress.isSelected,
          }"
          >{{ userAddress.name }}</span
        >
        <p>
          <span class="s1">{{ userAddress.address }}</span>
          <span class="s2">{{ userAddress.phone }}</span>
          <span class="s3" v-if="userAddress.isDefault">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left: 5px">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">天天快递</span>
          <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul class="list clearFix" v-for="goods in goodsList" :key="goods.id">
          <li>
            <img v-lazy="goods.imgUrl" alt="" />
          </li>
          <li>
            <p>
              {{ goods.skuName }}
            </p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{ goods.orderPrice }}</h3>
          </li>
          <li>X{{ goods.skuNum }}</li>
          <li>有货</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
          placeholder="建议留言前先与商家沟通确认"
          class="remarks-cont"
          v-model="comments"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b
            ><i>{{ totalNum }}</i
            >件商品，总商品金额</b
          >
          <span>¥{{ totalAmount }}</span>
        </li>
        <li>
          <b>返现：</b>
          <span>0.00</span>
        </li>
        <li>
          <b>运费：</b>
          <span>0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额:<span>¥{{ totalAmount }}</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ selectedUserAddress.address }}</span>
        收货人：<span>{{ selectedUserAddress.name }}</span>
        <span>{{ selectedUserAddress.phone }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <button class="subBtn" @click="submitOrder">提交订单</button>
    </div>
  </div>
</template>

<script>
import { reqGetTradeInfo, reqSubmitOrder } from "../../api/pay";

export default {
  name: "Trade",
  async mounted() {
    const res = await reqGetTradeInfo();
    // console.log(res);
    this.totalAmount = res.totalAmount;
    this.totalNum = res.totalNum;
    this.tradeNo = res.tradeNo;
    this.goodsList = res.detailArrayList;
  },
  data() {
    return {
      totalAmount: 0, // 总价
      totalNum: 0, // 总数量
      tradeNo: "", // 订单号
      goodsList: [], // detailArrayList 商品列表
      // 用户地址列表（默认没有，需要开发者自己生成）
      userAddressList: [
        {
          id: 1,
          phone: "13000000000",
          name: "华哥",
          address: "武汉洗脚城～",
          isDefault: 1,
          isSelected: true,
        },
        {
          id: 2,
          phone: "13111111111",
          name: "静哥",
          address: "深圳正经发廊～",
          isDefault: 0,
          isSelected: false,
        },
        {
          id: 3,
          phone: "13222222222",
          name: "雷哥",
          address: "深圳按摩馆～",
          isDefault: 0,
          isSelected: false,
        },
      ],
      comments: "", // 留言
    };
  },
  computed: {
    selectedUserAddress() {
      return this.userAddressList.find((userAddress) => userAddress.isSelected);
    },
  },
  methods: {
    // 选择收件人地址
    selectUserAddress(id) {
      this.userAddressList.forEach((userAddress) => {
        if (userAddress.id === id) {
          userAddress.isSelected = true;
        } else {
          userAddress.isSelected = false;
        }
      });
    },
    // 提交订单
    async submitOrder() {
      // 整理数据
      const {
        tradeNo, // 订单号
        selectUserAddress,
        comments: orderComment, // 买家留言
        goodsList: orderDetailList, // 商品列表
        totalAmount,
      } = this;

      const {
        // 对象结构赋值，并将name重命名为consignee
        name: consignee, // 用户名
        phone: consigneeTel, // 手机号
        address: deliveryAddress, // 地址
      } = selectUserAddress;

      // 发送请求，提交订单
      const orderId = await reqSubmitOrder({
        tradeNo, // 注意接口文档参数有问题
        consignee,
        consigneeTel,
        deliveryAddress,
        paymentWay: "ONLINE", // 支付方式：目前只支持一种方案，写死
        orderComment,
        orderDetailList,
      });

      // 跳转支付页面
      this.$router.history.push({
        name: "Pay",
        query: {
          orderId,
          totalAmount,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 0 auto;
    font-size: 14px;
    line-height: 21px;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 25px;
    box-sizing: border-box;

    .receive,
    .pay {
      line-height: 36px;
      margin: 18px 0;
    }

    .address {
      display: inline-block;
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #ddd;
        position: relative;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #e1251b;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;

        .s1 {
          float: left;
        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 24px;
          line-height: 24px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 3px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #f4f4f4;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
      }

      .info {
        margin-top: 20px;

        .s1 {
          float: left;
          border: 1px solid #ddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
        }

        p {
          line-height: 30px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #feedef;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        justify-content: space-between;
        img {
          width: 150px;
          height: 150px;
        }
        li {
          line-height: 30px;

          p {
            margin-bottom: 20px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
          }

          h3 {
            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
      }

      textarea {
        width: 100%;
        border-color: #e4e2e2;
        line-height: 1.8;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
      }

      div {
        padding-left: 15px;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;

    ul {
      width: 220px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #f4f4f4;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #999;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 164px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      color: #fff;
      background-color: #e1251b;
    }
  }
}
</style>