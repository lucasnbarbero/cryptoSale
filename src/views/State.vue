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
          <tr v-for="moneda of $store.state.coin" :key="moneda">
            <th v-if="moneda.disponibles">{{ moneda.name }}</th>
            <td v-if="moneda.disponibles">{{ moneda.cantOp }}</td>
            <td v-if="moneda.disponibles" :class="claseMonto(moneda.disponibles)">{{ moneda.disponibles }}</td>
            <td v-if="moneda.disponibles" :class="claseMonto(moneda.monto)">
              ${{ formatPrice(moneda.monto) }}
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
      fields: [
        "Moneda",
        "Operaciones realizadas",
        "Cantidad disponible",
        "Total en $",
      ],
    };
  },
  created() {
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
              this.$store.state.coin[0].cantOp += 1;
              this.$store.state.coin[0].monto += this.transacciones[i].money;
              this.$store.state.coin[0].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "eth") {
              this.$store.state.coin[1].cantOp += 1;
              this.$store.state.coin[1].monto += this.transacciones[i].money;
              this.$store.state.coin[1].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "dai") {
              this.$store.state.coin[2].cantOp += 1;
              this.$store.state.coin[2].monto += this.transacciones[i].money;
              this.$store.state.coin[2].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "usdc") {
              this.$store.state.coin[3].cantOp += 1;
              this.$store.state.coin[3].monto += this.transacciones[i].money;
              this.$store.state.coin[3].disponibles +=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "xrp") {
              this.$store.state.coin[4].cantOp += 1;
              this.$store.state.coin[4].monto += this.transacciones[i].money;
              this.$store.state.coin[4].disponibles +=
                this.transacciones[i].crypto_amount;
            }
          }
          if (this.transacciones[i].action === "sale") {
            if (this.transacciones[i].crypto_code === "btc") {
              this.$store.state.coin[0].cantOp += 1;
              this.$store.state.coin[0].monto -= this.transacciones[i].money;
              this.$store.state.coin[0].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "eth") {
              this.$store.state.coin[1].cantOp += 1;
              this.$store.state.coin[1].monto -= this.transacciones[i].money;
              this.$store.state.coin[1].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "dai") {
              this.$store.state.coin[2].cantOp += 1;
              this.$store.state.coin[2].monto -= this.transacciones[i].money;
              this.$store.state.coin[2].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "usdc") {
              this.$store.state.coin[3].cantOp += 1;
              this.$store.state.coin[3].monto -= this.transacciones[i].money;
              this.$store.state.coin[3].disponibles -=
                this.transacciones[i].crypto_amount;
            } else if (this.transacciones[i].crypto_code === "xrp") {
              this.$store.state.coin[4].cantOp += 1;
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
.text-green {
    color: #28a745;
}
</style>