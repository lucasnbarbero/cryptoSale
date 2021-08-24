<template>
  <nav class="navbar px-5 navbar-fixed-top navbar-dark bg-dark">
    <a class="navbar-brand" href="#">CryptoSales</a>
    <div class="collapse navbar-collapse" v-if="$store.state.access">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
      </ul>
    </div>
    <Login />
  </nav>

  <div class="alert alert-primary px-5" v-if="!$store.state.access">
    Ingrese nombre de usuario para comenzar a operar.
    <strong>Username: LucasBarbero</strong>
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
