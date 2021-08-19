import { createStore } from 'vuex'

export default createStore({
  state: {
    userLogin: 'LucasBarbero',
    access: null,

    notificationOn: null,
  },
  mutations: {
    setLogin: (state, ingreso) => {
      state.access = ingreso;
    },

    setNotification: (state, value) => {
      state.notificationOn = value;
    }
  },
  actions: {
  },
  modules: {
  }
})
