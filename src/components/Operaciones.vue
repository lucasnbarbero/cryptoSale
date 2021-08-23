<template>
  <div class="d-flex 100vh justify-content-center p-5">
    <div class="card" style="width: 30rem">
      <div class="card-header text-center"><strong>Operación</strong></div>
      <div class="card-body m-4 text-center">
        <form>
          <div class="form-row">
            <div class="form-group mb-3">
              <select class="form-control" v-model="operacion.action" required>
                <option value="purchase">Compra</option>
                <option value="sale">Venta</option>
              </select>
            </div>
            <div class="form-group mb-3">
              <select class="form-control" v-model="crypto_code" required>
                <option
                  v-for="coin of $store.state.coin"
                  :key="coin.id"
                  :value="coin.id"
                >
                  {{ coin.name }}
                </option>
              </select>
              <div class="invalid-feedback">
                Example invalid custom select feedback
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="number"
                class="form-control"
                placeholder="Cantidad"
                min="0.00001"
                step="0.00001"
                v-model="operacion.crypto_amount"
                required
              />
            </div>
            <div class="form-group mb-3">
              <label for="valorMoneda">$ x unidad</label>
              <input
                type="text"
                class="form-control"
                disabled
              >
            </div>
            <div class="mb-3">
              <input
                type="text"
                v-model="moneda"
                class="form-control"
                disabled
              />
            </div>
          </div>
          <button class="btn btn-primary mx-3" @submit.prevent="calcularPrecio">Culcular</button>
          <button class="btn btn-success" type="submit" disabled>Aceptar</button>
          <button class="btn btn-danger mx-3" type="submit" disabled>Cancelar</button>

        </form>
      </div>
    </div>
  </div>
  {{precio}}
</template>

<script>
export default {
  name: "Operaciones",
  data() {
    return {
      operacion: {
        user_id: this.$store.state.userLogin,
        action: null,
        crypto_code: null,
        crypto_amount: null,
        money: null,
        datetime: new Date(),
      },
      moneda: null
    };
  },
  computed: {
    precio(){
      if (this.crypto_code === 'Bitcoin') {
        debugger;
        this.moneda = this.$store.state.coin.btc.ask;
        console.log(this.moneda);
        
        return this.moneda
      }
    }
  }
};
</script>
