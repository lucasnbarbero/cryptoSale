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
  <div class="container">
  <router-view />
  </div>
</template>

<script>
import Login from './components/Login.vue'

  export default {
   name: 'App',
   components: {
     Login,
   },
  }
</script>
