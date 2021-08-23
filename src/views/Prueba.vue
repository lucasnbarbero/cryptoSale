<template>
  <Operaciones />
</template>

<script>
import Operaciones from "../components/Operaciones.vue";

export default {
  name: "Prueba",
  components: {
    Operaciones,
  },
  beforeCreate() {
    this.$store.commit('setBtc');
    this.$store.commit('setEth');
    this.$store.commit('setDai');
    this.$store.commit('setUsdc');
    this.$store.commit('setXrp');
    this.$store.commit('setDolar');
  },
};
</script>

<style>
</style>