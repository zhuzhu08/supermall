<template>

    <swiper class="detail-swiper">
      <swiper-item  v-for="item in topImages" :key="item">
        <img :src="item" alt="" />
      </swiper-item>
    </swiper>

</template>



<script>
import Swiper from "@/components/common/swiper/Swiper.vue";
import SwiperItem from "@/components/common/swiper/Swiperltem.vue";

export default {
  name: "DetailSwiper",
  components: {
    Swiper,
    SwiperItem,
  },

  props: {
    topImages: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.detail-swiper{
  height: 500px;
  overflow: hidden;
}
</style>