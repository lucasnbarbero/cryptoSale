<template>
  <div class="row d-flex justify-content-center" style="position: relative">
    <tabla-historial
      class="t-historial"
      @brothersaid="respuestaSon($event)"
      @enviarId="tomarID($event)"
      :transacciones="transacciones"
    ></tabla-historial>
  </div>
  <div class="row d-flex justify-content-center">
    <transition name="bounce">
      <modal
        class="main-modal"
        v-if="this.verHijo"
        @sistersaid="respuestaDaughter($event)"
        @updateTable="getApi()"
        @eliminar="deleteId(this.detalleOperacion._id)"
        :elemento="detalleOperacion"
      ></modal>
    </transition>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";
import TablaHistorial from "../components/TablaHistorial.vue";
import Modal from "../components/ModalHistorial.vue";

export default {
  name: "Historial",
  components: {
    TablaHistorial,
    Modal,
  },
  data() {
    return {
      verHijo: false,
      detalleOperacion: [],
      idEditar: null,
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
    getApi() {
      apiClient.getApiClient().then((result) => {
        this.transacciones = result.data;
      });
    },
    deleteId(id) {
      apiClient.deleteApiClient(id).then((result) => {
        console.log(result);
      });
      alert("Eliminado");
    },
    respuestaDaughter(val) {
      this.verHijo = val;
    },
    respuestaSon(val) {
      this.verHijo = val;
    },
    tomarID(id) {
      apiClient.getApiClientId(id).then((result) => {
        this.detalleOperacion = result.data;
        this.detalleOperacion.push(id);
      });
    },
  },
};
</script>

<style>
.t-historial {
  z-index: 1;
}

.main-modal {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>