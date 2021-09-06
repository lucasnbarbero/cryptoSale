import { createStore } from 'vuex'
import apiCriptoya from '../services/apiCriptoya'

export default createStore({
  state: {
    userLogin: 'LucasBarbero',
    access: null,

    coin: [
      {
        name: "Bitcoin",
        id: 'btc',
        price: null,
        cantOp: 0,
        monto: 0,
        disponibles: 0,
      },
      {
        name: "Ethereum",
        id: 'eth',
        price: null,
        cantOp: 0,
        monto: 0,
        disponibles: 0,
      },
      {
        name: "Dai",
        id: 'dai',
        price: null,
        cantOp: 0,
        monto: 0,
        disponibles: 0,
      },
      {
        name: "USDC",
        id: 'usdc',
        price: null,
        cantOp: 0,
        monto: 0,
        disponibles: 0,
      },
      {
        name: "Ripple",
        id: 'xrp',
        price: null,
        cantOp: 0,
        monto: 0,
        disponibles: 0,
      },
    ],
    dolar: null,
  },
  mutations: {
    setLogin: (state, ingreso) => {
      state.access = ingreso;
    },

    setBtc(state) {
      apiCriptoya.getBTC().then((result) => {
        console.log(result.data);
        state.coin[0].price = result.data;
      });
    },
    setEth(state) {
      apiCriptoya.getETH().then((result) => {
        console.log(result.data);
        state.coin[1].price = result.data;
      });
    },
    setDai(state) {
      apiCriptoya.getDAI().then((result) => {
        console.log(result.data);
        state.coin[2].price = result.data;
      });
    },
    setUsdc(state) {
      apiCriptoya.getUSDC().then((result) => {
        console.log(result.data);
        state.coin[3].price = result.data;
      });
    },
    setXrp(state) {
      apiCriptoya.getXRP().then((result) => {
        console.log(result.data);
        state.coin[4].price = result.data;
      });
    },
    setDolar(state) {
      apiCriptoya.getDolar().then((result) => {
        console.log(result.data);
        state.dolar = result.data;
      });
    },
  },
  actions: {
  },
  modules: {
  }
})
