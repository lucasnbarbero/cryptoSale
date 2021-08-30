<template>
  <form class="form-inline" v-if="this.$store.state.userLogin">
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
  <form class="form-inline" v-if="!this.$store.state.userLogin">
    <p class="text-white">User: @{{this.username}}</p>
  </form>

</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: null,
    }
  },
  methods: {
    loginOk() {
      if (this.username === this.$store.state.userLogin) {
        this.$store.commit("setLogin", true);
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