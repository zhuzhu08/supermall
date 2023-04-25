<template>
  <div id="app" class="wrapper">
    <!-- 排除Detail文件,使用exclude="Detail",因为每次点击进去都需要一个新的数据 跟首页分类不一样-->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  
  </div>
</template>

<script>
 import MainTabBar from './components/content/mainTabbar/MainTabBar.vue';


export default {
  name: 'App',
  components: {
   MainTabBar
  }
}
</script>

<style>
@import 'assets/css/base.css';
</style>
