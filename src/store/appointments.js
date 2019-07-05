import Axios from "axios";

const appointmentsUrl = "http://localhost:3000/appointments";
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
      Axios.post(appointmentsUrl, payload).then(() => {
        context.commit("ADD_APPOINT", payload);
      });
    },
    GET_APPOINTS: (context, payload) => {
      Axios.get(`${appointmentsUrl}/${payload.toString()}`).then(res => {
        context.commit("SET_APPOINTS", res.data);
      });
    }
  }
};
