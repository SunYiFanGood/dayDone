<template>
  <div class="controls">
    <!-- 4. 失去焦点或按回车键触发 -->
    <input
      autocomplete="off"
      class="itxt"
      :value="currentValue"
      @blur="handleBlur"
      @keyup.enter="handleBlur"
    />
    <!-- v-model绑定的是input事件，输入时值就发生了变化，导致触发watch -->
    <!-- <input autocomplete="off" class="itxt" v-model="currentValue" /> -->
    <a
      :class="{
        plus: true,
        disabled: currentValue === max,
      }"
      @click="add"
      >+</a
    >
    <a
      :class="{
        mins: true,
        disabled: currentValue === min,
      }"
      @click="count"
      >-</a
    >
  </div>
</template>

<script>
/*
  1. 有最小值和最大值
  2. 输入小于最小值，变成最小值
     输入大于最大值，变成最大值
  3. 输入非数字内容，变成之前的值
  4. 失去焦点或按回车键触发
*/
export default {
  name: "InputNumber",
  props: {
    min: {
      type: Number,
      default: 1,
    },
    max: {
      type: Number,
      default: 10,
    },
    value: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentValue: this.value,
    };
  },
  methods: {
    handleBlur(e) {
      // 更新数据
      this.currentValue = e.target.value;
    },
    add() {
      // 最大值不能加
      if (this.currentValue === this.max) return;
      this.currentValue++;
    },
    count() {
      // 最小值不能减
      if (this.currentValue === this.min) return;
      this.currentValue--;
    },
  },
  watch: {
    currentValue(currentValue, oldValue) {
      /*
        2. 输入小于最小值，变成最小值
          输入大于最大值，变成最大值
        3. 输入非数字内容，变成之前的值
      */
      const { min, max } = this;
      // 用户输入的内容，是字符串类型, 要转换成number进行判断
      const value = +currentValue;
      let newVal = value;
      // 输入非数字内容，变成之前的值
      if (Number.isNaN(value)) {
        newVal = oldValue;
      }
      // 输入小于最小值，变成最小值
      else if (value < min) {
        newVal = min;
      }
      // 输入大于最大值，变成最大值
      else if (value > max) {
        newVal = max;
      }
      // 统一更新
      this.currentValue = newVal;
      // 更新外面的count的值
      this.$emit("input", newVal);
    },
  },
};
</script>

<style lang='less' scoped>
.controls {
  width: 48px;
  position: relative;
  float: left;
  margin-right: 15px;

  .itxt {
    width: 38px;
    height: 37px;
    border: 1px solid #ddd;
    color: #555;
    float: left;
    border-right: 0;
    text-align: center;
  }

  .plus,
  .mins {
    width: 15px;
    text-align: center;
    height: 17px;
    line-height: 17px;
    background: #f1f1f1;
    color: #666;
    position: absolute;
    right: -8px;
    border: 1px solid #ccc;
    cursor: pointer;
    &.disabled {
      color: #c0c4cc;
      cursor: not-allowed;
    }
  }

  .mins {
    right: -8px;
    top: 19px;
    border-top: 0;
  }

  .plus {
    right: -8px;
  }
}
</style>