<template>
  <div class="goods">
    <good-List-Item v-for="(item,index) in goods" :goods-item="item" :key="index" />
  </div>
</template>

<script>
import GoodListItem from "./GoodListItem.vue";

export default {
  name: "GoodsList",
  components: {
    GoodListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style scoped>
.goods {
  display: flex;
  /* flex-wrap: wrap;包裹的意思，会根据我们一行的宽度来显示多少个 */
  flex-wrap: wrap;
  /* justify-content: space-evenly;横向中间均等分 */
  justify-content: space-evenly;
}
</style>