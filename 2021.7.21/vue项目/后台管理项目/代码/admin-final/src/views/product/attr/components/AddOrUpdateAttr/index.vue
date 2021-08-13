<template>
  <el-card class="card">
    <el-form ref="form" inline :model="attr" :rules="rules">
      <el-form-item label="属性名" prop="attrName">
        <el-input v-model="attr.attrName" />
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!attr.attrName"
      @click="addAttrValue"
    >
      添加属性值
    </el-button>
    <el-table v-loading="loading" :data="attrValueList" border class="table">
      <el-table-column label="序号" type="index" width="50" align="center" />
      <el-table-column label="属性值名称" prop="attrName">
        <template v-slot="{ $index, row }">
          <!-- ref绑定$index才能保证每一个input的ref都是唯一的 -->
          <!-- 编辑模式 -->
          <el-input
            v-show="row.isEdit"
            :ref="$index"
            v-model="row.valueName"
            placeholder="请输入属性值名称"
            size="mini"
            @blur="showEdit(row, false)"
            @keyup.enter.native="showEdit(row, false)"
          />
          <!-- 显示模式 -->
          <p v-show="!row.isEdit" @click="showEdit(row, true, $index)">
            {{ row.valueName }}
          </p>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip effect="dark" content="删除属性" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini" />
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="submit">确定</el-button>
    <el-button @click="setIsShowAttrList(true)">取消</el-button>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import { reqSaveAttrInfo } from '@api/attr'

export default {
  name: 'AddOrUpdateAttr',
  props: {
    setIsShowAttrList: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      attr: {
        attrName: '',
        id: ''
      },
      rules: {
        attrName: [{ required: true, message: '请输入属性名称' }]
      },
      loading: false,
      attrValueList: [],
      isEditing: false
    }
  },
  computed: {
    ...mapState({
      category3Id: (state) => state.category.category3Id
    })
  },
  mounted() {
    this.$bus.$on('receiveAttr', this.receiveAttr)
  },
  destroyed() {
    this.$bus.$off('receiveAttr', this.receiveAttr)
  },
  methods: {
    // 添加属性值
    addAttrValue() {
      if (this.isEditing) {
        this.$message({
          type: 'warning',
          message: '请完成现有添加属性值名称'
        })
        return
      }
      this.attrValueList.push({ isEdit: true, valueName: '' })

      // 因为DOM元素还未生成
      this.$nextTick(() => {
        // 聚焦
        this.$refs[this.attrValueList.length - 1].focus()
      })
    },
    showEdit(row, isEdit, index) {
      // 判断值不能为空
      if (!row.valueName) {
        this.isEditing = true
        this.$message({
          type: 'warning',
          message: '请输入属性值名称'
        })
        return
      }
      // 判断值不能相同
      const repeat = this.attrValueList.reduce((p, c) => {
        return p + (c.valueName === row.valueName ? 1 : 0)
      }, 0)
      if (repeat >= 2) {
        this.isEditing = true
        this.$message({
          type: 'warning',
          message: '输入属性值不能相同'
        })
        return
      }

      this.isEditing = false
      row.isEdit = isEdit
      if (isEdit) {
        this.$nextTick(() => {
          // 聚焦
          this.$refs[index].focus()
        })
      }
    },
    async submit() {
      // 判断必须有属性名和至少有一个属性值
      const { attrName, id } = this.attr
      const { attrValueList, isEditing, category3Id } = this
      if (attrName && attrValueList.length && !isEditing) {
        await reqSaveAttrInfo({
          id,
          attrName,
          attrValueList,
          categoryId: category3Id,
          categoryLevel: 3
        })

        this.setIsShowAttrList(true)
        this.$message({
          type: 'success',
          message: `${id ? '更新' : '添加'}属性值成功~`
        })
        this.$bus.$emit('updateAttrList')
        // 清空数据
        this.attr = {
          attrName: '',
          id: ''
        }
        this.attrValueList = []
        // 重置表单
        this.$refs.form.resetFields()
      }
    },
    receiveAttr(attr) {
      this.attr.attrName = attr.attrName
      this.attr.id = attr.id
      this.attrValueList = attr.attrValueList.map((attrValue) => {
        return {
          ...attrValue,
          isEdit: false // 添加属性，为了响应式
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
p
  margin: 0
</style>
