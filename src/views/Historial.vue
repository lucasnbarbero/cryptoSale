<template>
  <div class="row d-flex justify-content-center" style="position: relative;">
    <tabla-historial class="t-historial" @brothersaid="respuestaDaughter($event)"></tabla-historial>
  </div>
  <div class="row d-flex justify-content-center">
  <modal class="main-modal" v-if="this.verHijo" @ststersaid="respuestaSon()"></modal>
  </div>
</template>

<script>
import apiClient from "../services/apiClient";
import TablaHistorial from "../components/TablaHistorial.vue"
import Modal from "../components/Modal.vue"

export default {
  name: "Historial",
  components: {
    TablaHistorial,
    Modal
  },
  data() {
    return {
      operaciones: null,
      verHijo: false
    };
  },
  created() {
    apiClient.getApiClient().then((result) => {
      this.operaciones = result.data;
    });
  },
  methods: {
    respuestaDaughter(val){
      this.verHijo = val;
    },
  },
};
</script>

<style>
.t-historial{
  position: absolute;
  z-index: 1;
}

.main-modal{
position: absolute;
display: flex;
justify-content: center;
align-items: center;
z-index: 2;
}
</style>