import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";

Vue.use(Vuex);

const appointmentsUrl = "http://localhost:3000/appointments";
const clientsUrl = "http://localhost:3000/clients";
export default new Vuex.Store({
  state: {
    appoints: [],
    clients: []
  },
  getters: {
    APPOINTS: state => {
      return state.appoints;
    },
    CLIENTS: state => {
      return state.clients;
    }
  },
  mutations: {
    SET_APPOINTS: (state, payload) => {
      state.appoints = payload;
    },
    SET_CLIENTS: (state, payload) => {
      state.clients = payload;
    },
    ADD_APPOINT: (state, payload) => {
      state.appoints.push(payload);
    }
  },
  actions: {
    SAVE_APPOINT: (context, payload) => {
      Axios.post(appointmentsUrl, payload).then(() => {
        context.commit("ADD_APPOINT", payload);
      });
    },
    GET_APPOINTS: (context, payload) => {
      Axios.get(`${appointmentsUrl}/${payload.toString()}`).then(res => {
        context.commit("SET_APPOINTS", res.data);
      });
    },
    GET_CLIENTS: context =>
      Axios.get(clientsUrl).then(res => {
        context.commit("SET_CLIENTS", res.data);
      })
  }
});
