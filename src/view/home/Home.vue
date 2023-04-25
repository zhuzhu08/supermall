<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <TabControl
      :titles="['流行', '新款', '精选']"
      @tabclick="tabclick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />

    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <TabControl
        :titles="['流行', '新款', '精选']"
        @tabclick="tabclick"
        ref="tabControl2"
      />
      <good-list :goods="showGoods" />
    </scroll>
    <!-- <goodListItem /> -->
    <back-top @click.native="backclick" v-show="isShowBckaTop" />
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper.vue";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";

import NavBar from "@/components/common/navbar/NavBar.vue";
import TabControl from "@/components/content/tabControl/TabControl.vue";
import GoodList from "@/components/content/goods/GoodList.vue";
import GoodListItem from "@/components/content/goods/GoodListItem.vue";
import scroll from "@/components/common/scroll/scroll.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";

import { getHomeMultidata, getHomeGoods } from "@/network/home";
import { debounce } from "@/components/common/utils/utils";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,

    NavBar,
    TabControl,
    GoodList,
    GoodListItem,
    scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBckaTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // destroyed() {
  //   console.log("home destroyed");
  // },
    activated(){
      // 记录离开时的状态
      this.$refs.scroll.scrollTo(0,this.saveY,0)
     this.$refs.scroll.refresh()
    },
    deactivated(){
      // 1.保存y值
   this.saveY=this.$refs.scroll.getScrolly()
  //  2.取消全局事件的监听
  //  this.$bus.$off('itemImgLoad',this.itemImgListener)
    },

  created() {
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 3.监听item中图片加载完成

    // 进行防抖操作相当于本来30张图片要调用30次，使用防抖只需要调用一次
    const refresh = debounce(this.$refs.scroll.refresh,50);

    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
    // console.log(this.$refs.tabControl.$el.offsetTop)
  },
  methods: {
    /*
           事件监听相关方法 
          */

          // 防抖函数处理
   

    tabclick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 给我们最新点击的值保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backclick() {
      // 500是返回顶部的速度
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    //得到scroll传过来的position，返回顶部的距离
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBckaTop = -position.y > 1000;
      //  2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },

    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      // 所有组件都有一个属性$el:用于获取组件中的元素
      // console.log(this.$refs.tabControl.$el.offsetTop)
    },

    /*
        网络请求相关的方法
        */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res)
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.tab-control {
  /* 吸顶效果 */
  /* position: static;
  top：44px
  */

  position: relative;
  z-index: 9;
}

/* .content{
  height: calc(100% - 93px);
  overflow: hidden; 
  margin-top: 44px;
} */
</style>