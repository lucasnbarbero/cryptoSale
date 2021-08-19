<template>
  <nav class="navbar px-5 navbar-expand navbar-dark bg-dark">
    <a class="navbar-brand" href="#">CryptoSales</a>
    <div class="collapse navbar-collapse px-4">
      <ul class="navbar-nav" v-if="$store.state.access">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
      </ul>
    </div>
    <Login />
  </nav>
  <div class="alert alert-info px-5" v-if="!$store.state.access">
    Ingrese nombre de usuario para comenzar a operar
  </div>
  <div class="container">
    <router-view />
  </div>
</template>

<script>
import Login from "./components/Login.vue";

export default {
  name: "App",
  components: {
    Login,
  },
};
</script>
