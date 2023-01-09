<template>
  <div>
    <h1>Начинай разработку</h1>
    <p>
      В этой сборке сделана кастомная авторизация при использовании nuxt 3
      инструментов, катомный fetchAuth для запроса с jwt токеном
    </p>
    <button v-if="getLogin">123</button>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from "pinia";
import { storeAuth } from "~/store/Auth";
export default {
  name: "PageIndex",
  computed: {
    ...mapState(storeAuth, ["getLogin"]),
  },
};
</script>
<style lang="scss" scoped>
div {
  background-color: $black;
  h1 {
    font-size: 50px;
    color: aqua;
  }
  p {
    color: aqua;
  }
}
</style>