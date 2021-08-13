import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home";
// import Search from "../views/Search";
// import Login from "../views/Login";
// import Register from "../views/Register";
// import Detail from "../views/Detail";
// import AddCartSuccess from "../views/AddCartSuccess";
// import ShopCart from "../views/ShopCart";
// import Trade from "../views/Trade";
// import Pay from "../views/Pay";
// import PaySuccess from "../views/PaySuccess";
// import Center from "../views/Center";

// 路由懒加载: 1. 将路由组件打包成单独的文件（js、css） 2. 需要使用时才会加载
const Home = () => import(/* webpackChunkName: 'Home' */"../views/Home")
const Search = () => import("../views/Search")
const Login = () => import("../views/Login")
const Register = () => import("../views/Register")
const Detail = () => import("../views/Detail")
const AddCartSuccess = () => import("../views/AddCartSuccess")
const ShopCart = () => import("../views/ShopCart")
const Trade = () => import("../views/Trade")
const Pay = () => import("../views/Pay")
const PaySuccess = () => import("../views/PaySuccess")
const Center = () => import("../views/Center")

Vue.use(VueRouter);

const routes = [
  {
    name: "Home", // 命名路由
    path: "/",
    component: Home,
    // props() {}
    // children: []
    // redirect: ''
  },
  {
    name: "Search",
    // params参数，路径必须是:xxx写法才行
    // :xxx? 可选的params参数，可以有可以没有
    // :xxx 必填的params参数，必要要有，没有地址重定向到/
    path: "/search/:keyword?",
    component: Search,
    // 路由导航守卫
    // beforeEnter(to, from, next) {
    //   console.log(to, from);
    //   next();
    // }
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    // 当当前路由加载了，meta参数就会传入的$route.meta中
    meta: {
      isFooterHide: true,
    },
  },
  {
    name: "Register",
    path: "/register",
    component: Register,
    meta: {
      isFooterHide: true,
    },
  },
  {
    name: "Detail",
    path: "/detail/:id",
    component: Detail,
  },
  {
    name: "AddCartSuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
  },
  {
    name: "ShopCart",
    path: "/shopcart",
    component: ShopCart,
    // 路由导航守卫
    // beforeEnter(to, from, next) {
    //   console.log(to, from);
    //   next();
    // }
  },
  {
    name: "Trade",
    path: "/trade",
    component: Trade,
    // 路由导航守卫
    beforeEnter(to, from, next) {
      // console.log(to, from);
      // 是不是从 ShopCart 跳转过来的，是的话才能进来
      if (from.name === 'ShopCart') {
        next();
        return;
      }

      // 不是的话，就从哪来回哪去
      next(from);
    }
  },
  {
    name: "Pay",
    path: "/pay",
    component: Pay,
    // 路由导航守卫
    beforeEnter(to, from, next) {
      // console.log(to, from);
      // 是不是从 Trade 跳转过来的，是的话才能进来
      if (from.name === 'Trade') {
        next();
        return;
      }

      // 不是的话，就从哪来回哪去
      next(from);
    }
  },
  {
    name: "PaySuccess",
    path: "/paysuccess",
    component: PaySuccess,
    // 路由导航守卫
    beforeEnter(to, from, next) {
      // console.log(to, from);
      // 是不是从 Pay 跳转过来的，是的话才能进来
      if (from.name === 'Pay') {
        next();
        return;
      }

      // 不是的话，就从哪来回哪去
      next(from);
    }
  },
  {
    name: "Center",
    path: "/center",
    component: Center,
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  // 滚动行为
  // 当路由切换时，控制滚动条的行为（位置）
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
});

// 定义全局导航守卫
// router.beforeEach((to, from, next) => {
//   /*
//     to   要去路由的配置对象（$route）
//     from 从哪来的路由的配置对象
//     例如：/login --> /register  to: /register  from: /login
//     next 必须要调用，不调用就不会跳转到下一个地址
//       next() 直接调用，跳转到to路由地址
//       next({ name: 'xxx' }) 跳转到指定路由地址
//   */
//   console.log(to, from);
//   next()
// })

// router.beforeResolve((to, from, next) => {

// })

// router.afterEach((to, from, next) => {

// })

export default router;
