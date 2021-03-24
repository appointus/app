import Vue from "vue";
import axios from "axios";
import config from "../config";

const baseUrl = `${config.Url}/clients`;

export default {
  state: {
    clients: []
  },
  getters: {
    CLIENTS: state => {
      return state.clients;
    }
  },
  mutations: {
    ADD_CLIENT(state, payload) {
      state.clients.push(payload);
    },
    SET_CLIENT(state, payload) {
      Vue.set(state, "clients", ...[payload]);
    },
    EDIT_CLIENT(state, payload) {
      state.clients.forEach((item, index) => {
        if (item._id === payload._id) {
          state.clients[index] = payload;
          return;
        }
      });
    }
  },
  actions: {
    GET_CLIENTS({ commit }) {
      axios.get(baseUrl).then(res => {
        commit("SET_CLIENT", res.data);
      });
    },
    SAVE_CLIENT({ commit }, payload) {
      axios.post(baseUrl, payload).then(() => {
        commit("ADD_CLIENT", payload);
      });
    },
    editClient({ commit }) {
      axios.get(baseUrl).then(res => {
        commit("EDIT_CLIENT", res.data);
        console.log("EDIT_CLI", res.data);
      });
    },
    updateClient({ commit }, payload) {
      axios.put(baseUrl + "/" + payload._id, payload).then(() => {
        commit("EDIT_CLIENT", payload);
      });
    }
  }
};
