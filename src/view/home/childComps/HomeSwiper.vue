<template>
  <div>
    <swiper>
      <swiper-item v-for="(item, index) in banners" :key="index">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad" />
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>



<script>
import Swiper from "@/components/common/swiper/Swiper.vue";
import SwiperItem from "@/components/common/swiper/Swiperltem.vue";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isload: false,
    };
  },

  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    // 只需要发出一次，所有我们用一个变量来记录
    imageLoad() {
      // 如果这里还没有加载
      if (!this.isload) {
        this.$emit("swiperImageLoad");
        // 加载完成
        this.isload = true;
      }
    },
  },
};
</script>

<style scoped>
</style>