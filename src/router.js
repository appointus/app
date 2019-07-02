import Vue from "vue";
import Router from "vue-router";
import Clients from "./views/Clients.vue";
import Appointments from "./views/Appointments.vue";
import AppHomePage from "./components/AppHomePage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: AppHomePage
    },
    {
      path: "/appointments",
      name: "Appointments",
      component: Appointments
    },
    {
      path: "/clients",
      name: "clients",
      component: Clients
    }
  ]
});
