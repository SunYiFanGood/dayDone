<template>
  <el-card class="card">
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!category3Id"
      @click="setIsShowAttrList(false)"
    >
      添加属性
    </el-button>
    <el-table v-loading="loading" :data="attrList" border class="table">
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column label="属性名称" prop="attrName" />
      <el-table-column label="属性值列表">
        <template v-slot="{ row }">
          <el-tag
            v-for="attrValue in row.attrValueList"
            :key="attrValue.id"
            class="attr-tag"
          >
            {{ attrValue.valueName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip effect="dark" content="修改属性" placement="top">
            <el-button
              type="warning"
              icon="el-icon-edit"
              size="mini"
              @click="showUpdateAttr(row)"
            />
          </el-tooltip>
          <el-tooltip effect="dark" content="删除属性" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import { reqGetAttrList } from '@api/attr'

export default {
  name: 'AttrList',
  mounted() {
    this.$bus.$on('updateAttrList', this.updateAttrList)
  },
  beforeDestroy() {
    this.$bus.$off('updateAttrList', this.updateAttrList)
  },
  props: {
    setIsShowAttrList: Function
  },
  data() {
    return {
      loading: false,
      attrList: []
    }
  },
  computed: {
    ...mapState({
      category1Id: (state) => state.category.category1Id,
      category2Id: (state) => state.category.category2Id,
      category3Id: (state) => state.category.category3Id
    })
  },
  watch: {
    async category3Id(category3Id) {
      if (!category3Id) {
        this.attrList = []
        return
      }

      this.updateAttrList()
    }
  },
  methods: {
    async updateAttrList() {
      const { category1Id, category2Id, category3Id } = this
      this.loading = true
      this.attrList = []
      // 发送请求，请求attrList
      const { data } = await reqGetAttrList({
        category1Id,
        category2Id,
        category3Id
      })
      this.loading = false
      this.attrList = data
    },
    showUpdateAttr(attr) {
      this.$bus.$emit('receiveAttr', attr)
      this.setIsShowAttrList(false)
    }
  }
}
</script>

<style lang="sass" scoped>
.attr-tag
  margin-right: 10px
</style>
