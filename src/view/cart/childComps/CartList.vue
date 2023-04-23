<template>
  <div class="cart-list">
   <scroll class="content" ref="scroll">
    <cart-list-item v-for="(item,index) in cartlist" :key="index"  :item-info="item"
   />
   </scroll>
  </div>
</template>

<script>
import scroll from "@/components/common/scroll/scroll.vue";

import CartListItem from './CartListItem.vue'


import { mapGetters } from "vuex";




export default {
  name: "CartList",
  components:{
    scroll,
    CartListItem 
  },
  computed: {
    ...mapGetters(["cartlist"]),
  },
  activated(){
    // 做一次刷新，就能滚动
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list{
    height: calc(100% - 44px - 49px -40px);
}
.content{
    height:100%;
    overflow: hidden;
}
</style>