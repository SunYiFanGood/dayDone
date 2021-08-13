<template>
  <el-card class="card">
    <el-form inline class="category-selector-form">
      <el-form-item label="一级分类" class="category-selector-item">
        <el-select
          placeholder="请选择一级分类"
          v-model="category1Id"
          :disabled="disabled"
        >
          <!--
            labal 显示的内容
            value 选中的值
           -->
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" class="category-selector-item">
        <el-select
          placeholder="请选择二级分类"
          v-model="category2Id"
          :disabled="disabled"
        >
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" class="category-selector-item">
        <el-select
          placeholder="请选择三级分类"
          v-model="category3Id"
          :disabled="disabled"
        >
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'CategorySelector',
  mounted() {
    this.getCategory1List()
  },
  props: {
    disabled: Boolean
  },
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: ''
    }
  },
  computed: {
    ...mapState({
      category1List: (state) => state.category.category1List,
      category2List: (state) => state.category.category2List,
      category3List: (state) => state.category.category3List
    })
  },
  watch: {
    category1Id(category1Id) {
      this.getCategory2List(category1Id)
      this.category2Id = ''
      this.category3Id = ''
    },
    category2Id(category2Id) {
      // 避免数据清空时请求数据
      if (!category2Id) return
      this.getCategory3List(category2Id)
      this.category3Id = ''
    },
    category3Id(category3Id) {
      this.SET_CATEGORY_3ID(category3Id)
    }
  },
  methods: {
    ...mapActions('category', [
      'getCategory1List',
      'getCategory2List',
      'getCategory3List'
    ]),
    ...mapMutations('category', ['SET_CATEGORY_3ID'])
  }
}
</script>

<style lang="sass" scoped>
.card .category-selector-item
  margin-bottom: 0
.category-selector-form
  margin: 10px 0
</style>

