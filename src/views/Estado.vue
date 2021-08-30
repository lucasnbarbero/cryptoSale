<template>
  <div class="row mb-3 justify-content-center">
      <h1 class="text-center">Estado de cuenta</h1>
  </div>
  <div class="row justify-content-center">
    <div class="col-sm-8">
      <table class="table table-bordered table-hover">
        <thead class="text-center">
          <tr>
            <th v-for="field of fields" :key="field">{{ field }}</th>
          </tr>
        </thead>
        <tbody class="text-center">
          <tr v-for="moneda of monedas" :key="moneda">
            <th v-if="moneda.cantOp">{{ moneda.nombre }}</th>
            <td v-if="moneda.cantOp">{{ moneda.cantOp }}</td>
            <td v-if="moneda.cantOp" :class="claseMonto(moneda.disponibles)">{{ moneda.disponibles }}</td>
            <td v-if="moneda.cantOp" :class="claseMonto(moneda.monto)">
              ${{ formatPrice(moneda.monto) }}
            </td>
          </tr>
        </tbody>
        <tfoot class="text-center">
          <tr>
            <th colspan="3"></th>
            <td :class="claseMonto(montoTotal)">
              ${{ formatPrice(montoTotal) }}
            </td>
          </tr>
        </tfoot>
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
      fields: [
        "Moneda",
        "Operaciones realizadas",
        "Cantidad disponible",
        "Total en $",
      ],
      coins: ["Bitcoin", "Etherum", "Dai", "USDC", "Ripple"],
      montoTotal: 0,
      monedas: {
        bitcoin: {
          nombre: "Bitcoin",
          cantOp: 0,
          monto: 0,
          disponibles: 0,
        },
        etherum: {
          nombre: "Etherum",
          cantOp: 0,
          monto: 0,
          disponibles: 0,
        },
        dai: {
          nombre: "Dai",
          cantOp: 0,
          monto: 0,
          disponibles: 0,
        },
        usdc: {
          nombre: "USDC",
          cantOp: 0,
          monto: 0,
          disponibles: 0,
        },
        xrp: {
          nombre: "Ripple",
          cantOp: 0,
          monto: 0,
          disponibles: 0,
        },
      },
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
    claseMonto(price) {
      let clase = "";
      if (price > 0) {
        clase = "text-green";
      } else if (price < 0) {
        clase = "text-danger";
      }
      return clase;
    },
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
              this.monedas.bitcoin.cantOp += 1;
              this.monedas.bitcoin.monto += this.transacciones[i].money;
              this.monedas.bitcoin.disponibles +=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.bitcoin.monto;
            } else if (this.transacciones[i].crypto_code === "eth") {
              this.monedas.etherum.cantOp += 1;
              this.monedas.etherum.monto += this.transacciones[i].money;
              this.monedas.etherum.disponibles +=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.etherum.monto;
            } else if (this.transacciones[i].crypto_code === "dai") {
              this.monedas.dai.cantOp += 1;
              this.monedas.dai.monto += this.transacciones[i].money;
              this.monedas.dai.disponibles +=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.dai.monto;
            } else if (this.transacciones[i].crypto_code === "usdc") {
              this.monedas.usdc.cantOp += 1;
              this.monedas.usdc.monto += this.transacciones[i].money;
              this.monedas.usdc.disponibles +=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.usdc.monto;
            } else if (this.transacciones[i].crypto_code === "xrp") {
              this.monedas.xrp.cantOp += 1;
              this.monedas.xrp.monto += this.transacciones[i].money;
              this.monedas.xrp.disponibles +=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.xrp.monto;
            }
          }
          if (this.transacciones[i].action === "sale") {
            if (this.transacciones[i].crypto_code === "btc") {
              this.monedas.bitcoin.cantOp += 1;
              this.monedas.bitcoin.monto -= this.transacciones[i].money;
              this.monedas.bitcoin.disponibles -=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.xrp.monto;
            } else if (this.transacciones[i].crypto_code === "eth") {
              this.monedas.etherum.cantOp += 1;
              this.monedas.etherum.monto -= this.transacciones[i].money;
              this.monedas.etherum.disponibles -=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.etherum.monto;
            } else if (this.transacciones[i].crypto_code === "dai") {
              this.monedas.dai.cantOp += 1;
              this.monedas.dai.monto -= this.transacciones[i].money;
              this.monedas.dai.disponibles -=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.dai.monto;
            } else if (this.transacciones[i].crypto_code === "usdc") {
              this.monedas.usdc.cantOp += 1;
              this.monedas.usdc.monto -= this.transacciones[i].money;
              this.monedas.usdc.disponibles -=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.usdc.monto;
            } else if (this.transacciones[i].crypto_code === "xrp") {
              this.monedas.xrp.cantOp += 1;
              this.monedas.xrp.monto -= this.transacciones[i].money;
              this.monedas.xrp.disponibles -=
                this.transacciones[i].crypto_amount;
              this.montoTotal += this.monedas.xrp.monto;
            }
          }
        }
      });
    },
  },
};
</script>

<style>
.text-green {
    color: #28a745;
}
</style>