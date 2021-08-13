<template>
  <el-card class="card">
    <el-form ref="form" :model="spu" :rules="rules" label-width="80px">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input v-model="spu.spuName" placeholder="请输入SPU名称" />
      </el-form-item>
      <el-form-item label="SPU品牌" prop="tmId">
        <el-select v-model="spu.tmId" placeholder="请选择品牌">
          <el-option
            v-for="tm in trademarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" prop="description">
        <el-input
          v-model="spu.description"
          type="textarea"
          placeholder="请输入SPU描述"
        />
      </el-form-item>
      <el-form-item label="SPU图片" prop="spuImageList">
        <!--
          on-preview 点击预览触发事件
          on-remove  点击删除触发的事件
         -->
        <el-upload
          action="http://39.98.123.211/admin/product/fileUpload"
          list-type="picture-card"
          :file-list="formatSpuImageList"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :class="{ 'spu-upload': spu.spuImageList.length >= maxImgLength }"
        >
          <i class="el-icon-plus" />
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="销售属性" prop="spuSaleAttrList">
        <el-select
          v-model="spu.saleAttr"
          :placeholder="`还剩${filterSaleAttrList.length}个销售属性`"
        >
          <el-option
            v-for="saleAttr in filterSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.name"
            :value="saleAttr.name"
          />
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!spu.saleAttr"
          @click="addSaleAttr"
        >
          添加属性值
        </el-button>

        <el-table :data="spu.spuSaleAttrList" border class="table">
          <el-table-column
            label="序号"
            type="index"
            width="50"
            align="center"
          />
          <el-table-column label="属性名" prop="saleAttrName" width="100" />
          <el-table-column label="属性值列表">
            <template v-slot="{ row, $index }">
              <el-tag
                v-for="saleAttrValue in row.spuSaleAttrValueList"
                :key="saleAttrValue.saleAttrValueName"
                @close="delSaleAttrValue(row, saleAttrValue.saleAttrValueName)"
                closable
                class="spu-tag"
              >
                {{ saleAttrValue.saleAttrValueName }}
              </el-tag>
              <el-input
                :ref="$index"
                v-show="row.isEdit"
                v-model="saleAttrValue"
                class="spu-input"
                size="mini"
                placeholder="请输入属性值"
                @blur="addSaleAttrValue(row)"
                @keyup.enter.native="addSaleAttrValue(row)"
              />
              <el-button
                v-show="!row.isEdit"
                @click="showEdit(row, $index)"
                icon="el-icon-plus"
                size="mini"
              >
                添加
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template v-slot="{ row }">
              <el-tooltip effect="dark" content="删除" placement="top">
                <el-button
                  @click="delSaleAttr(row.saleAttrName)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                />
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { reqGetAllTrademarkList } from '@api/trademark'
import {
  reqGetBaseSaleAttrList,
  reqSaveSpuInfo,
  reqGetSpuImageList,
  reqGetSpuSaleAttrList,
  reqUpdateSpuInfo
} from '@api/spu'

export default {
  name: 'AddOrUpdateSpu',
  data() {
    return {
      spu: {
        spuName: '',
        tmId: '',
        description: '',
        spuImageList: [],
        spuSaleAttrList: [],
        saleAttr: ''
      },
      rules: {
        spuName: [{ required: true, message: '请输入SPU名称' }],
        tmId: [{ required: true, message: '请选择SPU品牌' }],
        description: [{ required: true, message: '请输入SPU描述' }],
        spuImageList: [{ required: true, message: '请上传SPU图片' }],
        spuSaleAttrList: [{ validator: this.validator, required: true }]
      },
      dialogImageUrl: '', // 预览图片地址
      dialogVisible: false, // 对话框显示&隐藏的标识
      trademarkList: [],
      maxImgLength: 10,
      baseSaleAttrList: [], // 基础销售属性列表
      saleAttrValue: '' // 正在编辑的销售属性值
    }
  },
  computed: {
    ...mapState({
      category3Id: (state) => state.category.category3Id,
      updatedSpu: (state) => state.spu.spu
    }),
    formatSpuImageList() {
      return this.spu.spuImageList.map((file) => {
        return {
          name: file.imgName,
          url: file.imgUrl,
          uid: file.uid
        }
      })
    },
    filterSaleAttrList() {
      // baseSaleAttrList有所有销售属性数据
      // spuSaleAttrList有添加的销售属性数据
      // 要显示的销售属性数据：将所有销售属性数据去掉添加的销售属性数据，剩下的就是了
      return this.baseSaleAttrList.filter((baseSaleAttr) => {
        // 判断baseSaleAttr.name是否在this.spu.spuSaleAttrList数组中，在的话就要过滤
        return !this.spu.spuSaleAttrList.some(
          (saleAttr) => saleAttr.saleAttrName === baseSaleAttr.name
        )
      })
    }
  },
  async mounted() {
    // 对解构的data属性进行重命名为trademarkList
    // const { data: trademarkList } = await reqGetAllTrademarkList()
    // const { data: baseSaleAttrList } = await reqGetBaseSaleAttrList()

    // 只要有一个请求失败，就所有结果都没有, 最终返回promise对象是失败状态
    // Promise.all()

    // 不管成功还是失败，都有结果，只是成功有成功的数据，失败有失败的原因
    // 总是返回成功状态
    const [trademarkList, baseSaleAttrList] = await Promise.allSettled([
      reqGetAllTrademarkList(),
      reqGetBaseSaleAttrList()
    ])

    /*
      成功：
      {
        status: "fulfilled"
        value: {code: 200, message: "成功", data: Array(13), ok: true}
      }
      失败：
      {
        status: "rejected"
        reason: '失败的原因'
      }
    */
    // console.log(trademarkList)

    if (trademarkList.status === 'fulfilled') {
      this.trademarkList = trademarkList.value.data.map((tm) => ({
        id: tm.id,
        tmName: tm.tmName
      }))
    }

    if (baseSaleAttrList.status === 'fulfilled') {
      this.baseSaleAttrList = baseSaleAttrList.value.data
    }
    // this.trademarkList = trademarkList.map((tm) => ({
    //   id: tm.id,
    //   tmName: tm.tmName
    // }))

    // this.baseSaleAttrList = baseSaleAttrList
  },
  methods: {
    ...mapMutations('spu', ['SET_IS_SHOW', 'SET_SPU']),
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.spu.spuImageList = fileList.map((file) => {
        return {
          imgName: file.name,
          imgUrl: file.url,
          uid: file.uid
        }
      })
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 图片上传成功
    handleAvatarSuccess(res, file) {
      if (this.spu.spuImageList.length >= this.maxImgLength) {
        this.$message({
          type: 'error',
          message: `上传图片最多${this.maxImgLength}张!`
        })
        return
      }

      this.spu.spuImageList.push({
        imgName: file.name,
        imgUrl: res.data,
        uid: file.uid // 避免更新时图片闪屏
      })
    },
    // 上传之前
    beforeAvatarUpload(file) {
      const isValidImage =
        file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt = file.size <= 500 * 1024

      if (!isValidImage) {
        this.$message({
          type: 'error',
          message: '上传头像图片只能是 JPG 或 PNG 格式!'
        })
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      // 返回值true 就会继续上传图片
      // 返回值false，就会终止上传
      return isValidImage && isLt
    },
    // 添加销售属性
    addSaleAttr() {
      // 1. 给table添加一条数据
      this.spu.spuSaleAttrList.push({
        isEdit: false,
        saleAttrName: this.spu.saleAttr,
        spuSaleAttrValueList: []
      })
      // 2. 让选中的销售属性清空
      this.spu.saleAttr = ''

      // this.$refs.form.clearValidate(['spuSaleAttrList'])
    },
    // 显示编辑模式
    showEdit(row, index) {
      row.isEdit = true
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 添加销售属性值
    addSaleAttrValue(row) {
      if (this.saleAttrValue) {
        row.spuSaleAttrValueList.push({
          saleAttrValueName: this.saleAttrValue
        })
        this.saleAttrValue = ''
      }

      row.isEdit = false
    },
    // 删除销售属性值
    delSaleAttrValue(row, saleAttrValue) {
      row.spuSaleAttrValueList = row.spuSaleAttrValueList.filter(
        (sale) => sale.saleAttrValueName !== saleAttrValue
      )
    },
    // 删除销售属性
    delSaleAttr(saleAttrName) {
      this.spu.spuSaleAttrList = this.spu.spuSaleAttrList.filter(
        (sale) => sale.saleAttrName !== saleAttrName
      )
    },
    validator(rule, value, callback) {
      const { spuSaleAttrList } = this.spu
      if (!spuSaleAttrList.length) {
        callback('请选择销售属性')
        return
      }

      const isValid = spuSaleAttrList.some((sale) => {
        return sale.spuSaleAttrValueList.length
      })

      if (!isValid) {
        // 校验失败
        callback('请添加销售属性值')
        return
      }

      // 校验通过
      callback()
    },
    submit() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const { category3Id } = this
          let {
            description,
            spuImageList,
            spuName,
            spuSaleAttrList,
            tmId
          } = this.spu
          const { id } = this.updatedSpu

          spuSaleAttrList = this.fotmatSaleAttrList(spuSaleAttrList)

          if (id) {
            // 更新
            await reqUpdateSpuInfo({
              id,
              category3Id,
              description,
              spuImageList,
              spuName,
              spuSaleAttrList,
              tmId
            })
          } else {
            // 添加
            await reqSaveSpuInfo({
              category3Id,
              description,
              spuImageList,
              spuName,
              spuSaleAttrList,
              tmId
            })
          }

          this.$message({
            type: 'success',
            message: `${id ? '更新' : '添加'}SPU成功`
          })

          this.cancel()
        }
      })
    },
    cancel() {
      this.SET_IS_SHOW(1)
      this.$refs.form.resetFields()
      this.SET_SPU({})
    },
    fotmatSaleAttrList(spuSaleAttrList) {
      const { baseSaleAttrList } = this
      /*
        添加
          要给spuSaleAttrList
            对象添加属性baseSaleAttrId
            对象中的数组spuSaleAttrValueList，也要添加 baseSaleAttrId，saleAttrName
      */
      return spuSaleAttrList.map((saleAttr) => {
        const { id } = baseSaleAttrList.find(
          (baseSaleAttr) => baseSaleAttr.name === saleAttr.saleAttrName
        )

        return {
          baseSaleAttrId: id, // 销售属性名对应基础销售属性的id
          saleAttrName: saleAttr.saleAttrName, // 销售属性名
          spuSaleAttrValueList: saleAttr.spuSaleAttrValueList.map(
            // 销售属性值列表
            (saleAttrValue) => {
              return {
                baseSaleAttrId: id, // 销售属性名对应基础销售属性的id
                saleAttrName: saleAttr.saleAttrName, // 销售属性名
                ...saleAttrValue // 销售属性值
              }
            }
          )
        }
      })
    }
  },
  watch: {
    async updatedSpu(updatedSpu) {
      const { spuName, tmId, description, id } = updatedSpu
      // 如果清空了SPU数据，会触发watch，此时不要发送请求
      if (!id) {
        return
      }
      this.spu.spuName = spuName
      this.spu.tmId = tmId
      this.spu.description = description

      const [spuImageList, spuSaleAttrList] = await Promise.all([
        reqGetSpuImageList(id),
        reqGetSpuSaleAttrList(id)
      ])
      this.spu.spuImageList = spuImageList.data
      this.spu.spuSaleAttrList = spuSaleAttrList.data.map((saleAttr) => {
        return {
          ...saleAttr,
          isEdit: false
        }
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.spu-input
  width: 150px
.spu-tag
  margin-right: 10px
</style>
