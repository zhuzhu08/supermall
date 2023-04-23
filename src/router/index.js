import Vue from "vue";
import VueRouter from 'vue-router';

const Home = () =>
    import ('../view/home/Home.vue')
const Cart = () =>
    import ('../view/cart/Cart.vue')
const Catagory = () =>
    import ('../view/catagory/Catagory.vue')
const Profile = () =>
    import ('../view/profile/Profile.vue')
const Detail = () =>
    import ('../view/detail/Detail.vue')



// 1.安装插件
Vue.use(VueRouter)

// 2.插件router


const routes = [{
    path: '',
    redirect: '/home'
}, {
    path: '/home',
    component: Home
}, , {
    path: '/cart',
    component: Cart
}, {
    path: '/catagory',
    component: Catagory
}, {
    path: '/profile',
    component: Profile
}, {
    path: '/detail:iid',
    component: Detail
}]

const router = new VueRouter({
    routes,
    mode: 'history'

})

export default router