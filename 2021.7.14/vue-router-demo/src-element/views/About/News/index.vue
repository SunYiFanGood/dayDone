<template>
  <div>
<div>我的新闻</div>
  <ul class="list-group">
    <li class="list-group-item" v-for="news in newsList" :key="news.id" >
      <el-tag><router-link :to="`/about/news/details${news.id}`">标题:{{news.title}}</router-link></el-tag>
    </li>
  </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "News",
  data(){
    return {
      newsList:[{
        id:1,
        title:'aaa',
        info:'a++++'
      },
        {
          id:2,
          title:'bbb',
          info:'b++++'
        },
        {
          id:3,
          title:'ccc',
          info:'c++++'
        },]
    }
  }
}
</script>

<style >
ul,li{
  margin: 0;
  padding: 0;
  list-style: none;
}
</style>