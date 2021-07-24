import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Recommend from '@/views/recommend'
import Singer from '@/views/singer'
import SingerDetail from '@/views/singer-detail'
import Search from '@/views/search'
import TopList from '@/views/top-list'
import TopDetail from '@/views/top-detail'
const Album = () => import('@/views/album'/* webpackChunkName: "album" */)
import UserCenter from '@/views/user-center'
// const UserCenter = () => import('@/views/user-center'/* webpackChunkName: "album" */)
const routes = [{
    path: '/',
    redirect: '/recommend'
  }, {
    path: '/recommend',
    component: Recommend,
    children: [
      {
        path: ':id',
        component: Album
      }
    ]
  },
  {
    path: '/singer',
    component: Singer,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/search',
    component: Search,
    children: [
      {
        path: ':id',
        component: SingerDetail
      }
    ]
  },
  {
    path: '/top-list',
    component: TopList,
    children: [
      {
        path: ':id',
        component: TopDetail
      }
    ]
  },
  {
    path: '/user',
    component: UserCenter
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
