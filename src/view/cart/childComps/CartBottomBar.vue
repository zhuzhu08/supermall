<template>
  <div class="bottom-bar">
    <div class="check-conter">
      <chenk-button 
      :is-checked="isSelectAll"
       class="check-button"
       @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="price">合计：{{ totalPrice }}</div>

    <div class="caculate" @click="calcClick">去计算({{ checkLength }})</div>
  </div>
</template>

<script>
import ChenkButton from "@/components/content/chenkButton/ChenkButton.vue";

// import getters from "@/store/getters";

export default {
  name: "CartBottomBar",
  components: {
    ChenkButton,
  },
  computed: {
    // ...getters(['cartlist']),
    totalPrice() {
      return (
        "￥" +
        this.$store.getters.cartlist
        // 遍历有选中得
          .filter((item) => {
            return item.checked;
          })
          // 遍历得到选中得价格*数量
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          // 保留两位小数
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartlist.filter((item) => item.checked).length;
    },
    isSelectAll() {
    //   return !(this.$store.getters.cartlist.filter(item => !item.checked).length)
    if(this.$store.getters.cartlist.length === 0)return false
    // find查找不选中item.checked 前面也要取反不选中
    return !this.$store.getters.cartlist.find(item=>!item.checked)
    },
  },
  methods:{
    checkClick(){
       if(this.isSelectAll) {//全部选中
        this.$store.getters.cartlist.forEach(item=>item.checked=false)
       }else{//部分或全部不选中
        this.$store.getters.cartlist.forEach(item=>item.checked=true)
       }
    },
    calcClick(){
        if(!this.isSelectAll){
            this.$toast.show('请选择购买的商品',1500)
        }
    }
  }
};
</script>

<style  scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  display: flex;
  line-height: 40px;
  /* bottom: 40px; */
}
.check-conter {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 65px;
}
.check-button {
  margin-left: 5px;
  margin-right: 3px;
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.price {
  margin-left: 35px;
  flex: 1;
}
.caculate {
  width: 95px;
  background-color: var(--color-tint);
  color: #fff;
  text-align: center;
}
</style>