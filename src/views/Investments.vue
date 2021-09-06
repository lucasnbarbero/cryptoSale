<template>
  <div class="row">
    <h1 class="text-center mb-4">Inversiones</h1>
  </div>
  <div class="row justify-content-center">
    <div class="col-sm-8">
      <table class="table text-center table-hover table-bordered">
        <thead>
          <tr>
            <th scope="col">Criptomoneda</th>
            <th scope="col">Estado de inversión</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Bitcoin</th>
            <td :class="claseMonto">
              ${{
                formatPrice(
                  $store.state.coin[0].price.ask *
                    $store.state.coin[0].disponibles -
                    $store.state.coin[0].monto
                )
              }}
            </td>
          </tr>
          <tr>
            <th>Etherum</th>
            <td :class="claseMonto">
              ${{
                formatPrice(
                  $store.state.coin[1].price.ask *
                    $store.state.coin[1].disponibles -
                    $store.state.coin[1].monto
                )
              }}
            </td>
          </tr>
          <tr>
            <th>Dai</th>
            <td :class="claseMonto">
              ${{
                formatPrice(
                  $store.state.coin[2].price.ask *
                    $store.state.coin[2].disponibles -
                    $store.state.coin[2].monto
                )
              }}
            </td>
          </tr>
          <tr>
            <th>USDC</th>
            <td :class="claseMonto">
              ${{
                formatPrice(
                  $store.state.coin[3].price.ask *
                    $store.state.coin[3].disponibles -
                    $store.state.coin[3].monto
                )
              }}
            </td>
          </tr>
          <tr>
            <th>Ripple</th>
            <td :class="claseMonto">
              ${{
                formatPrice(
                  $store.state.coin[4].price.ask *
                    $store.state.coin[4].disponibles -
                    $store.state.coin[4].monto
                )
              }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";

export default {
  data() {
    return {
      transacciones: null,
    };
  },
  created() {
    this.$store.commit("setBtc");
    this.$store.commit("setEth");
    this.$store.commit("setDai");
    this.$store.commit("setUsdc");
    this.$store.commit("setXrp");
    this.$store.commit("setDolar");

    this.getApi();
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    getApi() {
      apiClient.getApiClient().then((result) => {
        this.transacciones = result.data;
        for (let i = 0; i < this.transacciones.length; i++) {
          if (this.transacciones[i].action === "purchase") {
            if (this.transacciones[i].crypto_code === "btc") {
              this.$store.state.coin[0].monto += this.transacciones[i].money;
              this.$store.state.coin[0].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "eth") {
              this.$store.state.coin[1].monto += this.transacciones[i].money;
              this.$store.state.coin[1].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "dai") {
              this.$store.state.coin[2].monto += this.transacciones[i].money;
              this.$store.state.coin[2].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "usdc") {
              this.$store.state.coin[3].monto += this.transacciones[i].money;
              this.$store.state.coin[3].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "xrp") {
              this.$store.state.coin[4].monto += this.transacciones[i].money;
              this.$store.state.coin[4].disponibles +=
                this.transacciones[i].crypto_amount;
            }
          }
          if (this.transacciones[i].action === "sale") {
            if (this.transacciones[i].crypto_code === "btc") {
              this.$store.state.coin[0].monto -= this.transacciones[i].money;
              this.$store.state.coin[0].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "eth") {
              this.$store.state.coin[1].monto -= this.transacciones[i].money;
              this.$store.state.coin[1].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "dai") {
              this.$store.state.coin[2].monto -= this.transacciones[i].money;
              this.$store.state.coin[2].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "usdc") {
              this.$store.state.coin[3].monto -= this.transacciones[i].money;
              this.$store.state.coin[3].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "xrp") {
              this.$store.state.coin[4].monto -= this.transacciones[i].money;
              this.$store.state.coin[4].disponibles -=
                this.transacciones[i].crypto_amount;
            }
          }
        }
      });
    },
  },
};
</script>

<style>
</style>