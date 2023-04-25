<template>
  <div class="back-top">
<img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
    name:'BackTop',
  
};
</script>

<style scoped>
.back-top{
  /* 返回顶部按显示出来在页面中 */
    position: fixed;
    right: 6px;
    bottom: 55px;
}
.back-top img{
    width: 43px;
    height: 43px;
}
</style>