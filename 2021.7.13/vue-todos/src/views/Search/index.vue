<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model="searchName"/>
      <button @click="search">Search</button>
    </div>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  name: "Search",
  data (){
    return {
      searchName:""
    }
  },
  methods:{
    async search(){
      const searchName = this.searchName.trim();
      if (!searchName) {
        alert("请输入搜索内容");
        return;
      }
      this.$bus.$emit("changeLoading",true);
      let userList=await axios({
        method: "GET",
        url: "https://api.github.com/search/users",
        params: {
          q: searchName,
        },
      });
      userList=userList.data.items.map((user) => {
        return {
          id: user.id,
          login: user.login,
          html_url: user.html_url,
          avatar_url: user.avatar_url,
        };
      });
      this.$bus.$emit("changeLoading",false)
      this.$bus.$emit("getUserList",userList)
    }
  },

}
</script>

<style scoped>

</style>