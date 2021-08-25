<template>
  <div class="row">
    <table class="table mt-4 table-striped table-sm table-bordered text-center">
      <thead>
        <tr>
          <th scope="col" v-for="field of fields" :key="field">{{ field }}</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="operacion of operaciones" :key="operacion._id">
          <th>{{ actionValue(operacion.action) }}</th>
          <td>{{ criptoValue(operacion.crypto_code) }}</td>
          <td>{{ operacion.crypto_amount }}</td>
          <td class="mx-2">${{ formatPrice(operacion.money) }}</td>
          <td class="mx-2">{{ formatDate(operacion.datetime) }}</td>
          <td>
            <div class="btn-group mx-3">
              <button class="btn btn-sm btn-primary" @click="mensaje()">
                Ver
              </button>
              <button class="btn btn-sm btn-success">Editar</button>
              <button class="btn btn-sm btn-danger">Eliminar</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";
import moment from 'moment';

export default {
  name: "TablaHistorial",

  data() {
    return {
      fields: [
        "Operacion",
        "Criptomoneda",
        "Cantidad",
        "Precio",
        "Fecha y hora",
        "Acciones",
      ],
      operaciones: null,
    };
  },

  beforeCreate() {
    apiClient.getApiClient().then((result) => {
      this.operaciones = result.data;
    });
  },

  methods: {
    mensaje() {
      this.$emit("brothersaid", true);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(value) {
      return moment(String(value)).format('DD/MM/YYYY | hh:ss');
    },
    actionValue(action) {
      let accion;
      if (action === "sale") {
        accion = "Venta";
      } else if (action === "purchase") {
        accion = "Compra";
      }
      return accion;
    },
    criptoValue(moneda) {
      let val;
      if (moneda === "btc") {
        val = "Bitcoin";
      } else if (moneda === "eth") {
        val = "Etherum";
      } else if (moneda === "dai") {
        val = "Dai";
      } else if (moneda === "usdc") {
        val = "USDC";
      } else if (moneda === "xrp") {
        val = "Ripple";
      }
      return val;
    },
  },
};
</script>

<style>
</style>