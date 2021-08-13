<template>
  <div class="pagination">
    <button
      :class="{
        disabled: currentPage === 1,
      }"
      :disabled="currentPage === 1"
      @click="$emit('update:currentPage', currentPage - 1)"
    >
      &lt;
    </button>
    <button
      :class="{
        active: currentPage === 1,
      }"
      @click="$emit('update:currentPage', 1)"
    >
      1
    </button>
    <button v-show="startEnd.start > 2">...</button>
    <!-- 
      [1] 2 3 4
      中间按钮遍历个数：startEnd.end - startEnd.start + 1
      例如：3 - 2 + 1 = 2

      思考：
        1. 向左向右的边界值判断
          让按钮禁用
            disabled 控制点击能否使用
            class 样式控制禁用效果
        2. 点击按钮切换相应的页码
          @click="currentPage = xxx"
        3. ...显示和隐藏问题
          左边...  v-show="startEnd.start > 2"
          右边...  v-show="startEnd.end < totalPages - 1"
        4. 当total值小的时候怎么显示正确页码
          问题当只有一页时，显示错误  1 0 1
          解决 将后面的 0 1 隐藏
          0：中间不要显示按钮，startEnd.end - startEnd.start + 1 = 0
            等于0就不会遍历了
          1: 判断totalPages等于1就隐藏 
        5. 相同表达式太多能不能优化 
          getCurrentValue(item)
        6. 两个事件处理
          @size-change
          @current-change
    -->
    <button
      v-for="item in startEnd.end - startEnd.start + 1"
      :key="item"
      :class="{
        active: currentPage === getCurrentValue(item),
      }"
      @click="$emit('update:currentPage', getCurrentValue(item))"
    >
      {{ getCurrentValue(item) }}
    </button>
    <button v-show="startEnd.end < totalPages - 1">...</button>
    <button
      :class="{
        active: currentPage === totalPages,
      }"
      @click="$emit('update:currentPage', totalPages)"
      v-show="totalPages > 1"
    >
      {{ totalPages }}
    </button>
    <button
      :class="{
        disabled: currentPage === totalPages,
      }"
      :disabled="currentPage === totalPages"
      @click="$emit('update:currentPage', currentPage + 1)"
    >
      &gt;
    </button>

    <select v-model="myPageSize">
      <option v-for="pageSize in pageSizes" :key="pageSize" :value="pageSize">
        每页 {{ pageSize }} 条
      </option>
    </select>

    <!-- <span>总数：{{ total }}</span> -->
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 中划线命名的属性，传递数据时，会自动转换小驼峰命名法
    "current-page": {
      type: Number,
      default: 1,
    },
    "page-size": {
      type: Number,
      default: 5,
    },
    "page-sizes": {
      type: Array,
      // 数组默认值，必须写成函数形式
      default: () => [5, 10, 15, 20],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      // currentPage: this.currentPage,
      // pageSize: this.pageSize,
      isEmited: false,
    };
  },
  computed: {
    // 总页数
    totalPages() {
      return Math.ceil(this.total / this.myPageSize);
    },
    startEnd() {
      /*  
        分析：
          1 ... 3 4 [5] 6 7 ... 10
            开始：1
            结束：总页数 totalPages
            问题：中间显示什么？
            已知：
              当前页码：currentPage 
            求：中间按钮的开始的值 和 结束的值
            会定义计算属性，来计算 开始的值start 和 结束的值end
        解决：
          - start = currentPage - 2
          - end = currentPage + 2
            end = start + 5 - 1 = start + 4
        问题1:
          1 [2] 3 4 5 6 ... 10
          按照之前的公式：start = 0  end = 4
          而实际start = 2  end = 6
          怎么办？
            解决：start不能小于2
            if (start < 2) {
              start = 2;
            }
            这样计算：start = 2  end = 6
        问题2:
          1 ... 5 6 7 8 [9] 10
          按照之前的公式：start = 7  end = 11
          而实际start = 5  end = 9
          怎么办？
            解决：end 不能大于 totalPages - 1
 
            if (end > totalPages - 1) {
              // 只修正了end的值，start还有问题
              end = totalPages - 1;
              start = end - 4
            }
          这样计算：start = 5  end = 9
        问题3:
          1 2 [3] 4
          1 2 [3] 4 5
          1 2 [3] 4 5 6 7
          解决：
            按照之前的公式：start = 2  end = 6
            而实际start = 2  end = 4

            判断totalPages是否小于等于7(要显示的按钮总数)
            start = 2
            end = totalPages - 1
          
        问题4:
          [1]
            解决：
              判断totalPages<=1, 让start和end不显示
              start = 1
              end = 0
      */
      const { totalPages, currentPage } = this;

      if (totalPages <= 1) {
        return {
          start: 1,
          end: 0,
        };
      }

      if (totalPages <= 7) {
        return {
          start: 2,
          end: totalPages - 1,
        };
      }

      let start = currentPage - 2;

      if (start < 2) {
        start = 2;
      }

      let end = start + 4;

      if (end > totalPages - 1) {
        end = totalPages - 1;
        start = end - 4;
      }

      return {
        start,
        end,
      };
    },
    myPageSize: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      },
    },
  },
  // mounted() {
  //   console.log(this);
  // },
  methods: {
    getCurrentValue(item) {
      return item + this.startEnd.start - 1;
    },
  },
  watch: {
    currentPage(currentPage) {
      if (this.isEmited) {
        this.isEmited = false;
        return;
      }
      this.$emit("current-change", currentPage);
    },
    myPageSize(pageSize) {
      if (this.totalPages < this.currentPage) {
        // this.currentPage = this.totalPages;
        this.$emit("update:currentPage", this.totalPages);
        this.isEmited = true;
      }
      this.$emit("size-change", pageSize);
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  display: flex;
  justify-content: center;
  button {
    outline: none;
    border: none;
    margin: 0 5px;
    width: 30px;
    height: 30px;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
    cursor: pointer;
    &.active {
      background-color: #409eff;
      color: #fff;
    }
    &.disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }
}
</style>