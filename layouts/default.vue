<template>
  <div class="grid">
    <header>Header</header>
    <!-- <AppHeader /> -->
    <main class="">
      <slot />
    </main>
    <!-- <AppFooter /> -->
     <footer>Footer</footer>
    <ModalsContainer />
  </div>
</template>

<script setup lang="ts">
import { ModalsContainer } from "vue-final-modal";
</script>

<style scoped></style>