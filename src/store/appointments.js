import Axios from "axios";
import config from "../config";

export default {
  state: {
    appoints: []
  },
  getters: {
    APPOINTS: state => {
      return state.appoints;
    }
  },
  mutations: {
    SET_APPOINTS: (state, payload) => {
      state.appoints = payload;
    },
    ADD_APPOINT: (state, payload) => {
      state.appoints.push(payload);
    }
  },
  actions: {
    SAVE_APPOINT: (context, payload) => {
      Axios.post(config.appointmentsUrl, payload).then(() => {
        context.commit("ADD_APPOINT", payload);
      });
    },
    GET_APPOINTS: (context, payload) => {
      Axios.get(`${config.appointmentsUrl}/${payload.toString()}`).then(res => {
        context.commit("SET_APPOINTS", res.data);
      });
    }
  }
};
