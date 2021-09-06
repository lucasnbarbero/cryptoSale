<template>
  <div class="row">
    {{ elemento }}
    <table class="table mt-4 table-striped table-bordered text-center">
      <thead>
        <tr>
          <th scope="col" v-for="field of fields" :key="field">{{ field }}</th>
        </tr>
      </thead>
      <tbody class="text-center">
        <tr v-for="operacion of transacciones" :key="operacion._id">
          <th>{{ actionValue(operacion.action) }}</th>
          <td>{{ criptoValue(operacion.crypto_code) }}</td>
          <td>{{ operacion.crypto_amount }}</td>
          <td class="mx-2">${{ formatPrice(operacion.money) }}</td>
          <td class="mx-2">{{ formatDate(operacion.datetime) }}</td>
          <td>
            <div class="btn-group">
              <button
                class="btn btn-sm btn-primary"
                @click="
                  mensaje();
                  enviarId(operacion._id, false);
                "
              >
                Detalles
              </button>
              <button
                class="btn btn-sm btn-danger"
                @click="
                  eliminarPorId(operacion._id);
                  actualizarTabla();
                "
              >
                Eliminar
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import moment from "moment";

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
      operaciones: [],
      detalleOperacion: {},
    };
  },

  props: {
    transacciones: null,
  },

  methods: {
    actualizarTabla() {
      this.$emit("updateTable");
    },
    mensaje() {
      this.$emit("brothersaid", true);
    },
    enviarId(id) {
      this.$emit("enviarId", id);
    },
    eliminarPorId(id) {
      this.$emit("deleteId", id);
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    formatDate(value) {
      return moment(String(value)).format("DD/MM/YYYY | hh:ss");
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
