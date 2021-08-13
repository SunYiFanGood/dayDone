<template>
  <div class="about">
    <h1>这是我的详情页</h1>
    <el-tag><router-link to="/about/info"><el-link type="primary">信息</el-link></router-link></el-tag>
      <el-tag><router-link to="/about/news"><el-link type="primary">新闻</el-link></router-link></el-tag>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: "About",
}
</script>

<style scoped>

</style>