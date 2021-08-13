<template>
  <div>
    <ul class="list-group">
      <li class="list-group-item">
        <el-tag>id:{{ news.id }}</el-tag><br>
        <el-tag>标题:{{ news.title }}</el-tag><br>
        <el-tag>内容:{{ news.info }}</el-tag><br>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      newsList: [{
        id: 1,
        title: 'aaa',
        info: 'a++++'
      },
        {
          id: 2,
          title: 'bbb',
          info: 'b++++'
        },
        {
          id: 3,
          title: 'ccc',
          info: 'c++++'
        },],
      news: {}
    }
  },
  methods: {
    getMessage() {
      this.newsList.forEach((item) => {
        if (item.id === +this.$route.params.id) {
          this.news = {
            id: this.$route.params.id,
            title: item.title,
            info: item.info
          }
        }
      })
    }
  },
  watch: {
    // 每次更新地址，都会改变$route
    $route: {
      handler() {
        this.getMessage();
      },
      immediate: true,
    },
  },
}
</script>

<style scoped>
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>