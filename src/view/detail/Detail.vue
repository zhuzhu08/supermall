<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <good-list ref="recommend" :goods="recommends" />
    </scroll>
    <detail-bottom-bar @addCart="addToCar" />
    <back-top @click.native="backclick" v-show="isShowBckaTop" />
    <!-- <toast message="message" :show="show" /> -->
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import scroll from "@/components/common/scroll/scroll.vue";
import GoodList from "@/components/content/goods/GoodList.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";
import { debounce } from "@/components/common/utils/utils";

// import Toast from "@/components/common/toast/Toast.vue";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    scroll,
    GoodList,
    BackTop,
    // Toast,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBckaTop: false,
      // message: "",
      // show: false,
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求详情数据
    getDetail(this.iid).then((res) => {
      //  console.log(res);
      // 1.获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //  2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.创建店铺列表
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品信息
      this.detailInfo = data.detailInfo;
      //5.商品详细尺寸
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      // 1.第一次获取，值不对
      // 值不对的原因：this.$refs.params.$el没有渲染
      // this.themeTopYs = [];
      // this.themeTopYs.push(0);
      // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);

      //  this.$nextTick(() => {
      // 2.第二次获取
      // 值不对的原因：图片没有计算在内
      // 根据最新的数据，对应dom是已经被渲染出来
      // 但是图片依然是没有加载完（目前offsetTop不包含其中的图片）
      //offsetTop值不对的时候，都是因为图片的问题
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      //   })
      // });
      // 2.取出推荐数据
      getRecommend().then((res) => {
        // console.log(res);
        this.recommends = res.data.list;
      });

      // this.getThemTopY = debounce(() => {
      //   console.log('-----------')
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
    });
    //  4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      // console.log('-----------')
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
      // console.log(this.themeTopYs);
    }, 1000);
  },
  mounted() {},

  methods: {
    imageLoad() {
      //自动刷新一次
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      // console.log(position)
      //  1.获取y值
      const positionY = -position.y;
      // 2.positionY和主题中值进行对比
      // [0,7938,9120,9452]
      // positionY 在0-7938之间 index是0
      // positionY 在7938-9120之间 index是1
      // positionY 在9120-9425之间 index是2

      // positionY 超过9120值 index是3
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // console.log(i+1)
        //  if(positionY>this.themeTopYs[i]&&positionY<this.themeTopYs[i+1]){
        //   console.log(i)
        //}
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[[i + 1]]
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex)
          this.$refs.nav.currentIndex = this.currentIndex;
        }
        // if(this.currentIndex!==i&&((i<length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===length-1&&positionY>=this.themeTopYs[i]))){
        //   // console.log(i)
        //   this.currentIndex=i
        //   // console.log(this.currentIndex)
        //   this.$refs.nav.currentIndex=this.currentIndex
        // }
      }

      //  3.是否显示回到顶部

      this.isShowBckaTop = -position.y > 1000;
      //  2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    addToCar() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.img = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      // console.log(product)
      // 2.将商品添加到购物车里
      // this.$store.commit('addCart',product)
       this.$store.dispatch("addCart", product).then((res) => {
         console.log(res)
        this.$toast.show(res,1500)
        console.log(this.$toast)
       });
     
      // console.log(this.$store.state)
    },
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>