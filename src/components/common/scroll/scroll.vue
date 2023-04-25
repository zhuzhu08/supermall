<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,
      //  监听位置
      probeType: this.probeType,
      //  上拉加载更多
      pullUpLoad: this.pullUpLoad,
    });
    //2.监听滚动区域
    if (this.probeType === 2 || this.probeType === 3) {
      // 这里是 实时监听滚动到那个位置
      this.scroll.on("scroll", (position) => {
        // 发射出去
        this.$emit("scroll", position);
      });
    }

    // console.log(this.scroll)
    this.scroll.refresh();

    // 3.监听scroll滚到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        // console.log('监听滚动到底部')
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    // 回到顶部
    scrollTo(x, y, time = 500) {
      this.scroll && this.scroll.scrollTo && this.scroll.scrollTo(x, y, time);
    }, 
    //上拉加载更多
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      //  console.log('----')
      // 根据最新的数据重新算出高度
      this.scroll && this.scroll.refresh();
    },
    getScrolly() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style scoped>
</style>