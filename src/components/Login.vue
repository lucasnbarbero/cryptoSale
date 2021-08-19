<template>
  <form class="form-inline" v-if="!access">
    <div class="input-group">
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
    <fieldset disabled>
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        :placeholder="'Bienvenido ' +this.username"
        disabled
      />
      <button class="btn btn-light" v-on:click="loginOk">
        Login
      </button>
    </div>
    </fieldset>
  </form>

</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: null,
      access: false,
    }
  },
  methods: {
    loginOk() {
      if (this.username === this.$store.state.userLogin) {
        this.$store.commit("setLogin", true);
        this.$store.commit("setNotification", true);
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