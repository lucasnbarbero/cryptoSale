<template>
  <div v-if="$store.state.access">
    <div class="card text-center mb-4">
      <div class="card-header"><strong>Precio de criptomonedas</strong></div>
      <div class="card-body">
        <div class="d-flex table-responsive">
          <table class="table table-hover table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col" v-for="field of fields" :key="field.id">
                  {{ field }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr scope="col" v-for="coin of $store.state.coin" :key="coin">
                <th scope="row">{{ coin.name }}</th>
                <td>${{ formatPrice(coin.price.ask) }}</td>
                <td>${{ formatPrice(coin.price.totalAsk) }}</td>
                <td>${{ formatPrice(coin.price.bid) }}</td>
                <td>${{ formatPrice(coin.price.totalBid) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="card text-center mb-4">
      <div class="card-header"><strong>Precios del dólar</strong></div>
      <div class="card-body">
        <div class="d-flex table-responsive">
          <table class="table table-hover table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col" v-for="name of dolars.name" :key="name">
                  {{ name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td scope="col">
                  ${{ formatPrice($store.state.dolar.oficial) }}
                </td>
                <td scope="col">
                  ${{ formatPrice($store.state.dolar.solidario) }}
                </td>
                <td scope="col">${{ formatPrice($store.state.dolar.mep) }}</td>
                <td scope="col">${{ formatPrice($store.state.dolar.ccl) }}</td>
                <td scope="col">${{ formatPrice($store.state.dolar.ccb) }}</td>
                <td scope="col">${{ formatPrice($store.state.dolar.blue) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Cryptotable",
  data() {
    return {
      fields: ["Moneda", "Compra", "Compra Total", "Venta", "Venta Total"],
      dolars: {
        name: ["Oficial", "Solidario", "MEP", "CCL", "CCB", "Blue"],
      },
      coins: this.$store.state.coin,
    };
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>
