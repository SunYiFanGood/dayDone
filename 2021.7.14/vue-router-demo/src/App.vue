<template>
  <div>
    <p>count的值为{{count}}，类型为{{!!(count&1)?'奇数':'偶数'}}</p>
    <button @click="INCREMENT">+</button>
    <button @click="DECREMENT">-</button>
    <button @click="incrementIfOdd">偶数加</button>
    <button @click="incrementAsync">异步加</button>
  </div>
</template>
<script>
import {mapState,mapActions,mapMutations} from 'vuex'
export default {
  name: "App",
  methods:{
    ...mapActions(["incrementIfOdd","incrementAsync"]),
    ...mapMutations(["INCREMENT","DECREMENT"])
  },
  computed:{
    ...mapState(["count"])
  }
}
</script>
<style lang="less">
</style>
