<template>
  <div>
    <scroll class="content">
     
    </scroll>
  </div>
</template>

<script>
import scroll from "@/components/common/scroll/scroll.vue";

export default {
  name: "Profile",
  components: {
    scroll,
  },
};
</script>

<style scoped>
.content {
  height: 300px;
  background-color: pink;
  overflow: hidden;
}
</style>