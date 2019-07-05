import Vue from "vue";
import axios from "axios";
const baseUrl = "http://localhost:3000/clients";
export default {
  state: {
    isFormHidden: true,
    clients: [],
    client: {
      first_Name: "",
      second_Name: "",
      phone: ""
    }
  },
  getters: {
    allClients: state => {
      return state.clients;
    },
    allClient: state => {
      return state.client;
    }
  },
  mutations: {
    SAVE_CLIENT(state, payload) {
      state.client.first_Name = payload;
      state.client.second_Name = payload;
      state.client.phone = payload;
    },
    ADD_CLIENT(state, payload) {
      state.clients.push(payload);
    },
    SET_CLIENT(state, payload) {
      Vue.set(state, "clients", ...[payload]);
    }
  },
  actions: {
    SET_CLIENT({ commit }, payload) {
      commit("SAVE_CLIENT", payload);
    },
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
