<template>
  <form class="form-inline" v-if="!access">
    <div class="input-group">
      <span class="input-group-text" id="basic-addon1">@</span>
      <input
        type="password"
        class="form-control"
        placeholder="Username"
        v-model="username"
      />
      <button type="submit" class="btn btn-primary" v-on:click="loginOk">
        Login
      </button>
    </div>
  </form>
  <form class="form-inline" v-if="access">
    <p class="text-white">User: @{{this.username}}</p>
  </form>

</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: null,
      access: false,
      alertNotification: 'Ingrese el nombre de usuario para comenzar a operar',
    }
  },
  methods: {
    loginOk() {
      if (this.username === this.$store.state.userLogin) {
        this.$store.commit("setLogin", true);
        this.access = true;
        alert("Ingreso correcto");
      } else {
        alert("El nombre de usuario no es correcto");
        this.username = "";
      }
    }
  }
};
</script>

<style>
</style>