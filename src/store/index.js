import Vue from "vue";
import Vuex from "vuex";
import client from "./client";
import appoint from "./appoint";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    client,
    appoint
  }
});
