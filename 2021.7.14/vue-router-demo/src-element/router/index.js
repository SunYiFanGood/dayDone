import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import About from '../views/About/About'
import News from '../views/About/News'
import Info from '../views/About/Info'
import Details from '../views/About/News/Details'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        children: [
            {
            path: '/about/news',
            name: 'News',
            component: News,
            children:[{
                path: '/about/news/details:id',
                name: 'Details',
                component:Details
            }]
            },
            {
                path: '/about/info',
                name: 'Info',
                component: Info
            },
        ]

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
