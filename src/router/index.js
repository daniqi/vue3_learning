import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DrawingView from '@/views/DrawingView.vue'

const routes = [
    { path: '/', component: HomeView },
    { path: '/drawing', component: DrawingView },
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(),
    routes, // short for `routes: routes`
})

export default router
