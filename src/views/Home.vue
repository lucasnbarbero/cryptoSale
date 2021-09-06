<template>
  <div v-if="$store.state.access">
    <div class="container">
      <div class="row text-center mt-3 mb-5">
        <h1>Bienvenido @{{ $store.state.userLogin }}</h1>
      </div>
    </div>
    <Cryptotable />
  </div>
</template>

<script>
import Cryptotable from "../components/Cryptotable.vue";

export default {
  name: "Home",
  components: {
    Cryptotable,
  },
  beforeCreate() {
    this.$store.commit("setBtc");
    this.$store.commit("setEth");
    this.$store.commit("setDai");
    this.$store.commit("setUsdc");
    this.$store.commit("setXrp");
    this.$store.commit("setDolar");
  },
};
</script>
