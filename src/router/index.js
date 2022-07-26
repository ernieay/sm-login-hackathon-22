import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AuDoodleView from '../views/AuDoodleView.vue'
import AuGameView from '../views/AuGameView.vue'
import PhDoodleView from '../views/PhDoodleView.vue'
import PhGameView from '../views/PhGameView.vue'
import XmasView from '../views/XmasView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/xmas',
    name: 'xmas',
    component: XmasView
  },
  {
    path: '/au-doodle',
    name: 'au doodle',
    component: AuDoodleView
  },
  {
    path: '/au-game',
    name: 'au game',
    component: AuGameView
  },
  {
    path: '/ph-doodle',
    name: 'ph doodle',
    component: PhDoodleView
  },
  {
    path: '/ph-game',
    name: 'ph game',
    component: PhGameView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
