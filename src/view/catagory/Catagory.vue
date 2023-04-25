<template>
  <div class="wrapper" ref="aaa">
    <nav-bar class="catagory-nav"><div slot="center">分类</div></nav-bar>
   
  </div>
</template>

<script>
import BScroll from "better-scroll";

import NavBar from "@/components/common/navbar/NavBar.vue";


export default {
  name: "Catagory",
  components:{
    NavBar
  },
  data() {
    return {
      scroll: null,
    };
  },
  created() {
    // this.scroll=new BScroll(this.$refs.aaa,{})
  },
  mounted() {
    this.scroll = new BScroll(document.querySelector(".wrapper"), {
      probeType: 3,
      click:true,
      pullUpLoad:true
    })
    this.scroll.on('scroll',(position)=>{
        // console.log(position)
    })
    this.scroll.on('pullingUp',()=>{
        console.log('上拉加载更多')
    })
  },methods:{
    btnClick(){
        console.log('btnClick')
    }
  }
};
</script>

<style scoped>
.catagory-nav{
   background-color: var(--color-tint);
  color: #fff;
}

</style>