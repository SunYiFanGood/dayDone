<template>
  <div class="header">
    <div class="header-top">
      <div class="header-user">
        <span>尚品汇欢迎您！请</span>
        <div v-if="nickName">
          <span>{{ nickName }}</span>
          <button @click="handleClick">退出登陆</button>
        </div>
        <div v-else>
          <router-link to="/login" class="header-user-login">登录</router-link>
          <router-link to="/register">免费注册</router-link>
        </div>
      </div>

      <ul class="header-nav">
        <li><router-link to="/center">我的订单</router-link></li>
        <li><router-link to="/shopcart">我的购物车</router-link></li>
        <li><router-link to="/">我的尚品汇</router-link></li>
        <li><router-link to="/">尚品汇会员</router-link></li>
        <li><router-link to="/">企业采购</router-link></li>
        <li><router-link to="/">关注尚品汇</router-link></li>
        <li><router-link to="/">合作招商</router-link></li>
        <li><router-link to="/">商家后台</router-link></li>
      </ul>
    </div>
    <div class="header-bottom">
      <router-link to="/" class="header-logo-link">
        <img src="./logo.png" alt="logo" class="header-logo" />
      </router-link>

      <form class="header-form" @submit.prevent="toSearch">
        <input type="text" v-model="keyword" />
        <button>搜索</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    ...mapActions("user", ["logout"]),
    toSearch() {
      const keyword = this.keyword.trim();

      const location = {
        name: "Search",
        // 添加上query参数
        query: this.$route.query,
      };

      // 问题：当keyword没有值，直接点击搜索跳转，路径会不正确
      // 解决：可以跳转，但是当keyword没有值，不要携带params参数
      if (keyword) {
        location.params = { keyword };
      }

      this.$router.history.push(location);
    },
    async handleClick() {
      // 清空vuex数据
      await this.logout();
      // 清空localStorage和sesstionStorage
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
    },
  },
  computed: {
    ...mapState("user", ["nickName"]),
  },
};
</script>

<style lang="less">
.header {
  // height: 100px;
  // background-color: yellowgreen;
  a {
    color: #333;
  }
}
.header-top {
  display: flex;
  justify-content: space-between;
  background-color: #eaeaea;
  padding: 10px 20px;
}
.header-nav {
  display: flex;
  li {
    border-right: 1px solid #000;
    padding-right: 10px;
    margin-right: 10px;
    &:last-child {
      border: none;
      padding: 0;
      margin: 0;
    }
  }
}
.header-user {
  display: flex;
  align-items: center;
}
.header-user-login {
  border-right: 1px solid #000;
  padding-right: 5px;
  margin-right: 5px;
}
.header-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.header-logo-link {
  display: block;
}
.header-logo {
  width: 175px;
  height: 60px;
}
.header-form {
  display: flex;
  input {
    display: block;
    border: 1px solid #ea4a36;
    padding: 0 5px;
    width: 500px;
    height: 35px;
    box-sizing: border-box;
    outline: none;
    font-size: 16px;
  }
  button {
    display: block;
    border: none;
    background-color: #ea4a36;
    color: #fff;
    width: 80px;
    height: 35px;
    box-sizing: border-box;
    font-size: 14px;
  }
}
</style>