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
    }
  }
};
