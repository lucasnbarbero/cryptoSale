<template>
  <div class="row d-flex justify-content-center" style="position: relative">
    <table-history
      class="t-historial"
      @brothersaid="responseSon($event)"
      @enviarId="tomarID($event)"
      @updateTable="getApi()"
      @deleteId="eliminarID($event)"
      :transacciones="transacciones"
    ></table-history>
  </div>
  <div class="row d-flex justify-content-center">
    <transition name="bounce">
      <modal
        class="main-modal"
        v-if="this.verHijo"
        @sistersaid="responseDaughter($event)"
        @updateTable="getApi()"
        :elemento="detalleOperacion"
      ></modal>
    </transition>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";
import TableHistory from "../components/TableHistory.vue";
import Modal from "../components/ModalHistory.vue";

export default {
  name: "History",
  components: {
    TableHistory,
    Modal,
  },
  data() {
    return {
      verHijo: false,
      detalleOperacion: [],
      idEditar: null,
      transacciones: null,
      eliminar: false,
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
    eliminarID(id) {
      debugger;
      apiClient.deleteApiClient(id).then((result) => {
        console.log(result);
        alert("Eliminado!");
      });
    },
    responseDaughter(val) {
      this.verHijo = val;
    },
    responseSon(val) {
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