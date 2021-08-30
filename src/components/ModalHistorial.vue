<template>
  <div class="main-content" role="document">
    <div class="col-md-4">
      <transition name="bounce">
        <div class="modal-content efecto">
          <div class="modal-header">
            <h5 class="modal-title">
              {{ msgTitulo }}
              <span>{{ renderTitulo }}</span>
            </h5>
          </div>

          <!--      VISTA DETALLADA       -->

          <div v-if="!editar">
            <div class="modal-body">
              <div class="form">
                <div class="form-group">
                  <p>
                    Acción realizada:
                    <strong>{{ actionValue(elemento.action) }}</strong>
                  </p>
                </div>
                <div class="form-group">
                  <p>
                    Criptomoneda:
                    <strong>{{ criptoValue(elemento.crypto_code) }}</strong>
                  </p>
                </div>
                <div class="form-group">
                  <p>
                    Cantidad: <strong>{{ elemento.crypto_amount }}</strong>
                  </p>
                </div>
                <div class="form-group">
                  <p>
                    {{ msg }}:
                    <strong>${{ formatPrice(elemento.money) }}</strong>
                  </p>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-success"
                @click="
                  editar = true;
                  this.elemento.datetime = new Date();
                "
              >
                Editar
              </button>
              <button
                class="btn btn-secondary"
                @click="
                  mensaje();
                  editar = false;
                  actualizarTabla();
                "
              >
                Cerrar
              </button>
            </div>
          </div>

          <!--      EDITAR OPERACION       -->

          <div>
            <div class="modal-body" v-if="editar">
              <div class="form">
                <div class="form-row">
                  <div class="form-group mb-3">
                    <label>Seleccione operacion</label>
                    <select
                      class="form-control"
                      v-model="elemento.action"
                      required
                    >
                      <option value="purchase">Compra</option>
                      <option value="sale">Venta</option>
                    </select>
                  </div>
                  <div class="form-group mb-3">
                    <label>Seleccione una moneda</label>
                    <select class="form-control" v-model="elemento.crypto_code">
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
                      v-model="elemento.crypto_amount"
                    />
                  </div>
                  <div class="mb-3">
                    <p>
                      Precio de compra (x unidad): ${{
                        formatPrice(precioActual)
                      }}
                    </p>
                    <span>{{ renderPrice }}</span>
                  </div>
                  <div class="mb-3">
                    <p>Total a pagar: ${{ formatPrice(elemento.money) }}</p>
                    <span>{{ totalPay }}</span>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button class="btn btn-success mx-3" @click="editarOperacion()">
                  Aceptar
                </button>
                <button class="btn btn-danger mx-3" @click="mensaje()">
                  Cancelar
                </button>
              </div>
            </div>
          </div>

          <!--      FIN EDITAR OPERACION       -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";

export default {
  name: "ModalHistorial",
  data() {
    return {
      detalleOperacion: null,
      msg: null,
      msgTitulo: null,
      precioActual: null,
      idEdit: null,
      editar: false,
    };
  },

  props: {
    elemento: null,
  },

  beforeCreate() {
    this.editar = false;
  },

  methods: {
    eliminarPorId() {
      this.$emit("eliminar", this.elemento._id);
    },
    mensaje() {
      this.$emit("sistersaid", false);
    },
    actualizarTabla() {
      this.$emit("updateTable");
    },
    mensajeTitulo() {
      if (this.editar === false) {
        this.msgTitulo = "Detalles de operación";
      } else {
        this.msgTitulo = "Editar";
      }
    },
    actionValue(action) {
      let accion;
      if (action === "sale") {
        accion = "Venta";
        this.msg = "Precio de la venta";
      } else if (action === "purchase") {
        accion = "Compra";
        this.msg = "Precio de la compra";
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
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    precio() {
      if (this.elemento.action === "purchase") {
        if (this.elemento.crypto_code === "btc") {
          this.precioActual = this.$store.state.coin[0].price.ask;
        } else if (this.elemento.crypto_code === "eth") {
          this.precioActual = this.$store.state.coin[1].price.ask;
        } else if (this.elemento.crypto_code === "dai") {
          this.precioActual = this.$store.state.coin[2].price.ask;
        } else if (this.elemento.crypto_code === "usdc") {
          this.precioActual = this.$store.state.coin[3].price.ask;
        } else if (this.elemento.crypto_code === "xrp") {
          this.precioActual = this.$store.state.coin[4].price.ask;
        }
      } else if (this.elemento.action === "sale") {
        if (this.elemento.crypto_code === "btc") {
          this.precioActual = this.$store.state.coin[0].price.bid;
        } else if (this.elemento.crypto_code === "eth") {
          this.precioActual = this.$store.state.coin[1].price.bid;
        } else if (this.elemento.crypto_code === "dai") {
          this.precioActual = this.$store.state.coin[2].price.bid;
        } else if (this.elemento.crypto_code === "usdc") {
          this.precioActual = this.$store.state.coin[3].price.bid;
        } else if (this.elemento.crypto_code === "xrp") {
          this.precioActual = this.$store.state.coin[4].price.bid;
        }
      }
    },
    precioTotal() {
      this.elemento.money = this.precioActual * this.elemento.crypto_amount;
    },
    editarOperacion() {
      apiClient
        .editApiClient(this.elemento._id, this.elemento)
        .then((response) => {
          if (response.status !== 201) {
            alert("Transacción editada con éxito!");
            this.editar = false;
          }
        })
        .catch((error) => {
          alert(error);
        });
    },
  },

  computed: {
    renderTitulo() {
      return this.mensajeTitulo();
    },
    renderPrice() {
      return this.precio();
    },
    totalPay() {
      return this.precioTotal();
    },
  },
};
</script>

<style>
.main-content {
  position: absolute;
  z-index: 2;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100vh;
  top: 0;
}
</style>