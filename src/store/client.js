import Vue from "vue";
import axios from "axios";
import config from "../config";

export default {
  state: {
    clients: []
  },
  getters: {
    allClients: state => {
      return state.clients;
    }
  },
  mutations: {
    ADD_CLIENT(state, payload) {
      state.clients.push(payload);
    },
    SET_CLIENT(state, payload) {
      Vue.set(state, "clients", ...[payload]);
    }
  },
  actions: {
    fetchClients({ commit }) {
      axios.get(config.clientsUrl).then(res => {
        commit("SET_CLIENT", res.data);
      });
    },
    addClient({ commit }, payload) {
      axios.post(config.clientsUrl, payload).then(() => {
        commit("ADD_CLIENT", payload);
      });
    }
  }
};
