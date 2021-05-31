import Vue from 'vue'
import Router from 'vue-router'
import Clients from '../views/Clients/'
import Appointments from '../views/Appointments.vue'
import Home from '../components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/appointments',
      name: 'Appointments',
      component: Appointments
    },
    {
      path: '/clients',
      name: 'clients',
      component: Clients
    }
  ]
})
