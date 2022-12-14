<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from "./components/Frame/Header";
</script>

<template>
  <Header />
  <div class="container">
      <RouterView />
  </div>

</template>

