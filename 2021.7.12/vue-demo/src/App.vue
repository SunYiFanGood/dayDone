<template>
  <div id="app">
    <div>
      <header class="site-header jumbotron">
        <div class="container">
          <div class="row">
            <div class="col-xs-12">
              <h1>请发表对Vue的评论</h1>
            </div>
          </div>
        </div>
      </header>
      <div class="container">
        <AddComment :add="add"/>
        <CommentList :comments="comments" :del="del"/>
      </div>
    </div>
  </div>
</template>

<script>
import AddComment from "./views/AddComment"
import CommentList from "./views/CommentList"

export default {
  name: 'App',
  components: {
    AddComment,
    CommentList,
  },
  data() {
    return {
      comments: [{
        id: 1,
        name: '张三',
        comment: '我喜欢李四'
      },
        {
          id: 2,
          name: '李四',
          comment: '我喜欢王麻子'
        },
        {
          id: 3,
          name: '王麻子',
          comment: '我喜欢张三'
        },]
    }
  },
  methods:{
    add(name,comment){
      this.comments.unshift({
        id:Date.now(),
        name,
        comment
      })
    },
    del(id){
      this.comments=this.comments.filter((item)=>{
        return item.id !== id;
      })

    }
  }
}
</script>

<style lang="less">
</style>
