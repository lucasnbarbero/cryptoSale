<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <a class="navbar-brand" href="#">CryptoSales</a>
      <div class="collapse navbar-collapse" v-if="this.$store.state.access">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/transactions" class="nav-link"
              >Transactions</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/history" class="nav-link"
              >History</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/state" class="nav-link"
              >State</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/investments" class="nav-link"
              >Investments</router-link
            >
          </li>
        </ul>
      </div>
      <Login />
    </div>
  </nav>

  <div class="alert alert-primary px-5" v-if="!this.$store.state.access">
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
