import Vue from 'vue'
import Router from 'vue-router'
import Userpage from '@/components/Userpage'
//import About from '@/components/About'
import CreateQueue from '@/components/CreateQueue'
import GotoQueue from '@/components/GotoQueue'
import ManageQueue from '@/components/ManageQueue'
import QueueDisplay from '@/components/QueueDisplay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Join Queue',
      component: Userpage
    },
    {
        path: '/about',
        name: 'About',
        component: QueueDisplay,
        props: true
    },
    {
      path: '/create',
      name: 'Create Queue',
      component: CreateQueue
    },
    {
      path: '/goto',
      name: 'Go to Queue',
      component: GotoQueue
    },
    {
      path: '/manage/:collectionID',
      name: 'Manage Queue',
      component: ManageQueue,
      props: true
    }
  ]
})