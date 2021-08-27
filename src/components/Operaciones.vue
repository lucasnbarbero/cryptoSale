<template>
  <div class="d-flex 100vh justify-content-center p-5">
    <div class="card" style="width: 40rem">
      <div class="card-header text-center"><strong>Operación</strong></div>
      <div class="card-body m-4 text-center">
        <div class="form">
          <div class="form-row">
            <div class="form-group mb-3">
              <select class="form-control" v-model="operacion.action" required>
                <option value="purchase">Compra</option>
                <option value="sale">Venta</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <select class="form-control" v-model="operacion.crypto_code">
                <option
                  v-for="coin of $store.state.coin"
                  :key="coin.id"
                  :value="coin.id"
                >
                  {{ coin.name }}
                </option>
              </select>
            </div>
            <div class="input-group mb-3">
              <input
                type="number"
                class="form-control"
                placeholder="Cantidad"
                min="0.00001"
                step="0.00001"
                v-model="operacion.crypto_amount"
              />
            </div>
            <div class="mb-3">
              <p>
                Precio de compra (x unidad): ${{ formatPrice(precioActual) }}
              </p>
              <span>{{ renderPrice }}</span>
            </div>
            <div class="mb-3">
              <p>Total a pagar: ${{ formatPrice(operacion.money) }}</p>
              <span>{{ totalPay }}</span>
            </div>
          </div>
          <button class="btn btn-success mx-3" @click="realizarOperacion()">
            Aceptar
          </button>
          <button class="btn btn-danger mx-3" @click="cancelarOperacion()">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  </div>
  {{ operacion }}
</template>

<script>
import apiClient from "../services/apiClient";
export default {
  name: "Operaciones",
  data() {
    return {
      operacion: {
        user_id: this.$store.state.userLogin,
        action: null,
        crypto_code: null,
        crypto_amount: null,
        money: null,
        datetime: new Date(),
      },
      precioActual: null,
      showModal: true,
    };
  },
  methods: {
    realizarOperacion() {
      let completo = this.validarVacios();
      if (completo === true) {
        apiClient
          .postApiClient(this.operacion)
          .then((response) => {
            if (response.status !== 201) {
              alert("No se pudo realizar la transacción!");
            }
          })
          .catch((error) => {
            alert(error);
            this.errored = true;
          });
        alert("Realizado!");
        this.limpiarDatos();
      } else {
        alert("Todos los campos deben estar completos");
      }
    },
    precio() {
      if (this.operacion.action === "purchase") {
        if (this.operacion.crypto_code === "btc") {
          this.precioActual = this.$store.state.coin[0].price.ask;
        } else if (this.operacion.crypto_code === "eth") {
          this.precioActual = this.$store.state.coin[1].price.ask;
        } else if (this.operacion.crypto_code === "dai") {
          this.precioActual = this.$store.state.coin[2].price.ask;
        } else if (this.operacion.crypto_code === "usdc") {
          this.precioActual = this.$store.state.coin[3].price.ask;
        } else if (this.operacion.crypto_code === "xrp") {
          this.precioActual = this.$store.state.coin[4].price.ask;
        }
      } else if (this.operacion.action === "sale") {
        if (this.operacion.crypto_code === "btc") {
          this.precioActual = this.$store.state.coin[0].price.bid;
        } else if (this.operacion.crypto_code === "eth") {
          this.precioActual = this.$store.state.coin[1].price.bid;
        } else if (this.operacion.crypto_code === "dai") {
          this.precioActual = this.$store.state.coin[2].price.bid;
        } else if (this.operacion.crypto_code === "usdc") {
          this.precioActual = this.$store.state.coin[3].price.bid;
        } else if (this.operacion.crypto_code === "xrp") {
          this.precioActual = this.$store.state.coin[4].price.bid;
        }
      }
    },
    precioTotal() {
      this.operacion.money = this.precioActual * this.operacion.crypto_amount;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    limpiarDatos() {
      this.operacion.action = null;
      this.operacion.crypto_code = null;
      this.operacion.crypto_amount = null;
      this.operacion.money = null;
    },
    cancelarOperacion() {
      this.limpiarDatos();
      alert("Operacion cancelada");
    },
    validarVacios() {
      if (
        this.operacion.action === null ||
        this.operacion.crypto_code === null ||
        this.operacion.crypto_amount === null
      ) {
        return false;
      } else {
        return true;
      }
    },
  },
  computed: {
    renderPrice() {
      return this.precio();
    },
    totalPay() {
      return this.precioTotal();
    },
  },
};
</script>
