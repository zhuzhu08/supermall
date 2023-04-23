<template>
  <div id="shop-item">
    <div class="item-selector">
        <chenk-button :is-checked="itemInfo.checked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="itemInfo.img" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">{{ itemInfo.title }}</div>
      <div class="item-desc">{{ itemInfo.desc }}</div>
    </div>
    <div class="item-bottom">
      <div class="item-price left">￥{{ itemInfo.price }}</div>
      <div class="item-count rigth">x{{ itemInfo.count }}</div>
    </div>
  </div>
</template>

<script>
import ChenkButton from '@/components/content/chenkButton/ChenkButton.vue';


export default {
  name: "CartListIten",
  components:{
    ChenkButton
  }
  ,
  props: {
    itemInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods:{
    checkClick(){
      this.itemInfo.checked=!this.itemInfo.checked
    }
  }
};
</script>


<style scoped>
#shop-item{
 width: 100%;
 display: flex;
 font-size:12px; 
 padding: 5px;
 border-bottom: 1px solid #ccc;
}
.item-selector{
    width: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.item-title, .item-desc{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

}
.item-img{
    padding: 5px;
}
.item-img img{
    width: 80px;
    height: 100px;
    display: block;
    border-radius: 5px;
}
.item-info{
    font-size: 17px;
    color: #333;
    padding: 5px 10px;
    position: relative;
    overflow: hidden;
}
.item-info .item-desc{
    font-size: 14px;
    color: #666;
    margin-top: 15px;
}
.item-bottom{
    margin-top:10px;
  
    /* bottom: 25px;
    left:112px;
    right: 20px; */
    font-size: 16px;
}
.item-bottom .item-price{
    color: orangered;
    
}
/* .item-bottom .item-count{


} */
</style>