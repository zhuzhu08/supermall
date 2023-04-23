<template>
  <div v-if="Object.keys(goods).length !== 0" class="base-inof">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span v-if="goods.discount" class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{ goods.columns[0] }}</span>
      <span>{{ goods.columns[1] }}</span>
      <span>{{ goods.services[goods.services.length - 1].name }}</span>
    </div>
    <div class="info-service">
      <span
        class="info-service-item"
        v-for="index in goods.services.length - 1"
        :key="index"
      >
        <img :src="goods.services[index - 1].icon"
      />
      <span>{{ goods.services[index - 1].name }}</span>
    </span>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-inof {
  margin-top: 25px;
  padding: 0 8px;
  color: #999;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  color: #222;
}
.info-price {
  margin-top: 35px;
}
.info-price .n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.info-price .o-price {
  font-size: 13px;
  margin-left: 5px;
  text-decoration: line-through;
  /* color:var(--color-high-text) */
}
.info-other{

 margin-top: 40px;
}
.info-other span{
margin-right: 50px;
font-size: 16px;
}
.info-service{
    margin-top: 30px;
}
.info-service span{
    margin-right: 5px;
    font-size: 18px;
    /* font-weight: 700; */
    color: black;
}
.info-service img{
    height: 15px;
    width: 15px;
}
</style>