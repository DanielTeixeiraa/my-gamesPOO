import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Jogos from '../components/Jogos'
import Plataformas from '../components/Plataformas'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/jogos',
    component: Jogos
    
  },
  {
    path: '/plataformas',
    component: Plataformas
    
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
