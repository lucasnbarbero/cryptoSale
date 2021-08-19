import axios from 'axios'

const apiConn = axios.create({
  baseURL: 'https://criptoya.com/api'
})

export default {
  getDolar() {
    return apiConn.get('/dolar')
  },
  getBTC() {
    return apiConn.get('/satoshitango/btc/ars')
  },
  getETH() {
    return apiConn.get('/satoshitango/eth/ars')
  },
  getDAI() {
    return apiConn.get('/satoshitango/dai/ars')
  },
  getUSDC() {
    return apiConn.get('/satoshitango/usdc/ars')
  },
  getXRP() {
    return apiConn.get('/satoshitango/xrp/ars')
  }
}
