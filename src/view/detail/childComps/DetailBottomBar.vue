<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="icon service"></i>
        <span class="text">客服</span>
      </div>

      <div>
        <i class="icon shop"></i>
        <span class="text">店铺</span>
      </div>

      <div>
        <i class="icon select"></i>
        <span class="text">收藏</span>
      </div>
    </div>

    <div class="bar-item bar-rigth">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
    <!-- <sport-ball ref="ball" class="spor-ball"></sport-ball>  -->
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods:{
    addToCart(){
        this.$emit('addCart')
    }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 49px;
  /* position: fixed; */
  background-color: #ffff;
  /* left: 0;
    right: 0;
    bottom: 0;  */
  position: relative; 
   bottom: 49px;
 text-align: center;
 display: flex;

  
   
}
.bar-item {
flex: 1;
display: flex;
}
.bar-left>div{
    flex: 1;
}
.bar-left .text{
    font-size: 13px;
}
.bar-left .icon{
    display: block;
    width: 22px;
    height: 22px; 
    margin: 5px auto 3px; 
    background: url('~assets/img/detail/detail_bottom.png')0 0/100%;
}
.bar-left .service{
    background-position: 0 -54px;
}
.bar-left .shop{
    background-position: 0 -98px;
}
.bar-rigth{
    font-size: 15px;
    color: #fff;
    line-height: 49px;
    display: flex;
    
}
.bar-rigth .cart{
    background-color: #ffe817;
    color: #333;
    flex: 1;
}
.bar-rigth .buy{
    background-color: #f69;
    flex: 1;
 }
/* .spor-ball{
    position: absolute;
    left: 22px;
    bottom: 20px;
}  */

</style>