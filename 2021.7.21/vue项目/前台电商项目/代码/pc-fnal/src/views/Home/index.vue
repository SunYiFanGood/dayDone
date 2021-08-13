<template>
  <div>
    <TypeNav />
    <!--列表-->
    <ListContainer />
    <!--今日推荐-->
    <TodayRecommend />
    <!-- 商品排行 -->
    <Rank />
    <!-- 猜你喜欢 -->
    <Like />
    <!--楼层-->
    <!-- 
      一上来floors是空数组，空数组会不会生成Floor组件？
        不会生成Floor组件
      异步请求回来更新floors数据，此时才会遍历生成多个Floor组件
        一旦Floor组件生成，数据此时也已经有了
     -->
    <Floor v-for="floor in floors" :key="floor.id" :floor="floor" />
    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import TypeNav from "../../components/TypeNav";
import Brand from "./Brand/Brand";
import Floor from "./Floor/Floor";
import Like from "./Like/Like";
import ListContainer from "./ListContainer/ListContainer";
import Rank from "./Rank/Rank";
import TodayRecommend from "./TodayRecommend/TodayRecommend";
import { reqGetFloors } from "../../api/home";

export default {
  name: "Home",
  data() {
    return {
      floors: [],
    };
  },
  mounted() {
    reqGetFloors().then((res) => {
      this.floors = res;
    });
  },
  components: {
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank,
    TodayRecommend,
    TypeNav,
  },
};
</script>

<style lang="less" scoped>
</style>