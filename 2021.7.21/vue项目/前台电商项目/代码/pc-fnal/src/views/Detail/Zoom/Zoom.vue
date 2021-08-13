<template>
  <div class="spec-preview">
    <img v-lazy="img.imgUrl" :alt="img.imgName" />
    <div class="event" @mousemove="handleMove"></div>
    <div class="big">
      <img
        v-lazy="img.imgUrl"
        :alt="img.imgName"
        :style="{ left: bigImgLeft, top: bigImgTop }"
      />
    </div>
    <div class="mask" :style="{ left: maskLeft, top: maskTop }"></div>
  </div>
</template>

<script>
// https://www.lodashjs.com/docs/lodash.throttle
// import _ from "lodash"; // 完整引入，体积太大了
import { throttle } from "lodash"; // 按需引入

export default {
  name: "Zoom",
  props: {
    img: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      maskLeft: 0,
      maskTop: 0,
      bigImgLeft: 0,
      bigImgTop: 0,
    };
  },
  methods: {
    /*
      时间轴：
        1 1.1 1.2 2 2.1 2.2 3
        防抖和节流规定时间都是1s
        最终回调函数执行几次？
          防抖：1次，第4s时执行的
          节流：3次，第1s、2s、3s时执行的

      作用：优化函数的性能，减少规定时间内的函数调用次数
      函数防抖：在规定时间内，最后一次触发生效（如果再规定时间内触发，会重新计时）
      函数节流：在规定时间内，第一次触发生效（触发完开始计时）
    */
    handleMove: throttle(function (e) {
      // 大图：800 * 800
      // 中图event 400 * 400
      // 小绿 200 * 200
      const eventWidth = 400;
      const eventHeight = 400;
      const maskWidth = 200;
      const maskHeight = 200;
      // console.log(e);
      // 计算mask（小绿）的位置（左上角的位置）
      let left = e.offsetX - maskWidth / 2; // 当前鼠标位置距离元素左上角的左边距离
      let top = e.offsetY - maskHeight / 2; // 当前鼠标位置距离元素左上角的上边距离
      // 边界值判断（0 - eventWidth/2）
      if (left < 0) {
        left = 0;
      }
      if (left > eventWidth / 2) {
        left = eventWidth / 2;
      }
      if (top < 0) {
        top = 0;
      }
      if (top > eventHeight / 2) {
        top = eventHeight / 2;
      }
      // 计算大图的位置
      let bigImgLeft = -2 * left;
      let bigImgTop = -2 * top;

      // 设置mask（小绿）的位置
      this.maskLeft = left + "px";
      this.maskTop = top + "px";
      // 设置大图的位置
      this.bigImgLeft = bigImgLeft + "px";
      this.bigImgTop = bigImgTop + "px";
    }, 1000 / 60),
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>