<template>
  <div>
    <h1 v-if="isLoading">Loading...</h1>
    <div class="row" v-else-if="userList.length">
      <div class="card" v-for="user in userList" :key="user.id" :user="user">
        <a :href="user.html_url" target="_blank">
          <img :src="user.avatar_url" style='width: 100px'/>
        </a>
        <p class="card-text">{{user.login}}</p>
      </div>
    </div>
    <h1 v-else>请输入要搜索的用户昵称 </h1>
  </div>

</template>

<script>
export default {
  name: "List",
  data() {
    return {
      userList: [],
      isLoading: false
    }
  },
  methods: {
    changeLoading(Loading) {
      this.isLoading = Loading
    },
    getUserList(users) {
      this.userList = users
    }
  },
  mounted() {
    this.$bus.$on("changeLoading",this.changeLoading)
    this.$bus.$on("getUserList",this.getUserList)
  },
  beforeDestroy() {
    this.$bus.$off("changeLoading",this.changeLoading)
    this.$bus.$off("getUserList",this.getUserList)
  }
}
</script>

<style>
.card {
  float: left;
  width: 33.333%;
  padding: .75rem;
  margin-bottom: 2rem;
  border: 1px solid #efefef;
  text-align: center;
}

.card > img {
  margin-bottom: .75rem;
  border-radius: 100px;
}

.card-text {
  font-size: 85%;
}

</style>