import {createRouter, createWebHistory} from 'vue-router'
import CountryList from '../views/CountryList.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'CountryList',
            component: CountryList
        },
        {
            path: '/details/:name',
            name: 'details',
            props: true,
            // route level code-splitting
            // this generates a separate chunk (About.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import('../views/Country.vue'),
        }
    ]
})

export default router
