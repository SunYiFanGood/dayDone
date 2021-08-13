<template>
  <div class="col-md-4">
    <form class="form-horizontal" @submit.prevent="" >
      <div class="form-group">
        <label>用户名</label>
        <input
            type="text"
            class="form-control"
            placeholder="用户名"
            v-model="name"
        />
      </div>
      <div class="form-group">
        <label>评论内容</label>
        <textarea
            class="form-control"
            rows="6"
            placeholder="评论内容"
            v-model="comment"
        ></textarea>
      </div>
      <div class="form-group">
        <div class="col-sm-offset-2 col-sm-10">
          <button type="submit" class="btn btn-default pull-right" @click="addContent">提交</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddComment",
  data(){
    return {
      name:'',
      comment:''
    }
  },
  props:{
    add:Function
  },
  methods:{
    addContent(){
      if (this.name==="" || this.comment===""){
        alert("您输入的用户名或密码为空，请重新输入");
        return
      }
      this.add(this.name,this.comment);
      this.name="";
      this.comment=""
    }
  }
}
</script>

<style scoped>
</style>