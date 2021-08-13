<template>
  <el-container>
    <div class="out">
      <el-header>
        <div class="inner">
          <router-link to="/">
            <el-tag><el-link type="primary">Home</el-link></el-tag>
          </router-link>
          |
          <router-link to="/about">
            <el-tag><el-link type="primary">About</el-link></el-tag>
          </router-link>
        </div>
      </el-header>
      <el-main>
      <router-view/>
        </el-main>
    </div>
  </el-container>
</template>
<script>
export default {
  name: "App"
}
</script>
<style lang="less">
.out{
  width: 80%;
  text-align: center;
  .inner{

  }
}
</style>
