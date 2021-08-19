<template>
    <div class="d-flex">
      <table class="table text-center table-hover table-striped table-bordered">
        <thead>
          <tr>
            <th scope="col" v-for="field of fields" :key="field.id">
              {{ field }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr scope="col" v-for="coin of coins" :key="coin">
            <th scope="row">{{ coin.name }}</th>
            <td>${{ formatPrice(coin.price.ask) }}</td>
            <td>${{ formatPrice(coin.price.totalAsk) }}</td>
            <td>${{ formatPrice(coin.price.bid) }}</td>
            <td>${{ formatPrice(coin.price.totalBid) }}</td>
            <td><button class="btn btn-success">Comprar</button></td>
            <td><button class="btn btn-danger">Vender</button></td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import request from "../services/apiCriptoya.js";

export default {
  name: "Cryptotable",
  data() {
    return {
      fields: [
        "Moneda",
        "Compra",
        "Compra Total",
        "Venta",
        "Venta Total",
        "",
        ""
      ],
      coins: [
        {
          name: "Bitcoin",
          id: 1,
          price: null,
        },
        {
          name: "Ethereum",
          id: 2,
          price: null,
        },
        {
          name: "Dai",
          id: 3,
          price: null,
        },
        {
          name: "USDC",
          id: 4,
          price: null,
        },
        {
          name: "Ripple",
          id: 5,
          price: null,
        },
      ],
    };
  },
  created() {
    request.getBTC().then((response) => (this.coins[0].price = response.data)),
      request
        .getETH()
        .then((response) => (this.coins[1].price = response.data)),
      request
        .getDAI()
        .then((response) => (this.coins[2].price = response.data)),
      request
        .getUSDC()
        .then((response) => (this.coins[3].price = response.data)),
      request
        .getXRP()
        .then((response) => (this.coins[4].price = response.data));
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
