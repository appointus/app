import Vue from "vue";
import axios from "axios";
const baseUrl = "http://localhost:3000/clients";
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
      axios.get(baseUrl).then(res => {
        commit("SET_CLIENT", res.data);
      });
    },
    addClient({ commit }, payload) {
      axios.post(baseUrl, payload).then(() => {
        commit("ADD_CLIENT", payload);
      });
    }
  }
};
